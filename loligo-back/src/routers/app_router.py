
from typing import Union
from fastapi import APIRouter
from ..modules.new_request import new_request_func, UserInfoNewRequest
from fastapi import Depends, HTTPException, Header, Body
from fastapi.security import HTTPBearer
from .utils import VerifyAndIssueToken as VerifyToken
from .utils import get_access_token
from ..modules.dashboard import get_dashboard, UserInfoDashboard
from ..modules.ticket_management import get_jira_issues_by_ticket_id, get_jira_issues_by_ticket_id2
import requests


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


# endpoints for jira automations

@router.post("/tickets/{ticket_id}")
async def get_issues_by_ticket_id(ticket_id: str):
    try:
        issues = await get_jira_issues_by_ticket_id(ticket_id)
        return {"issues": issues["issues"]}
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Jira API request failed: {str(e)}")

#same route method as above but just to get
@router.get("/tickets/{ticket_id}")
async def get_issues_by_ticket_id2(ticket_id: str):
    try:
        issues = await get_jira_issues_by_ticket_id2(ticket_id)
        return {"issues": issues["issues"]}
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Jira API request failed: {str(e)}")