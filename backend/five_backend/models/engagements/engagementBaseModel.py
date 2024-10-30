from pydantic import BaseModel, Field
from datetime import datetime

class EngagementBaseModel(BaseModel):
    title: str = Field(examples=["Your title"])
    startTime: datetime
    endTime: datetime
    organizer: str = Field(description="organization id", examples=["6683b694a9f9809ffefc1d07"])