import sys
import os
from backend.five_backend.dbOperations import users as userDB
from backend.five_backend.models.user.userBaseModel import UserBaseModel
from backend.five_backend.models.user.userModel import UserModel
import asyncio

async def createAdmin():

    userBaseModel = UserBaseModel(
        username = "admin",
        firstName = "admin",
        lastName = "admin",
        mailAddress = "")

    admin = UserModel(userBaseModel)
    await userDB.createNewUser(admin)

if __name__ == "__main__":
    asyncio.run(createAdmin())