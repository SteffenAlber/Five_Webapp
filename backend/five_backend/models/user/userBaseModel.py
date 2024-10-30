from pydantic import BaseModel, Field

class UserBaseModel(BaseModel):
    username: str = Field(examples=["username"])
    firstName: str = Field(examples=["Ryan"])
    lastName: str = Field(examples=["Reynolds"])
    mailAddress: str = Field(examples=["example@example.com"])

