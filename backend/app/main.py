
from contextlib import asynccontextmanager
from datetime import datetime, timedelta, timezone

import jwt
from jwt.exceptions import PyJWTError
from fastapi import Depends, FastAPI, HTTPException, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pwdlib import PasswordHash
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import Base, SessionLocal, engine, settings
from app.models import User, Project, Portfolio
from app.schemas import (
    UserCreate,
    UserLogin,
    UserResponse,
    ProjectCreate,
    ProjectUpdate,
    ProjectResponse,
    PortfolioCreate,
    PortfolioResponse,
)


# --------------------------------------------------
# Application configuration
# --------------------------------------------------

password_hash = PasswordHash.recommended()

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

bearer_scheme = HTTPBearer(auto_error=False)


# --------------------------------------------------
# Database initialization
# --------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Importing all models above registers their tables.
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="Portfolia API",
    lifespan=lifespan,
)


# --------------------------------------------------
# CORS configuration
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Database session dependency
# --------------------------------------------------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --------------------------------------------------
# JWT authentication
# --------------------------------------------------

def create_access_token(user_id: int) -> str:
    expires_at = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": str(user_id),
        "exp": expires_at,
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(
        bearer_scheme
    ),
    db: Session = Depends(get_db),
) -> User:
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Please log in to continue.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        payload = jwt.decode(
            credentials.credentials,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        subject = payload.get("sub")

        if subject is None:
            raise ValueError("Missing token subject.")

        user_id = int(subject)

    except (PyJWTError, ValueError, TypeError, KeyError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Your session is invalid or expired. Please log in again.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = db.get(User, user_id)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account not found.",
        )

    return user


# --------------------------------------------------
# General endpoints
# --------------------------------------------------

@app.get("/")
def home():
    return {"message": "Welcome to the Portfolia API"}


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


# --------------------------------------------------
# Authentication: signup
# --------------------------------------------------

@app.post(
    "/api/auth/signup",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def signup(
    user_data: UserCreate,
    db: Session = Depends(get_db),
):
    email = str(user_data.email).lower()

    existing_user = db.scalar(
        select(User).where(User.email == email)
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )

    new_user = User(
        full_name=user_data.full_name.strip(),
        email=email,
        hashed_password=password_hash.hash(
            user_data.password
        ),
    )

    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

    except Exception as exc:
        db.rollback()
        print("SIGNUP ERROR:", repr(exc))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not create your account.",
        ) from exc

    return new_user


# --------------------------------------------------
# Authentication: login
# --------------------------------------------------

@app.post("/api/auth/login")
def login(
    user_data: UserLogin,
    db: Session = Depends(get_db),
):
    email = str(user_data.email).lower()

    user = db.scalar(
        select(User).where(User.email == email)
    )

    if not user or not password_hash.verify(
        user_data.password,
        user.hashed_password,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(user.id)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": UserResponse.model_validate(user).model_dump(
            mode="json"
        ),
    }


# --------------------------------------------------
# Projects: list authenticated user's projects
# --------------------------------------------------

@app.get(
    "/api/projects",
    response_model=list[ProjectResponse],
)
def list_projects(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    projects = db.scalars(
        select(Project)
        .where(Project.user_id == current_user.id)
        .order_by(Project.created_at.desc())
    ).all()

    return projects


# --------------------------------------------------
# Projects: create
# --------------------------------------------------

@app.post(
    "/api/projects",
    response_model=ProjectResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_project(
    project_data: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project_values = project_data.model_dump(mode="json")

    project = Project(
        **project_values,
        user_id=current_user.id,
    )

    try:
        db.add(project)
        db.commit()
        db.refresh(project)

    except Exception as exc:
        db.rollback()
        print("PROJECT SAVE ERROR:", repr(exc))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not save the project.",
        ) from exc

    return project


# --------------------------------------------------
# Projects: update
# --------------------------------------------------

@app.put(
    "/api/projects/{project_id}",
    response_model=ProjectResponse,
)
def update_project(
    project_id: int,
    project_data: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = db.scalar(
        select(Project).where(
            Project.id == project_id,
            Project.user_id == current_user.id,
        )
    )

    if project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found.",
        )

    project_values = project_data.model_dump(mode="json")

    for field, value in project_values.items():
        setattr(project, field, value)

    try:
        db.commit()
        db.refresh(project)

    except Exception as exc:
        db.rollback()
        print("PROJECT UPDATE ERROR:", repr(exc))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not update the project.",
        ) from exc

    return project


# --------------------------------------------------
# Projects: delete
# --------------------------------------------------

@app.delete(
    "/api/projects/{project_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = db.scalar(
        select(Project).where(
            Project.id == project_id,
            Project.user_id == current_user.id,
        )
    )

    if project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found.",
        )

    try:
        db.delete(project)
        db.commit()

    except Exception as exc:
        db.rollback()
        print("PROJECT DELETE ERROR:", repr(exc))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not delete the project.",
        ) from exc

    return Response(status_code=status.HTTP_204_NO_CONTENT)


# --------------------------------------------------
# Portfolio: retrieve logged-in user's portfolio
# --------------------------------------------------

@app.get(
    "/api/portfolio/me",
    response_model=PortfolioResponse,
)
def get_my_portfolio(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    portfolio = db.scalar(
        select(Portfolio).where(
            Portfolio.user_id == current_user.id
        )
    )

    if portfolio is not None:
        return portfolio

    # Return a default portfolio without creating a database row.
    return {
        "template": "minimal",
        "portfolio_data": {
            "name": current_user.full_name,
            "role": "",
            "about": "",
            "projects": [],
            "education": [],
            "experience": [],
            "skills": [],
        },
    }


# --------------------------------------------------
# Portfolio: create or update logged-in user's portfolio
# --------------------------------------------------

@app.put(
    "/api/portfolio/me",
    response_model=PortfolioResponse,
)
def save_my_portfolio(
    portfolio_input: PortfolioCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    portfolio = db.scalar(
        select(Portfolio).where(
            Portfolio.user_id == current_user.id
        )
    )

    if portfolio is None:
        portfolio = Portfolio(
            user_id=current_user.id,
            template=portfolio_input.template,
            portfolio_data=portfolio_input.portfolio_data,
        )
        db.add(portfolio)
    else:
        portfolio.template = portfolio_input.template
        portfolio.portfolio_data = portfolio_input.portfolio_data

    try:
        db.commit()
        db.refresh(portfolio)

    except Exception as exc:
        db.rollback()
        print("PORTFOLIO SAVE ERROR:", repr(exc))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not save your portfolio.",
        ) from exc

    return portfolio
