from pydantic import BaseModel, Field

class ApplicantModel(BaseModel):
    userId : str = Field()