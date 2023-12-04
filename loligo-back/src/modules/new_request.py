import sys


class userInfoNewRequest(BaseModel):
    name: str
    # description: str | None = None
    # price: float
    # tax: float | None = None

async def new_request(userInfoNewRequest: userInfoNewRequest):
    
    #TODO create a new jira ticket automation ticket
    
    #TODO create a function for automatic detection of DP. this should be triggered here but we should not wait for it



    return (
            {
                "result": "success",
                "status": 200,
                # just for test
                "data": userInfoNewRequest
            }
    )


sys.modules[__name__] = new_request