from pydantic import BaseModel
from models.user.userOpenReturnModel import UserOpenReturnModel

class UserCollectionModel(BaseModel):
    users: list[UserOpenReturnModel]