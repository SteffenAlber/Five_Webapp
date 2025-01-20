from pydantic import Field
from models.user.userBaseModel import UserBaseModel

class UserDiscreteModel(UserBaseModel):
    id: str = Field(examples=["123sadwqe12314212sda212"])
    jwt: str = Field(examples=["jwt_token_here"])