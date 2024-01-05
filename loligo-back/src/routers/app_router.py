
from typing import Union
from fastapi import APIRouter
from ..modules.new_request import new_request_func, userInfoNewRequest
from fastapi import Depends, HTTPException, Header, Body
from fastapi.security import HTTPBearer
from .utils import VerifyAndIssueToken as VerifyToken
from .utils import get_access_token

router = APIRouter()

token_auth_scheme = HTTPBearer() 

@router.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None, token : str = Depends(token_auth_scheme)):
    result = VerifyToken(token.credentials).verify()
    print(result)
    return result

@router.get("/login/{user_id}")
def login(user_id: str):
    access_token = get_access_token(user_id)
    return access_token

@router.post("/newrequest/")
async def handle_new_request(request_data : userInfoNewRequest = Body(...), token : str = Depends(token_auth_scheme)):
    result = VerifyToken(token.credentials).verify()
    # check the result before sendiing the request
    print(result)
    return await new_request_func(request_data)
