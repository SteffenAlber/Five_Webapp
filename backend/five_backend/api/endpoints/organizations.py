from fastapi import APIRouter
from models.organizations.organizationCollectionModel import OrganizationCollectionModel
from models.organizations.organizationCreateModel import OrganizationCreateModel
from models.organizations.organizationDiscreteModel import OrganizationDiscreteModel
from models.organizations.organizationLoginModel import OrganizationLoginModel
from dbOperations import organizations as organizationDB

router = APIRouter()

@router.get(
    "/{organization_id}",
     response_model=OrganizationDiscreteModel,
     status_code=200,
     response_model_by_alias=False,
     summary="Get an existing organization by id"
)
async def getOrganizationById(user_id : str):
    discreteOrganization = await organizationDB.getOrganizationById(user_id)
    return discreteOrganization

@router.get("/", response_description="List of all organizations", response_model=OrganizationCollectionModel, response_model_by_alias=False,summary= "Get a list of all existing organizations")
async def readAllOrganizations():
    return OrganizationCollectionModel(organizations = await organizationDB.readAllOrganizations())

@router.post(
        "/register",
             response_description="Organization has been created",
             response_model=OrganizationDiscreteModel,
             status_code=201,
             response_model_by_alias=False,
             summary="Create a new organization"
             )
async def createNewOrganization(organization : OrganizationCreateModel):
    discreteOrganization = await organizationDB.createNewOrganization(organization)
    return discreteOrganization

@router.post(
        "/login",
             response_description="Organization has been logged in",
             response_model=OrganizationDiscreteModel,
             status_code=200,
             response_model_by_alias=False,
             summary="Login an existing organization"
             )
async def loginOrganization(organization : OrganizationLoginModel):
    discreteOrganization = await organizationDB.loginOrganization(organization)
    return discreteOrganization