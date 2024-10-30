from pydantic import BaseModel, Field

class OrganizationLoginModel(BaseModel):
    username: str = Field(examples=["username"])
    password: str = Field(examples=["password"])