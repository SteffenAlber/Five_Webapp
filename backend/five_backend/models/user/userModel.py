from pydantic import Field
from models.user.userBaseModel import UserBaseModel

class UserModel(UserBaseModel):
    dateOfBirth : str = Field(examples=["01.01.1900"])
    password : str = Field(examples=["password"])