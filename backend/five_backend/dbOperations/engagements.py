from fastapi import HTTPException
from dbOperations.dbConfig import mongoClient
from models.engagements.engagementPersistedModel import EngagementPersistedModel
from models.engagements.engagementOpenReturnModel import EngagementOpenReturnModel
from models.engagements.engagementCreateModel import EngagementCreateModel
from models.engagements.engagementExtendedModel import EngagementExtendedModel
from models.engagements.applicants.applicantModel import ApplicantModel
from models.engagements.certificate.certificateEngagementModel import CertificateEngagementModel
from bson import ObjectId
from dbOperations import users as userDB
from dbOperations import organizations as organizationDB
from datetime import datetime

dbEngagements = mongoClient.get_database("engagements")
collectionEngagements = dbEngagements.get_collection("engagements")

async def getPersistedEngagementModelById(engagement_id : str):
    object_id = ObjectId(engagement_id)
    engagement = await collectionEngagements.find_one({"_id": object_id})

    if not engagement:
        raise HTTPException(status_code=404, detail="No engagement existing with given id")

    __convertId(engagement)
    print("Engagement Data: ", engagement)

    return EngagementPersistedModel.parse_obj(engagement) 

async def readAllEngagements():
    engagements = await collectionEngagements.find().to_list(1000)

    for engagement in engagements:
        __convertId(engagement)
        await __getUsersForEngagement(engagement)
        await __getEngagementOrganizer(engagement)

    return engagements

async def readEngagementsByOrganizationId(organization_id):
    engagements = await collectionEngagements.find({"organizer": organization_id}).to_list(1000)

    for engagement in engagements:
        __convertId(engagement)
        await __getUsersForEngagement(engagement)
        await __getEngagementOrganizer(engagement)

    return engagements

async def createEngagement(newEngagement : EngagementCreateModel):
    requestBodyDict = newEngagement.dict()
    nNumberOfVolunteers = requestBodyDict.pop("numberOfVolunteers")

    completeEngagement = EngagementPersistedModel(
        **requestBodyDict,
        volunteers = {
            "numberOfVolunteers": nNumberOfVolunteers,
            "applicants": [],
            "acceptedVolunteers": []
        }
    )

    persistedEngagement = await collectionEngagements.insert_one(completeEngagement.model_dump(by_alias=True, exclude=["id"]))
    createdEngagement = await collectionEngagements.find_one({"_id": persistedEngagement.inserted_id})

    __convertId(createdEngagement)
    await __getEngagementOrganizer(createdEngagement)

    return EngagementOpenReturnModel.parse_obj(createdEngagement)

async def insertApplicant(engagement_id, newApplicant: ApplicantModel):
    object_id = ObjectId(engagement_id)
    engagement : EngagementPersistedModel = await collectionEngagements.find_one({"_id": object_id})
    if not engagement:
        raise HTTPException(status_code=404, detail="Engagement not found")

    volunteers = engagement["volunteers"]
    if (newApplicant.userId in volunteers["applicants"]):
        raise HTTPException(status_code=400, detail="User already in applicant list")

    if (newApplicant.userId in volunteers["acceptedVolunteers"]):
        raise HTTPException(status_code=400, detail="User already in accepted volunteers")

    if (len(volunteers["acceptedVolunteers"]) == volunteers["numberOfVolunteers"]):
        raise HTTPException(status_code=400, detail="Maximum capacity for this engagement reached")

    await userDB.insertApplication(newApplicant.userId, engagement_id)

    await collectionEngagements.update_one(
        {"_id": object_id},
        {"$push": {"volunteers.applicants": newApplicant.userId}}
    )

    updatedDocument = await collectionEngagements.find_one({"_id": object_id})

    __convertId(updatedDocument)
    await __getUsersForEngagement(updatedDocument)
    await __getEngagementOrganizer(updatedDocument)

    return updatedDocument

async def acceptApplicant(engagement_id, applicant: ApplicantModel):
    object_id = ObjectId(engagement_id)
    engagement: EngagementPersistedModel = await collectionEngagements.find_one({"_id": object_id})
    if not engagement:
        raise HTTPException(status_code=404, detail="Engagement not found")

    volunteers = engagement["volunteers"]
    if not applicant.userId in volunteers["applicants"]:
        raise HTTPException(status_code=400, detail="User not in applicant list")

    await userDB.acceptApplication(applicant.userId, engagement_id)

    await collectionEngagements.update_one(
        {"_id": object_id},
        {"$pull": {"volunteers.applicants": applicant.userId},
         "$push": {"volunteers.acceptedVolunteers": applicant.userId}
         }
    )

    updatedDocument = await collectionEngagements.find_one({"_id": object_id})

    __convertId(updatedDocument)
    await __getUsersForEngagement(updatedDocument)
    await __getEngagementOrganizer(updatedDocument)

    return updatedDocument

async def declineApplicant(engagement_id, applicant: ApplicantModel):
    object_id = ObjectId(engagement_id)
    engagement: EngagementPersistedModel = await collectionEngagements.find_one({"_id": object_id})
    if not engagement:
        raise HTTPException(status_code=404, detail="Engagement not found")

    volunteers = engagement["volunteers"]
    if not applicant.userId in volunteers["applicants"]:
        raise HTTPException(status_code=400, detail="User not in applicant list")

    await userDB.declineApplication(applicant.userId, engagement_id)

    await collectionEngagements.update_one(
        {"_id": object_id},
        {"$pull": {"volunteers.applicants": applicant.userId}}
    )

    updatedDocument = await collectionEngagements.find_one({"_id": object_id})

    __convertId(updatedDocument)
    await __getUsersForEngagement(updatedDocument)
    await __getEngagementOrganizer(updatedDocument)

    return updatedDocument

async def hasPassed(engagement_id):
    object_id = ObjectId(engagement_id)
    engagement = await collectionEngagements.find_one({"_id": object_id})

    endTime = engagement["endTime"]

    hasPassed = False
    if endTime < datetime.now():
        hasPassed = True

    return hasPassed

async def getCertificateEngagements(list_engament_id : list[str]):
    engagements = []
    for engagement_id in list_engament_id:
        object_id = ObjectId(engagement_id)
        engagement = await collectionEngagements.find_one({"_id": object_id})
        await __getEngagementOrganizer(engagement)

        engagements.append(CertificateEngagementModel.parse_obj(engagement))

    return engagements

async def __getUsersForEngagement(engagement_doc : EngagementPersistedModel):
    volunteers = engagement_doc["volunteers"]
    applicantList = []
    for applicantId in volunteers["applicants"]:
        applicantList.append(await userDB.getDiscreteUserById(applicantId))
    volunteers["applicants"] = applicantList

    volunteerList = []
    for volunteerId in volunteers["acceptedVolunteers"]:
        volunteerList.append(await userDB.getDiscreteUserById(volunteerId))
    volunteers["acceptedVolunteers"] = volunteerList
    return

async def __getEngagementOrganizer(engagement_doc : EngagementPersistedModel):
    organizer = await organizationDB.getOrganizationById(engagement_doc["organizer"])
    engagement_doc["organizer"] = organizer
    return

def __convertId(document):
    document["id"] = str(document["_id"])
    
async def updateEngagement(engagement_id: str, updatedEngagement: EngagementPersistedModel):
    object_id = ObjectId(engagement_id)
    existing_engagement = await collectionEngagements.find_one({"_id": object_id})
    
    if not existing_engagement:
        raise HTTPException(status_code=404, detail="Engagement not found")

    update_data = updatedEngagement.dict(exclude_unset=True)

    # Directly set nested fields without transforming them
    # This assumes that the Pydantic model correctly nests these fields
    if "location" in update_data:
        update_data["location"] = update_data.pop("location")
    
    if "volunteers" in update_data:
        update_data["volunteers"] = update_data.pop("volunteers")
    
    if not update_data:
        raise HTTPException(status_code=400, detail="No valid fields provided for update")

    update_result = await collectionEngagements.update_one(
        {"_id": object_id},
        {"$set": update_data}
    )

    if update_result.modified_count == 0:
        raise HTTPException(status_code=400, detail="No changes were made to the engagement")

    updated_document = await collectionEngagements.find_one({"_id": object_id})
    
    if not updated_document:
        raise HTTPException(status_code=404, detail="Updated engagement not found")

    __convertId(updated_document)
    await __getUsersForEngagement(updated_document)
    await __getEngagementOrganizer(updated_document)

    return EngagementPersistedModel.parse_obj(updated_document)