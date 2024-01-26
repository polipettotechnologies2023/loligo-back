
from typing import Union
from fastapi import APIRouter
from ..modules.new_request import new_request_func, UserInfoNewRequest
from fastapi import Depends, HTTPException, Header, Body
from fastapi.security import HTTPBearer
from .utils import VerifyAndIssueToken as VerifyToken
from .utils import get_access_token
from ..modules.dashboard import get_dashboard, UserInfoDashboard
from ..modules.certificates import get_my_certificates
from ..modules.jira_intereactions import store_issue_id

router = APIRouter()

token_auth_scheme = HTTPBearer() 

# endpoints for our frontend 

@router.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None, token : str = Depends(token_auth_scheme)):
    result = VerifyToken(token.credentials).verify()
    print(result)
    return result

@router.get("/login/{user_id}")
def login(user_id: str):
    access_token = get_access_token(user_id)
    return access_token


@router.post("/dashboard")
def handle_dahsboard(request_data : UserInfoDashboard = Body(...), token : str = Depends(token_auth_scheme)):
    result = VerifyToken(token.credentials).verify()
    # TODO: check the result before sendiing the request
    print(result)
    return get_dashboard(request_data)


@router.post("/newrequest")
async def handle_new_request(request_data : UserInfoNewRequest = Body(...), token : str = Depends(token_auth_scheme)):
    result = VerifyToken(token.credentials).verify()
    # TODO: check the result before sendiing the request
    print(result)
    return new_request_func(request_data)


@router.post("/mycertificates")
async def handle_get_my_certificates(request_data : UserInfoDashboard = Body(...), token : str = Depends(token_auth_scheme)):
    result = VerifyToken(token.credentials).verify()
    # TODO: check the result before sendiing the request
    print(result)
    return get_my_certificates(request_data)



# endpoints for jira automations

# @router.post("/certify")
# async def handle_new_request(request_data : UserInfoNewRequest = Body(...), token : str = Depends(token_auth_scheme)):
#     result = VerifyToken(token.credentials).verify()
#     # TODO: check the result before sendiing the request
#     print(result)
#     return new_request_func(request_data)

@router.post("/issueid")
async def handle_storage_issue_id(request_data : UserInfoNewRequest = Body(...), token : str = Depends(token_auth_scheme)):
    result = VerifyToken(token.credentials).verify()
    # TODO: check the result before sendiing the request
    print(result)
    return store_issue_id(request_data)
