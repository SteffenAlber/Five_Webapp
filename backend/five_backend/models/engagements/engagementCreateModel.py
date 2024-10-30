from pydantic import BaseModel, Field
from models.engagements.engagementExtendedModel import EngagementExtendedModel

class EngagementCreateModel(EngagementExtendedModel):
    numberOfVolunteers : int = Field(..., gt=0, examples=[6])
    startTime: str = Field(examples=["2024-01-01T15:00:00"])
    endTime: str = Field(examples=["2024-01-01T18:00:00"])

