
from typing import Union
from fastapi import APIRouter
from ..modules.new_request import new_request_func, userInfoNewRequest
from fastapi import Depends, HTTPException, Header, Body
from fastapi.security import HTTPBearer
from .utils import VerifyToken

router = APIRouter()

token_auth_scheme = HTTPBearer() 

@router.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None, token : str = Depends(token_auth_scheme)):
    result = VerifyToken(token.credentials).verify()
    # example token
    # Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik0tLTZpZ1pXOHluYmUtcHdJTE1jdyJ9.eyJpc3MiOiJodHRwczovL2Rldi1wajY0cmV2NDg0cmRyanFkLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJtOUlYd2V1TWMwbHc3cDVzNkxlazFJZUk5UmZETFpaR0BjbGllbnRzIiwiYXVkIjoiaHR0cDovLzEyNy4wLjAuMTo4MDAwLyIsImlhdCI6MTcwMTk1ODg0NiwiZXhwIjoxNzAyMDQ1MjQ2LCJhenAiOiJtOUlYd2V1TWMwbHc3cDVzNkxlazFJZUk5UmZETFpaRyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.dW_LRG7In-pMQlqUCAE7JyYZVXqT0-8_GOGrrI588hfR4qkaq_mHxnF1S7VQkq0VlCIcxrP9VtqmNRMIx7vbj7cttMYL47Nfgf6UmG5dDD9cIH0kRfXz1s6ErfozpFPReJfGzCqgKUK9d-0V3VXoPOCqLkRAYQe9OOPvKRg0bAHYEO-cWAJcPE1Fgb6TdzwRwXmsqrDLQ5i0QEmbpmclvRzCy-bEH71Er0hCYOdlSdJIMqvPkQXcp6s4L6V4nSM0diuxs_B9NRmieiVZ2jV2H4mJfJNCGfhopv5n49soJRBooSt3MFc7NhPfy8HscRaY6Ag2p8CKyjk7oi21EAlDDg
    print(200)
    return {"item_id": item_id, "q": q}



# TODO now that the api is secure find a away to send the barer token in the http header from the frontend 
@router.post("/newrequest")
async def handle_new_request(request_data : userInfoNewRequest = Body(...), token : str = Depends(token_auth_scheme)):
    result = VerifyToken(token.credentials).verify()
    return await new_request_func(request_data)
