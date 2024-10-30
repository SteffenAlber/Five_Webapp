from pydantic import Field
from .organizationDataModel import OrganizationDataModel

class OrganizationCreateModel(OrganizationDataModel):
    username: str = Field(examples=["tonystark"])
    password: str = Field(examples=["password"])