from pydantic import BaseModel
from dotenv import dotenv_values
import requests
import mysql.connector
from .db_connection import db_open
from .db_connection import db_close
from .db_connection import db_insert

config = dotenv_values(".env")
