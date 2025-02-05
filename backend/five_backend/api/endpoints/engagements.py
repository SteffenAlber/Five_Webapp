from fastapi import APIRouter, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from models.engagements.engagementCreateModel import EngagementCreateModel
from models.engagements.engagementOpenReturnModel import EngagementOpenReturnModel
from models.engagements.engagementCollectionModel import EngagementCollectionModel
from models.engagements.engagementExtendedModel import EngagementExtendedModel
from models.engagements.engagementPersistedModel import EngagementPersistedModel
from models.engagements.applicants.applicantModel import ApplicantModel
from dbOperations import engagements as engagementDB

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)

@router.get(
    "/e/{engagement_id}",
    response_description="Engagement for a specific engagement id",
    response_model=EngagementPersistedModel,  
    response_model_by_alias=False,
    summary="Get an Engagement for a specific id")
async def getPersistedEngagementModelById(engagement_id: str):
    engagement = await engagementDB.getPersistedEngagementModelById(engagement_id)
    return engagement

@router.get("/{organization_id}", response_description="List of engagements for specific organization", response_model=EngagementCollectionModel, response_model_by_alias=False, summary= "Get a list of all existing engagements for a specific organization")
async def readEngagementsByOrganizationId(organization_id):
    return EngagementCollectionModel(engagements=await engagementDB.readEngagementsByOrganizationId(organization_id))

@router.get("/", response_description="List of all engagements", response_model=EngagementCollectionModel, response_model_by_alias=False,summary= "Get a list of all existing engagements")
async def readAllEngagements():
    return EngagementCollectionModel(engagements = await engagementDB.readAllEngagements())

@router.post(
        "/",
             response_description="Engagement has been created",
             response_model=EngagementOpenReturnModel,
             status_code=201,
             response_model_by_alias=False,
             summary="Create a new engagement"
             )
@limiter.limit("10/minute")
async def createNewEngagement(request: Request, newEngagement : EngagementCreateModel):
    resultInsert = await engagementDB.createEngagement(newEngagement)
    return resultInsert

@router.post(
        "/{engagement_id}/applicants/",
             response_description="User has been added to applicants",
             response_model=EngagementOpenReturnModel,
             status_code=200,
             response_model_by_alias=False,
             summary="Adds a user to the applicants"
             )
async def userApply(engagement_id, newApplicant : ApplicantModel):
    resultInsert = await engagementDB.insertApplicant(engagement_id, newApplicant)
    return resultInsert

@router.post(
        "/{engagement_id}/applicants/accept",
             response_description="User application has been accepted",
             response_model=EngagementOpenReturnModel,
             status_code=200,
             response_model_by_alias=False,
             summary="Accepts a user application"
             )
async def acceptApplication(engagement_id, applicant : ApplicantModel):
    result = await engagementDB.acceptApplicant(engagement_id, applicant)
    return result

@router.post(
        "/{engagement_id}/applicants/decline",
             response_description="User has been removed from applicants",
             response_model=EngagementOpenReturnModel,
             status_code=200,
             response_model_by_alias=False,
             summary="Declines a user application"
             )
async def declineApplication(engagement_id, applicant : ApplicantModel):
    result = await engagementDB.declineApplicant(engagement_id, applicant)
    return result

@router.put(
    "/u/{engagement_id}",
    response_description="Engagement has been updated",
    response_model=EngagementPersistedModel,
    status_code=200,
    response_model_by_alias=False,
    summary="Update an existing engagement"
)
async def updateEngagement(engagement_id: str, updatedEngagement: EngagementPersistedModel):
    result = await engagementDB.updateEngagement(engagement_id, updatedEngagement)
    return result
