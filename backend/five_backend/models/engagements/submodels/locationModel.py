from pydantic import BaseModel, Field

class LocationModel(BaseModel):
    zipCode : int = Field(examples=["72267"])
    city: str = Field(examples=["Reutlingen"])
    street: str = Field(examples=["Alteburgstraße"])
    number: str = Field(examples=["18/1"])