
from datetime import datetime, timedelta, timezone

import jwt
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pwdlib import PasswordHash
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import SessionLocal, settings
from app.models import User
from app.schemas import UserCreate, UserLogin, UserResponse


app = FastAPI(title="Portfolia API")

password_hash = PasswordHash.recommended()

# JWT configuration
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


# Allow the React frontend to communicate with this backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Provide a database session for each request.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Generate a JWT access token for an authenticated user.
def create_access_token(user_id: int) -> str:
    expires_at = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": str(user_id),
        "exp": expires_at,
    }

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


@app.get("/")
def home():
    return {"message": "Welcome to the Portfolia API"}


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


@app.post(
    "/api/auth/signup",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def signup(user_data: UserCreate, db: Session = Depends(get_db)):
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
        hashed_password=password_hash.hash(user_data.password),
    )

    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not create your account.",
        )

    return new_user


@app.post("/api/auth/login")
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    email = str(user_data.email).lower()

    user = db.scalar(
        select(User).where(User.email == email)
    )

    if not user or not password_hash.verify(
        user_data.password, user.hashed_password
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
        "user": UserResponse.model_validate(user).model_dump(mode="json"),
    }
