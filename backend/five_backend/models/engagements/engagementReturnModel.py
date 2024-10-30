from models.engagements.engagementPersistedModel import EngagementPersistedModel
from pydantic import Field

class EngagementReturnModel(EngagementPersistedModel):
    id: str = Field(examples=["123sadwqe12314212sda212"])