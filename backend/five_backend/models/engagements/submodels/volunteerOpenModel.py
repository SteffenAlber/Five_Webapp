from models.engagements.submodels.volunteerDiscreteModel import VolunteerDiscreteModel
from models.user.userDiscreteModel import UserDiscreteModel

class VolunteerOpenModel(VolunteerDiscreteModel):
    applicants : list[UserDiscreteModel]
    acceptedVolunteers : list[UserDiscreteModel]