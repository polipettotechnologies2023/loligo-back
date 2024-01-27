from pydantic import BaseModel
from dotenv import dotenv_values
import requests

config = dotenv_values(".env")

class UserInfoDashboard(BaseModel):
    user_id: str

def get_dashboard(user_info: UserInfoDashboard):
    print(user_info)
    try:
        url = config["JIRA_SEARCH"]
        jql = {
            "jql": f"project= LOL AND UserID ~ '{user_info.user_id}'",
            "maxResults": 50
            }
        res = requests.post(url, json = jql, auth = (f'{config["JIRA_USERNAME"]}', config["JIRA_API_TOKEN"]))
        return res.content
    except Exception as e:
        return {'error': f'An error occurred: {str(e)}'}, 500