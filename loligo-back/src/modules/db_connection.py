from dotenv import dotenv_values
import mysql.connector
from mysql.connector import Error

config = dotenv_values(".env")


hostname = config["DB_HOST"]
database = config["DB_DATABASE"]
port = config["DB_PORT"]
username = config["DB_USER"]
password = config["DB_PWD"]
connection = mysql.connector.connect(host=hostname, database=database, user=username, password=password, port=port)

def db_open():
    try:
        if connection.is_connected():
            db_Info = connection.get_server_info()
            print("Connected to MySQL Server version ", db_Info)
            cursor = connection.cursor()
            cursor.execute("select database();")
            record = cursor.fetchone()
            print("You're connected to database: ", record)
            return True

    except Error as e:
        print("Error while connecting to MySQL", e)

def db_close():
    if connection.is_connected():
        connection.cursor().close()
        connection.close()
        print("MySQL connection is closed")
        return True

def db_insert(sqlQuery,val):
    myconnection = connection.cursor()
    myconnection.execute(sqlQuery,val)
    connection.commit()
    return True

def get_db_data(sqlQuery):
    myconnection = connection.cursor()
    myconnection.execute(sqlQuery)
    result = myconnection.fetchall()
    return result

def db_update(sqlQuery):
    myconnection = connection.cursor()
    myconnection.execute(sqlQuery)
    connection.commit()
    return True