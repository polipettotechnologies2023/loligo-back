# How to install requirements
pip install -r requirements.txt

# Build docker image 
docker build -t loligo-back .

# Run docker container 
docker run -dp 127.0.0.1:8080:8080 loligo-back

# How to start the server app
python3 -m src.main

# Problems
if yout IDE is giving you errors relaterd to FastAPI please follow this guide https://fastapi.tiangolo.com/

# How to work with inverinonment variables in the python backend? 
https://pypi.org/project/python-dotenv/

# What if get acertificate issue on my mac? 
https://stackoverflow.com/questions/40684543/how-to-make-python-use-ca-certificates-from-mac-os-truststore

# How to connect to your local db
Change the values in the .env file