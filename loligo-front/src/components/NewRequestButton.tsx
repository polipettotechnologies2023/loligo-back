import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
} from "@nextui-org/react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../vite-env";
import ConfermationModal from "./ConfermationModal";



export default function newRequestButton() {
  const { user } = useAuth0();

  const [websiteName, setWebsiteName] = useState("");
  const [webSiteLink, setWebsiteLink] = useState("");
  const [confermationModal, setConfermationModal] = useState<any>(undefined);
  const [disabled, setDisabled] = useState<any>(false)
  const [errorMsgName, setErrorMessageName] = useState("");
  const [errorMsgLink, setErrorMessageLink] = useState("");
  const token = useSelector((state: RootState) => state.token.value);
    
  useEffect(()=>{
    
  },[confermationModal,disabled])

  const SubmitButtonHandler = async () => {
    if (webSiteLink !== "https://" && websiteName !== "" && webSiteLink != ""){
      console.log("WEBSITE LINK VALUE:" + webSiteLink);
    if (user?.sub) {
      let user_id = extractUserId(user?.sub);
      let res = await axios.post(
        `${import.meta.env.VITE_PYTHON_SERVER}/newrequest`,
        {
          ticket_name: websiteName,
          website_link: webSiteLink,
          user_email: user?.email,
          user_id: user_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      if (res.status == 200) {
        setDisabled(true)
        return setConfermationModal(<ConfermationModal></ConfermationModal>)
      } else {
        //TODO: Change this with a good handler
        alert(res.status);
        console.log(res);
      }
    }
  } else if(webSiteLink == "https://" || webSiteLink == "" && websiteName != "") {
    setErrorMessageName("");
    setErrorMessageLink("Please provde the website's url");
  } else if (websiteName == "" && webSiteLink != "https://"){
    setErrorMessageName("Please provide the website's name");
    setErrorMessageLink("");
  } else if (webSiteLink == "https://" || webSiteLink == "" && websiteName == ""){
    setErrorMessageName("Please provide the website's name");
    setErrorMessageLink("Please provde the website's url");
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
    <>
    {confermationModal}
    <Popover placement="bottom" showArrow={true} size="lg">
      <PopoverTrigger>
        <Button
          id="new-request-button"
          className="bg-gradient-to-tr from-purple-950 via-purple-800 to-fuchsia-500 text-white"
        >
          New request
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div
            style={{
              paddingTop: "1em",
            }}
          >
            <div className="text-small font-bold">New request</div>
            <div className="text-tiny">Please provide the following: </div>
            <label
              style={{
                //fontSize: "1rem",
                lineHeight: "2",
                fontWeight: "bold",
              }}
            >
              Your website's name:{" "}
            </label>
            <Input
              type="websiteName"
              isRequired
              label="Website Name"
              placeholder="i.e. Loligo"
              errorMessage={errorMsgName}
              style={{}}
              onChange={(e) => setWebsiteName(e.target.value)}
            />
          </div>
          <div
            style={{
              paddingTop: "1em",
            }}
          >
            <label
              style={{
                fontSize: "1rem",
                lineHeight: "2",
                fontWeight: "bold",
              }}
              
            >
              Your base URL:{" "}
            </label>
            <Input
              type="url"
              label="Website URL"
              isRequired
              placeholder="www.loligo.com"
              errorMessage={errorMsgLink}
              onChange={(e) => {setWebsiteLink("https://" + e.target.value); console.log(e.target.value)}}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">https://</span>
                </div>
              }
            />
            <div
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "1em",
              }}
            >
              <Button
                className="bg-gradient-to-tr from-purple-950 via-purple-800 to-fuchsia-500 text-white"
                isDisabled={disabled}
                onClick={() => {SubmitButtonHandler(); }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
    </>
  );
}
