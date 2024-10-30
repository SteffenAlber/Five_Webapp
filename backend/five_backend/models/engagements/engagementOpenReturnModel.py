from models.engagements.engagementReturnModel import EngagementReturnModel
from models.engagements.submodels.volunteerOpenModel import VolunteerOpenModel
from models.organizations.organizationDiscreteModel import OrganizationDiscreteModel

class EngagementOpenReturnModel(EngagementReturnModel):
    volunteers : VolunteerOpenModel
    organizer: OrganizationDiscreteModel