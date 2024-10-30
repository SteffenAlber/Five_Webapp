from pydantic import Field
from models.engagements.submodels.locationModel import LocationModel
from models.engagements.engagementBaseModel import EngagementBaseModel
from models._enums.characteristic import Characteristic
from models._enums.tags import Tags
from datetime import datetime

class EngagementExtendedModel(EngagementBaseModel):
    description: str = Field(examples=["Your description"])
    requirements: list[str] = Field(examples=[["18 years old", "agile", "original"]])
    characteristic : str = Field(examples=[Characteristic.ANPACKER])
    tags: list[str] = Field(examples=[[Tags.CHILL, Tags.OUTDOOR]])
    location: LocationModel