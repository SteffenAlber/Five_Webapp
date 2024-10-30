from pydantic import BaseModel
from models.organizations.organizationDiscreteModel import OrganizationDiscreteModel

class OrganizationCollectionModel(BaseModel):
    organizations: list[OrganizationDiscreteModel]