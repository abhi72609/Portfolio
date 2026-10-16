
from typing import Any, Literal

from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
    HttpUrl,
)


# --------------------------------------------------
# User schemas
# --------------------------------------------------

class UserCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr

    model_config = ConfigDict(from_attributes=True)


# --------------------------------------------------
# Project schemas
# --------------------------------------------------

class ProjectBase(BaseModel):
    title: str = Field(min_length=1, max_length=150)
    description: str = Field(min_length=1, max_length=5000)

    technologies: list[str] = Field(
        default_factory=list,
        max_length=30,
    )

    github_url: HttpUrl | None = None
    live_url: HttpUrl | None = None
    image_url: str | None = Field(
        default=None,
        max_length=2048,
    )


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(ProjectBase):
    pass


class ProjectResponse(ProjectBase):
    id: int
    user_id: int

    model_config = ConfigDict(from_attributes=True)


# --------------------------------------------------
# Portfolio schemas
# --------------------------------------------------

class PortfolioCreate(BaseModel):
    template: Literal[
        "minimal",
        "dark",
        "professional",
        "creative",
        "editorial",
    ] = "minimal"

    portfolio_data: dict[str, Any] = Field(
        default_factory=dict,
    )


class PortfolioResponse(BaseModel):
    id: int | None = None
    template: str = "minimal"
    portfolio_data: dict[str, Any] = Field(
        default_factory=dict,
    )

    model_config = ConfigDict(from_attributes=True)




# from pydantic import BaseModel, ConfigDict, EmailStr, Field, HttpUrl


# # --------------------------------------------------
# # User schemas
# # --------------------------------------------------

# class UserCreate(BaseModel):
#     full_name: str = Field(min_length=2, max_length=100)
#     email: EmailStr
#     password: str = Field(min_length=8, max_length=128)


# class UserLogin(BaseModel):
#     email: EmailStr
#     password: str = Field(min_length=1, max_length=128)


# class UserResponse(BaseModel):
#     id: int
#     full_name: str
#     email: EmailStr

#     model_config = ConfigDict(from_attributes=True)


# # --------------------------------------------------
# # Project schemas
# # --------------------------------------------------

# class ProjectBase(BaseModel):
#     title: str = Field(min_length=1, max_length=150)
#     description: str = Field(min_length=1, max_length=5000)

#     technologies: list[str] = Field(default_factory=list, max_length=30)

#     github_url: HttpUrl | None = None
#     live_url: HttpUrl | None = None
#     image_url: str | None = Field(default=None, max_length=2048)


# class ProjectCreate(ProjectBase):
#     pass


# class ProjectUpdate(ProjectBase):
#     pass


# class ProjectResponse(ProjectBase):
#     id: int
#     user_id: int

#     model_config = ConfigDict(from_attributes=True)
