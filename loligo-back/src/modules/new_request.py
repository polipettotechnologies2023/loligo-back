from pydantic import BaseModel
from dotenv import dotenv_values
import requests
import mysql.connector
from .db_connection import db_open
from .db_connection import db_close
from .db_connection import db_insert

config = dotenv_values(".env")

class userInfoNewRequest(BaseModel): #this is an interface. this how you define the structure of the incoming data. I suggest to keep the interface in the same file of the function
    # ticket_id: asdjsaldjakjdkasdjlajdk
    ticket_name : str
    website_link : str
    user_id : str
    user_email : str


#main function module
async def new_request_func(userInfoNewRequest : userInfoNewRequest):

    ticket_insetion = await db_insert_req((f"{userInfoNewRequest.ticket_name}", f"{userInfoNewRequest.domain_name}",f"{userInfoNewRequest.website_link}",f"{userInfoNewRequest.user_id}",f"{userInfoNewRequest.user_email}"))    
    ticket_step = await ticket_creation(userInfoNewRequest)

    if ticket_step != True:
        return ticket_step


    return {
                "result": "success",
                "status": 200,
                "message": "your request has been succesfull"
            }


# ticket creation 
async def ticket_creation(data):
    url = config["JIRA_WEBHOOK_CREATE_TICKET"] 

    # remider, before sendinf the data back, in python you have to paseit into a dict and then sent it as a json
    my_dict = {
        # "ticket_id": Unique ID also that needs to be passed to the other dark patter funcitons
        "ticket_name": data.ticket_name,
        "website_link" : data.website_link,
        "user_id" : data.user_id,
        "user_email" : data.user_email
    } # tmp dict
    
    try:
        res = requests.post(url, json = my_dict)
        print(res)
    except:
        print("error in request for jira")
        return {"error" : "error"}
    return True


# entriend in DB 
async def db_insert_req(val):
    open_db = await db_open()
    if(open_db == True):
        sql = "INSERT INTO ticket (time, ticket_name, websiteLink, userId, userEmail) VALUES (current_timestamp(), %s, %s, %s, %s)"
        await db_insert(sql,val)
        await db_close()
        return True
    return False


# DP Automation recognition, turn this function into a module. import it and dont await for it to finish before sending the answer.
async def automatic_DP_detection():
    #TODO create a function for automatic detection of DP. this should be triggered here but we should not wait for it
    return 
    