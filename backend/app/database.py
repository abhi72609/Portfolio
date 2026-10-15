from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker


# Find the .env file inside the backend folder.
BACKEND_DIR = Path(__file__).resolve().parent.parent




    
class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    model_config = SettingsConfigDict(
        env_file=BACKEND_DIR / ".env",
        env_file_encoding="utf-8",
    )



settings = Settings()


# Create the connection to PostgreSQL.
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
)


# Create database sessions for individual requests.
SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
)


# Base class for our future database models.
class Base(DeclarativeBase):
    pass
