from pydantic import BaseModel
from dotenv import dotenv_values
import requests

config = dotenv_values(".env")

class userInfoNewRequest(BaseModel): #this is an interface. this how you define the structure of the incoming data. I suggest to keep the interface in the same file of the function
    name: str
    description: str
    domainName: str 
    # tax: float | None = None


#main function module
async def new_request_func(userInfoNewRequest : userInfoNewRequest):

    ticket_step = await ticket_creation(userInfoNewRequest)

    if ticket_step != 200:
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
    my_dict = {"name" : data.name,"description" : data.description, "domainName" : data.domainName, }

    try:
        res = requests.post(url, json = my_dict)
        print(res)
    except:
        print("errro in request for jira")
        return {"error" : "error"}
    
    return 200


# entriend in DB 
async def db_insert():
    return 



# DP Automation recognition, turn this function into a module. import it and dont await for it to finish before sending the answer.
async def automatic_DP_detection():
    #TODO create a function for automatic detection of DP. this should be triggered here but we should not wait for it
    return 
    