import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../vite-env";

export default function NewRequest() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user } = useAuth0();
  
  
  const [websiteName, setWebsiteName] = useState("");
  const [webSiteLink, setWebsiteLink] = useState("");
  const token = useSelector((state: RootState) => state.token.value);

  const SubmitBottonHandler = async () => {
    // you can find the data to send in the backand interface
    //  for the ticketId use this library https://www.npmjs.com/package/uuid
    let res = await axios.post(
      `${import.meta.env.VITE_PYTHON_SERVER}/newrequest`,
      {
        "ticket_name" : websiteName,
        "website_link" : webSiteLink,
        "user_email" : user?.email,
        "user_id" : user?.sub,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );

    if (res.status == 200) {
      console.log(res.data);
    } else {
      //TODO: Change this with a good handler

      alert(res.status);
      console.log(res);
    }
    // console.log(webSiteLink)
    // console.log(websiteName)
    

  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        ➕ new Request{" "}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Request
              </ModalHeader>
              <ModalBody>
                <p>Your Website Name:</p>
                <Input
                  autoFocus
                  onChange={(e) => setWebsiteName(e.target.value)}
                  label=""
                  placeholder="i.e.Loligo"
                  variant="bordered"
                />
                <p>Your Base URL:</p>
                <Input
                onChange={ e => setWebsiteLink(e.target.value)}
                  label=""
                  placeholder="i.e.polipetto.pp.ua"
                  type="WebsiteURL"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <p>
                  HINT: A correct base URL looks something like this:
                  https://www.instagram.com/
                </p>
                <Button color="primary" onPress={() => SubmitBottonHandler()}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    
    </>
  );
}
