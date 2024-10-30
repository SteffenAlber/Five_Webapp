from pydantic import BaseModel, Field

class UserLoginModel(BaseModel):
    username: str = Field(examples=["username"])
    password: str = Field(examples=["password"])