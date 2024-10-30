from pydantic import Field
from .organizationBaseModel import OrganizationBaseModel

class OrganizationDataModel(OrganizationBaseModel):
    mailAddress: str = Field(examples=["tonystark@avengers.com"])
    zipCode: int = Field(examples=[12345])
    city: str = Field(examples=["New York"])
    street: str = Field(examples=["890 Fifth Avenue"])
    phoneNumber: int = Field(examples=[123456789])
    link: str = Field(examples=["avengers.com"])