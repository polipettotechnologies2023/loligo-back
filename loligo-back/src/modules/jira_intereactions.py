from dotenv import dotenv_values
import requests
from threading import Thread

config = dotenv_values(".env")

def ticket_creation(data,dp_result):
    url = config["JIRA_WEBHOOK_CREATE_TICKET"] 

    # remider, before send inf the data back, in python you have to paseit into a dict and then sent it as a json
    my_dict = {
        "ticket_id":  f"{data.ticket_id}",
        "ticket_name": data.ticket_name,
        "website_link" : data.website_link,
        "user_id" : data.user_id,
        "user_email" : data.user_email,
        "dark_patterns_detected" : dp_result
    } 

    try:
        res = requests.post(url, json = my_dict)
        print(res)

        print("jira ticket creation was called succesfully")

    except:
        print("error in request for jira")
        # if this return false notify the adminitrator or something
        return False
    return True
