from fastapi import APIRouter
from models.user.userCollectionModel import UserCollectionModel
from models.user.userModel import UserModel
from models.user.userEngagementsModel import UserEngagementsModel
from models.user.userOpenReturnModel import UserOpenReturnModel
from models.user.userLoginModel import UserLoginModel
from dbOperations import users as userDB

router = APIRouter()

@router.get(
    "/{user_id}",
    response_model=UserOpenReturnModel,
     status_code=200,
     response_model_by_alias=False,
     summary="Get an existing user by id"
)
async def getUserById(user_id : str):
    user = await userDB.getUserById(user_id)
    return user

@router.get("/", response_description="List of all users", response_model=UserCollectionModel, response_model_by_alias=False,summary= "Get a list of all existing users")
async def readAllUsers():
    return UserCollectionModel(users = await userDB.readAllUsers())

@router.post(
        "/register",
             response_description="User has been created",
             response_model=UserEngagementsModel,
             status_code=201,
             response_model_by_alias=False,
             summary="Create a new user"
             )
async def createNewUser(user : UserModel):
    discreteUser = await userDB.createNewUser(user)
    return discreteUser

@router.post(
        "/login",
             response_description="User has been logged in",
             response_model=UserOpenReturnModel,
             status_code=200,
             response_model_by_alias=False,
             summary="Login an existing user"
             )
async def loginUser(user : UserLoginModel):
    discreteUser = await userDB.loginUser(user)
    return discreteUser
