import motor.motor_asyncio

mongoClient = motor.motor_asyncio.AsyncIOMotorClient("mongodb://127.0.0.1:27017")

def get_collection(database_name: str, collection_name: str):
    db = mongoClient.get_database(database_name)
    return db.get_collection(collection_name)