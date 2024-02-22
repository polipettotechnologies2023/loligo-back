from dotenv import dotenv_values
import requests
from threading import Thread
from pydantic import BaseModel
from typing import Optional
import json

class UserInfoNewRequest(BaseModel):
    ticket_id: Optional[str] = None
    ticket_name : str
    website_link : str
    user_id : str
    user_email : str

class JiraRequest(BaseModel): #this is an interface. this how you define the structure of the incoming data. I suggest to keep the interface in the same file of the function
    issue_id: str
    oldData : UserInfoNewRequest
       

config = dotenv_values(".env")

def ticket_creation(data):
    jira_endpoint = f'{config["JIRA_API"]}/issue'
    print(data)

    # remider, before send inf the data back, in python you have to paseit into a dict and then sent it as a json
    payload = {
    "fields": {
        "project": {
        "key": "LOL"
        },
        "issuetype": {
        "id": "10001"
        },
        "summary": f"{data.ticket_name}",
        "description": {
        "content": [
            {
            "content": [
                {
                "text": "test description",
                "type": "text"
                }
            ],
            "type": "paragraph"
            }
        ],
        "type": "doc",
        "version": 1
        },
        "labels": [],
        "assignee": "null", 
        "reporter": {
        "id": "557058:f58131cb-b67d-43c7-b30d-6b58d40bd077"
        }, 
        "customfield_10065": f"{data.user_email}",
        "customfield_10057": f"{data.user_id}",
        "customfield_10074": f"{data.website_link}",
    },
    "update": {}
    }

    try:
        res = requests.post(jira_endpoint, json = payload, auth = (f'{config["JIRA_USERNAME"]}', config["JIRA_API_TOKEN"]))
        print(res)
        return res
    except:
        print("error in request for jira")
        # if this return false notify the adminitrator or something
    return False


def update_issue_dp(data,dp_result):
    
    jira_endpoint = f'{config["JIRA_API"]}/issue/{data["key"]}'

    print(data)
    print(data["key"])
    print(dp_result)
    

    if not dp_result: 
        formatted_data = "No Dark Patterns Detected!"
    else:
        formatted_data = ""
        categories_to_update = []
        all_categories = ["Fake Activity", "Fake Countdown", "Confirmshaming", "Scarcity"]
        for category in all_categories:
            if category in dp_result and dp_result[category]:
                categories_to_update.append(category)


    # remider, before send inf the data back, in python you have to paseit into a dict and then sent it as a json
    payload = {
        "fields": {
        "customfield_10075": [{"value": category} for category in categories_to_update],
    }
    } 

    try:
        res = requests.put(jira_endpoint, json = payload, auth = (f'{config["JIRA_USERNAME"]}', config["JIRA_API_TOKEN"]))
        print(res)
        if(res.status_code == 200):
            print("jira update has been called succesfully")
            return True
    except:
        print("error in request for jira")
        # if this return false notify the adminitrator or something
    return False