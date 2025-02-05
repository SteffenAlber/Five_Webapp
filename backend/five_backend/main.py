from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from core.config import *
from api.endpoints import users, organizations, engagements, certificate
from dbOperations.dbConfig import mongoClient
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.middleware import SlowAPIMiddleware
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded


dbUsers = mongoClient.get_database("users")
collectionUsers = dbUsers.get_collection("users")

app = FastAPI()

# Initialize slowAPI Limiter
limiter = Limiter(key_func=get_remote_address, application_limits=["10/minute"])
app.state.limiter = limiter

#SlowAPI middleware for rate limiting
app.add_middleware(SlowAPIMiddleware)

# Rate Limit Exception Handler
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=S_ORIGINS_L,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def add_csp_header(request, call_next):
    response = await call_next(request)
    response.headers["Content-Security-Policy"] = "default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self';"
    return response


@app.middleware("http")
async def add_clickjacking_protection(request, call_next):
    response = await call_next(request)
    response.headers["X-Frame-Options"] = "DENY"  # Prevents embedding in iframes
    return response


@app.middleware("http")
async def add_nosniff_header(request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    return response



@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/docs")


app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(
    organizations.router, prefix="/organizations", tags=["organizations"]
)
app.include_router(engagements.router, prefix="/engagements", tags=["engagements"])
app.include_router(certificate.router, prefix="/certificate", tags=["certificate"])

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=5000)
