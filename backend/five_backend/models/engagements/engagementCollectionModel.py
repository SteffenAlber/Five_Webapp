from pydantic import BaseModel
from models.engagements.engagementOpenReturnModel import EngagementOpenReturnModel

class EngagementCollectionModel(BaseModel):
    engagements: list[EngagementOpenReturnModel]