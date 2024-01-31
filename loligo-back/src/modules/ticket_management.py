from pydantic import BaseModel
from typing import List
from dotenv import dotenv_values
import requests


config = dotenv_values(".env")
JIRA_USERNAME = "polipettotechnologies@gmail.com"
JIRA_API = "https://polipetto-lolligo.atlassian.net/rest/api/2"
JIRA_BASE_URL = "https://polipetto-lolligo.atlassian.net"
#CUSTOM_FIELD_NAME = "customfield_10045"
CUSTOM_FIELD_NAME = "UserID"
JIRA_PASSWORD = "ATATT3xFfGF07QBgdCmx_WTsetPDSLpGtoEiCq6cExdz-QWEyo2DDvQouBwAec_PgbuWrAndyNv3qhYy-Ze4eTHwHAEsDAKYnOlNA5NjLwtm5jpjLS4s1LIw4Yhnxrvw65i6o5y-gYjmdeU2AJoG--58C2zF4E2YcE3yp2IFksklyK5cvsATfiA=FC9B23B0"

class Ticket(BaseModel):
    title: str
    description: str

async def get_jira_issues_by_ticket_id(ticket_id: str):
    url = f"{JIRA_API}/search"
    headers = {
        "Authorization": f"Basic {JIRA_USERNAME}:{JIRA_PASSWORD}",
        "Content-Type": "application/json",
    }

    params = {
        "jql": f"project= LOL AND UserID ~ {ticket_id}",
        "maxResults": 50,  # Adjust the number based on your needs
    }

    response = requests.get(url, headers= headers, params=params)
    response.raise_for_status()
    return response.json()
    
# Alternative method to the one above 

async def get_jira_issues_by_ticket_id2(ticket_id: str):
    url = f"{JIRA_API}/issues/{ticket_id}"
    headers = {
        "Authorization": f"Basic {JIRA_USERNAME}:{JIRA_PASSWORD}",
        "Content-Type": "application/json",
    }

    response = requests.get(url, headers= headers)
    response.raise_for_status()
    return response.json()