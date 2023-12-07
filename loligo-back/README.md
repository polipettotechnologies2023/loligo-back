# How to install requirements
pip install -r requirements.txt

# How to start the server app
uvicorn src.main:app --reload 
and with a specific port -> uvicorn src.main:app --reload --port 8001

# Problems
if yout IDE is giving you errors relaterd to FastAPI please follow this guide https://fastapi.tiangolo.com/

# How to work with inverinonment variables in the python backend? 
https://pypi.org/project/python-dotenv/