from pydantic import BaseModel, Field

class OrganizationBaseModel(BaseModel):
    organizationName: str = Field(examples=["The Avengers"])
