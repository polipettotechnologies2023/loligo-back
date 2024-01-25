from pydantic import BaseModel
from dotenv import dotenv_values
import requests
import mysql.connector
from .db_connection import db_open
from .db_connection import db_close
from .db_connection import get_db_data

config = dotenv_values(".env")

class UserInfoDashboard(BaseModel):
    user_id: str

def get_dashboard(user_info: UserInfoDashboard):
    try:
        open_db = db_open()
        if open_db == True:
            sql = f"SELECT * FROM ticket WHERE userId = '{user_info.user_id}'"
            result = get_db_data(sql)
            db_close()
            return {'result': result}
        else:
            return {'error': 'Failed to open the database connection'}, 500
    except Exception as e:
        return {'error': f'An error occurred: {str(e)}'}, 500
