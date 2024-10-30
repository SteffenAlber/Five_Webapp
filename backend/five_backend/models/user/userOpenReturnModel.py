from pydantic import Field
from models.user.userDiscreteModel import UserDiscreteModel
from models.engagements.engagementExtendedModel import EngagementExtendedModel

class UserOpenReturnModel(UserDiscreteModel):
    applications: list[EngagementExtendedModel]
    upcomingEngagements: list[EngagementExtendedModel]
    previousEngagements: list[str] = Field([], examples=["id of the previous engagements"])