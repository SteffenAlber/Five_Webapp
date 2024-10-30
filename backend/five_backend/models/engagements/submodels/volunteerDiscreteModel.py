from pydantic import Field
from models.engagements.submodels.volunteerBaseModel import VolunteerBaseModel

class VolunteerDiscreteModel(VolunteerBaseModel):
    applicants: list[str] = Field([], examples=[["Your applicants"]])
    acceptedVolunteers: list[str] = Field([], examples=[["Your accepted volunteers"]])