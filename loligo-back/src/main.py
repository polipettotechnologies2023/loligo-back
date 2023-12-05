from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

from dotenv import load_dotenv #https://pypi.org/project/python-dotenv/


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

# TODO https://auth0.com/blog/build-and-secure-fastapi-server-with-auth0/






# TODO move the funcitons in separated files (aka implement modules). Set up router

# exmaple of routing with 

# # handlers.py
# def read_root():
#     return {"Hello": "World"}

# # routes.py
# from fastapi import APIRouter
# from .handlers import read_root

# router = APIRouter()

# @router.get("/")
# def root_handler():
#     return read_root()

class userInfoNewRequest(BaseModel):
    name: str
    # description: str | None = None
    # price: float
    # tax: float | None = None

@app.post("/newrequest")
async def new_request(userInfoNewRequest: userInfoNewRequest):

    
    #TODO create a new jira ticket automation ticket
    
    #TODO create a function for automatic detection of DP. this should be triggered here but we should not wait for it

    return (
            {
                "result": "success",
                "status": 200,
                # just for test
                "data": userInfoNewRequest
            }
    )