
from typing import Union
from fastapi import APIRouter
from ..modules.new_request import new_request_func, userInfoNewRequest

router = APIRouter()



@router.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    print(200)
    return {"item_id": item_id, "q": q}


# TODO https://auth0.com/blog/build-and-secure-fastapi-server-with-auth0/ try to secure the endpoint in order to receive a jwt in the header
@router.post("/newrequest")
async def handle_new_request(request_data : userInfoNewRequest):
    return await new_request_func(request_data)
