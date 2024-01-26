from pydantic import BaseModel
from typing import Optional
from dotenv import dotenv_values
from .db_connection import db_open
from .db_connection import db_close
from .db_connection import db_insert
from .automatic_detection import automatic_dp_detection
from threading import Thread
from uuid import uuid4

config = dotenv_values(".env")

class UserInfoNewRequest(BaseModel): #this is an interface. this how you define the structure of the incoming data. I suggest to keep the interface in the same file of the function
    ticket_id: Optional[str] = None
    ticket_name : str
    website_link : str
    user_id : str
    user_email : str

class UserInfoDashboard(BaseModel):
    user_id: str

#main function module
def new_request_func(userInfoNewRequest : UserInfoNewRequest):
    userInfoNewRequest.ticket_id = uuid4()
    ticket_insetion = db_insert_req((f"{userInfoNewRequest.ticket_id}", f"{userInfoNewRequest.ticket_name}",f"{userInfoNewRequest.website_link}",f"{userInfoNewRequest.user_id}",f"{userInfoNewRequest.user_email}"))    
    Thread(target=lambda: automatic_dp_detection(userInfoNewRequest.website_link, userInfoNewRequest)).start()

    return {
                "result": "success",
                "status": 200,
                "message": "your request has been succesfull"
            }

# entriend in DB 
def db_insert_req(val):
    open_db = db_open()
    if(open_db == True):
        sql = "INSERT INTO ticket (ticket_id, time, ticket_name, websiteLink, userId, userEmail) VALUES (%s, current_timestamp(), %s, %s, %s, %s)"
        db_insert(sql,val)
        # db_close()
        return True
    return 400
