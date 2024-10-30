from fastapi import HTTPException
import bcrypt
from dbOperations.dbConfig import mongoClient
from models.organizations.organizationCreateModel import OrganizationCreateModel
from models.organizations.organizationLoginModel import OrganizationLoginModel
from models.organizations.organizationDiscreteModel import OrganizationDiscreteModel
from bson import ObjectId

dbUsers = mongoClient.get_database("organizations")
collectionOrganizations = dbUsers.get_collection("organizations")

async def getOrganizationById(organization_id : str):
    object_id = ObjectId(organization_id)
    organization = await collectionOrganizations.find_one({"_id": object_id})

    if not organization:
        raise HTTPException(status_code=404, detail="No organization existing with given id")

    __convertId(organization)

    return OrganizationDiscreteModel.parse_obj(organization)

async def readAllOrganizations():
    organizations = await collectionOrganizations.find().to_list(1000)

    for organization in organizations:
        __convertId(organization)

    return organizations


async def createNewOrganization(organization : OrganizationCreateModel):
    existingOrganization = await collectionOrganizations.find_one({"mailAddress": organization.mailAddress})
    if existingOrganization:
        raise HTTPException(status_code=400, detail="Email already exists")

    existingOrganization = await collectionOrganizations.find_one({"username": organization.username})
    if existingOrganization:
        raise HTTPException(status_code=400, detail="Username already exists")

    organization.password = bcrypt.hashpw(organization.password.encode("utf-8"), bcrypt.gensalt())

    newOrganization = await collectionOrganizations.insert_one(organization.model_dump(by_alias=True, exclude=["id"]))
    createdOrganization = await collectionOrganizations.find_one({"_id": newOrganization.inserted_id})

    __convertId(createdOrganization)
    discreteOrganizationModel = OrganizationDiscreteModel.parse_obj(createdOrganization)

    return discreteOrganizationModel


async def loginOrganization(organization: OrganizationLoginModel):
    existingOrganization = await collectionOrganizations.find_one({"username": organization.username})
    if not existingOrganization:
        raise HTTPException(status_code=400, detail="Username or password invalid")

    if not bcrypt.checkpw(organization.password.encode("utf-8"), existingOrganization["password"]):
        raise HTTPException(status_code=400, detail="Username or password invalid")

    __convertId(existingOrganization)
    discreteOrganizationModel = OrganizationDiscreteModel.parse_obj(existingOrganization)

    return discreteOrganizationModel

def __convertId(document):
    document["id"] = str(document["_id"])