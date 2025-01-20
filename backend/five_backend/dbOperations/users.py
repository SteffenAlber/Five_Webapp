from fastapi import HTTPException
import bcrypt
from dbOperations.dbConfig import mongoClient
from models.user.userModel import UserModel
from models.user.userLoginModel import UserLoginModel
from models.user.userDiscreteModel import UserDiscreteModel
from models.user.userEngagementsModel import UserEngagementsModel
from models.user.userOpenReturnModel import UserOpenReturnModel
from bson import ObjectId
from dbOperations import engagements as engagementDB
from backend.five_backend.api.utils.jwt_utils import create_access_token

dbUsers = mongoClient.get_database("users")
collectionUsers = dbUsers.get_collection("users")

async def readAllUsers():
    users = await collectionUsers.find().to_list(1000)

    for user in users:
        __convertId(user)
        await __getEngagementsForUser(user)

    return users

async def createNewUser(user : UserModel):
    existingUser = await collectionUsers.find_one({"mailAddress": user.mailAddress})
    if existingUser:
        raise HTTPException(status_code=400, detail="Email already exists")

    existingUser = await collectionUsers.find_one({"username": user.username})
    if existingUser:
        raise HTTPException(status_code=400, detail="Username already exists")

    user.password = bcrypt.hashpw(user.password.encode("utf-8"), bcrypt.gensalt())

    newUser = await collectionUsers.insert_one(user.model_dump(by_alias = True, exclude=["id"]))
    createdUser = await collectionUsers.find_one({"_id": newUser.inserted_id})

    __convertId(createdUser)

    userModel = UserEngagementsModel.parse_obj(createdUser)

    return userModel

async def loginUser(user : UserLoginModel):
    existingUser = await collectionUsers.find_one({"username": user.username})

    await syncEngagements(str(existingUser["_id"]))
    if not existingUser:
        raise HTTPException(status_code=400, detail="Username or password invalid")

    if not bcrypt.checkpw(user.password.encode("utf-8"), existingUser["password"]):
        raise HTTPException(status_code=400, detail="Username or password invalid")

    await syncEngagements(str(existingUser["_id"]))

    __convertId(existingUser)
    existingUser.setdefault("is_admin", False)

    jwt = ""

    if existingUser["is_admin"]:
        jwt = create_access_token({"is_admin": True})
    else:
        jwt = create_access_token({"is_admin": False})
        await __getEngagementsForUser(existingUser)
    try:
        userModel = UserOpenReturnModel.parse_obj(existingUser)
        print(existingUser)
        print("------------")
        print(userModel)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse user model: {str(e)}")

    return userModel, jwt

async def insertApplication(userId : str, engagementId : str):
    object_id = ObjectId(userId)
    user = await collectionUsers.find_one({"_id": object_id})

    if not user:
        raise HTTPException(status_code=400, detail="No user with this id found in database")

    collectionUsers.update_one(
        {"_id": object_id},
        {"$push": {"applications": engagementId}}
    )

async def acceptApplication(userId: str, engagementId: str):
    object_id = ObjectId(userId)
    user = await collectionUsers.find_one({"_id": object_id})

    if not user:
        raise HTTPException(status_code=400, detail="No user with this id found in database")

    collectionUsers.update_one(
        {"_id": object_id},
        {
            "$pull": {"applications": engagementId},
            "$push": {"upcomingEngagements": engagementId}
        }
    )

async def declineApplicant(engagement_id: str, applicant: dict):
    engagement_object_id = ObjectId(engagement_id)
    user_id = applicant.get("userId")

    if not user_id:
        raise HTTPException(status_code=400, detail="User ID is required")

    user_object_id = ObjectId(user_id)

    # Entferne das Engagement aus den Benutzer-Dokumenten
    result_user = await collectionUsers.update_one(
        {"_id": user_object_id},
        {
            "$pull": {
                "applications": engagement_id,
                "upcomingEngagements": engagement_id
            }
        }
    )

    if result_user.modified_count == 0:
        raise HTTPException(status_code=400, detail="Engagement ID not found in user's applications or upcoming engagements")

    # Entferne den Benutzer aus den akzeptierten Freiwilligen des Engagements
    result_engagement = await collectionUsers.update_one(
        {"_id": engagement_object_id},
        {
            "$pull": {
                "acceptedVolunteers": user_id
            }
        }
    )

    if result_engagement.modified_count == 0:
        raise HTTPException(status_code=400, detail="User ID not found in accepted volunteers of the engagement")

    return {"message": "Application declined and user removed from accepted volunteers successfully."}


async def getDiscreteUserById(user_id : str):
    object_id = ObjectId(user_id)
    user = await collectionUsers.find_one({"_id": object_id})

    if not user:
        raise HTTPException(status_code=404, detail="No user existing with given id")

    __convertId(user)

    return UserDiscreteModel.parse_obj(user)

async def getUserById(user_id : str):
    object_id = ObjectId(user_id)
    user = await collectionUsers.find_one({"_id": object_id})

    if not user:
        raise HTTPException(status_code=404, detail="No user existing with given id")

    __convertId(user)
    await __getEngagementsForUser(user)

    return UserOpenReturnModel.parse_obj(user)

async def __getEngagementsForUser(user_doc : dict):
    applicationList = []
    if "applications" in user_doc:
        for engagementId in user_doc["applications"]:
            applicationList.append(await engagementDB.getPersistedEngagementModelById(engagementId))
    user_doc["applications"] = applicationList

    upcomingEngagements = []
    if "upcomingEngagements" in user_doc:
        for engagementId in user_doc["upcomingEngagements"]:
            upcomingEngagements.append(await engagementDB.getPersistedEngagementModelById(engagementId))
    user_doc["upcomingEngagements"] = upcomingEngagements

    return

async def syncEngagements(user_id : str):
    object_id = ObjectId(user_id)

    user = await collectionUsers.find_one({"_id": object_id})
    if "application" in user:
        applications = user["applications"]
    else:
        applications = []

    for engagementId in applications:
        if await engagementDB.hasPassed(engagementId):
            applications.remove(engagementId)

    if "upcomingEngagements" in user:
        upcomingEngagements = user["upcomingEngagements"]
    else:
        upcomingEngagements = []

    if "previousEngagements" in user:
        previousEngagements = user["previousEngagements"]
    else:
        previousEngagements = []

    for engagementId in upcomingEngagements:
        if await engagementDB.hasPassed(engagementId):
            upcomingEngagements.remove(engagementId)
            previousEngagements.append(engagementId)

    collectionUsers.update_one(
        {"_id": object_id},
        {
            "$set": {
                "applications": applications,
                "upcomingEngagements": upcomingEngagements,
                "previousEngagements": previousEngagements
            }
        }

        )

def __convertId(document):
    document["id"] = str(document["_id"])