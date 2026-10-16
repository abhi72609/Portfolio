# from datetime import datetime

# from sqlalchemy import (
#     DateTime,
#     ForeignKey,
#     Integer,
#     JSON,
#     String,
#     Text,
#     func,
# )
# from sqlalchemy.orm import Mapped, mapped_column

# from app.database import Base


# class User(Base):
#     __tablename__ = "users"

#     id: Mapped[int] = mapped_column(
#         Integer, primary_key=True, index=True
#     )
#     full_name: Mapped[str] = mapped_column(
#         String(100), nullable=False
#     )
#     email: Mapped[str] = mapped_column(
#         String(255), unique=True, index=True, nullable=False
#     )
#     hashed_password: Mapped[str] = mapped_column(
#         String(255), nullable=False
#     )
#     created_at: Mapped[datetime] = mapped_column(
#         DateTime(timezone=True),
#         server_default=func.now(),
#         nullable=False,
#     )


# class Project(Base):
#     __tablename__ = "projects"

#     id: Mapped[int] = mapped_column(
#         Integer, primary_key=True, index=True
#     )

#     user_id: Mapped[int] = mapped_column(
#         ForeignKey("users.id", ondelete="CASCADE"),
#         nullable=False,
#         index=True,
#     )

#     title: Mapped[str] = mapped_column(
#         String(150), nullable=False
#     )

#     description: Mapped[str] = mapped_column(
#         Text, nullable=False
#     )

#     technologies: Mapped[list[str]] = mapped_column(
#         JSON, default=list, nullable=False
#     )

#     github_url: Mapped[str | None] = mapped_column(
#         String(500), nullable=True
#     )

#     live_url: Mapped[str | None] = mapped_column(
#         String(500), nullable=True
#     )

#     image_url: Mapped[str | None] = mapped_column(
#         String(1000), nullable=True
#     )

#     created_at: Mapped[datetime] = mapped_column(
#         DateTime(timezone=True),
#         server_default=func.now(),
#         nullable=False,
#     )

#     updated_at: Mapped[datetime] = mapped_column(
#         DateTime(timezone=True),
#         server_default=func.now(),
#         onupdate=func.now(),
#         nullable=False,
#     )

    
from datetime import datetime

from sqlalchemy import (
    DateTime,
    ForeignKey,
    Integer,
    JSON,
    String,
    Text,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, index=True
    )
    full_name: Mapped[str] = mapped_column(
        String(100), nullable=False
    )
    email: Mapped[str] = mapped_column(
        String(255), unique=True, index=True, nullable=False
    )
    hashed_password: Mapped[str] = mapped_column(
        String(255), nullable=False
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )


class Project(Base):
    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, index=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(150), nullable=False
    )

    description: Mapped[str] = mapped_column(
        Text, nullable=False
    )

    technologies: Mapped[list[str]] = mapped_column(
        JSON, default=list, nullable=False
    )

    github_url: Mapped[str | None] = mapped_column(
        String(500), nullable=True
    )

    live_url: Mapped[str | None] = mapped_column(
        String(500), nullable=True
    )

    image_url: Mapped[str | None] = mapped_column(
        String(1000), nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )


class Portfolio(Base):
    __tablename__ = "portfolios"

    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, index=True
    )

    # Each user has one saved portfolio.
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
        index=True,
    )

    # The template selected by the user.
    template: Mapped[str] = mapped_column(
        String(50),
        default="minimal",
        nullable=False,
    )

    # Stores personal information, projects, education,
    # experience, skills, and other portfolio details.
    portfolio_data: Mapped[dict] = mapped_column(
        JSON,
        default=dict,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
