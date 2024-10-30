from models.engagements.engagementExtendedModel import EngagementExtendedModel
from models.engagements.submodels.volunteerDiscreteModel import VolunteerDiscreteModel

class EngagementPersistedModel(EngagementExtendedModel):
    volunteers: VolunteerDiscreteModel
    characteristic: str
    tags: list[str]