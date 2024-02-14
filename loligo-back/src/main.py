from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import app_router
import uvicorn


app = FastAPI()
app.include_router(app_router.router)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

uvicorn.run(app, host="0.0.0.0", port=8080)

