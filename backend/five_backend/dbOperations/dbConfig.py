import motor.motor_asyncio
from core.config import *

mongoClient = motor.motor_asyncio.AsyncIOMotorClient(S_MONGO_URL)

