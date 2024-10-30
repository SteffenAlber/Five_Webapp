from pydantic import Field
from .organizationDataModel import OrganizationDataModel

class OrganizationDiscreteModel(OrganizationDataModel):
    id : str = Field(examples=["123sadwqe12314212sda212"])