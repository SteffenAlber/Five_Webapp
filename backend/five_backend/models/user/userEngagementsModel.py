from pydantic import Field
from models.user.userDiscreteModel import UserDiscreteModel

class UserEngagementsModel(UserDiscreteModel):
    applications: list[str] = Field([], examples=[["ids of engagements"]])
    upcomingEngagements: list[str] = Field([], examples=[["ids of engagements"]])
    previousEngagements: list[str] = Field([], examples=[["ids of engagements"]])