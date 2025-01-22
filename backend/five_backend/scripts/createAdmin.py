from backend.five_backend.dbOperations.dbConfig import get_collection
import asyncio
import bcrypt

async def createAdmin():
    collection = get_collection("users", "users")

    password = "abc123"

    salted_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    admin_user = {
        "username": "realAdmin",
        "firstName": "Admin",
        "lastName": "Admin",
        "mailAddress": "admin@example.com",
        "is_admin": True,
        "password": salted_pw,
    }

    await collection.insert_one(admin_user)

if __name__ == "__main__":
    asyncio.run(createAdmin())