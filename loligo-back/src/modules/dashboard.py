from pydantic import BaseModel
from dotenv import dotenv_values
from .db_connection import db_open
from .db_connection import get_db_data

config = dotenv_values(".env")

class UserInfoDashboard(BaseModel):
    user_id: str

def get_dashboard(user_info: UserInfoDashboard):
    jsonized_results = []
    try:
        open_db = db_open()
        if open_db == True:
            sql = f"SELECT * FROM ticket WHERE userId = '{user_info.user_id}'"
            results = get_db_data(sql)

            for result in results:
                dict = {
                        'ticket_id' : result[0],
                        'creation_time': result[1],
                        'ticket_name': result[2],
                        'website_link': result[3],
                        'user_id': result[4],
                        'user_email': result[5],
                        'jira_status': result[6],
                        'description_evaluation_results' : result[7],
                        'maturity_level': result[8],
                        'dark_patterns_automatic_detection_results': result[9],
                    }
                jsonized_results.append(dict)

            return jsonized_results
        else:
            return {'error': 'Failed to open the database connection'}, 500
    except Exception as e:
        return {'error': f'An error occurred: {str(e)}'}, 500
