import {Popover, PopoverTrigger, PopoverContent, Button,Input} from "@nextui-org/react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../vite-env";

export default function newRequestButton() {
    const { user } = useAuth0();
    
    
    const [websiteName, setWebsiteName] = useState("");
    const [webSiteLink, setWebsiteLink] = useState("");
    const token = useSelector((state: RootState) => state.token.value);
  
    const SubmitButtonHandler = async () => {
      // you can find the data to send in the backand interface
      //  for the ticketId use this library https://www.npmjs.com/package/uuid
      if(user?.sub)
      {
      let user_id = extractUserId(user?.sub)
      let res = await axios.post(
        `${import.meta.env.VITE_PYTHON_SERVER}/newrequest`,
        {
          "ticket_name" : websiteName,
          "website_link" : webSiteLink,
          "user_email" : user?.email,
          "user_id" : user_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
  
      if (res.status == 200) {
        console.log(res.request)
        console.log(res.data);
        window.location.reload();
      } else {
        //TODO: Change this with a good handler
        alert(res.status);
        console.log(res);
      }  
    }
    };

    function extractUserId(userString: string) {
      const separatorIndex = userString.indexOf("|");
      if (separatorIndex !== -1) {
          return userString.slice(separatorIndex + 1);
      } else {
          return userString;
      }
  }
    
  return (
    <Popover placement="bottom" showArrow={true} size="lg">
      <PopoverTrigger>
        <Button className="bg-gradient-to-tr from-purple-950 via-purple-800 to-fuchsia-500 text-white">New request</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div style={{
             paddingTop: "1em"
          }}>
          <div className="text-small font-bold">New request</div>
          <div className="text-tiny">Please provide the following: </div>
          <p style={{
            //fontSize: "1rem",
            lineHeight: "2",
            fontWeight: "bold"
          }}>Your website's name: </p>  
          <Input type="websiteName" placeholder="i.e. Loligo" style={{
          }} onChange={ e => setWebsiteName(e.target.value)} />
          
          </div>
          <div style={{
             paddingTop: "1em"
          }}>
          <p style={{
            fontSize: "1rem",
            lineHeight: "2",
            fontWeight: "bold"
          }}>Your base URL: </p>  
          <Input type="websiteName" placeholder="i.e. https://www.loligo.com/" onChange={ e => setWebsiteLink(e.target.value)}/>
          <div style={{
            display:"flex",
            alignContent:"center",
            alignItems:"center",
            justifyContent:"center",
            paddingTop: "1em"
          }}>
          <Button className="bg-gradient-to-tr from-purple-950 via-purple-800 to-fuchsia-500 text-white" onClick={() => SubmitButtonHandler()}>Submit</Button>
          </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
