from pydantic import BaseModel, Field

class VolunteerBaseModel(BaseModel):
    numberOfVolunteers : int = Field(examples=["6"])