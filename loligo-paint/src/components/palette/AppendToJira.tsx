import Button from '@atlaskit/button';
import { useCanvas } from "../canvas/CanvasContext";
import { Storage } from "@plasmohq/storage"
import { useEffect, useState } from 'react';
import { sendToBackground } from "@plasmohq/messaging"


export default function AppendToJira() {
    const { canvasRef } = useCanvas();
    const [issueKey, setIssueKey] = useState('')

    //TODO have a look here if you need to remove this
    useEffect(()=>{
            (async () => {
            const storage = new Storage()
            const issuekeyStore = await storage.getItem("issueKey") 
            setIssueKey(issuekeyStore)
            })();
    },[])

    
        const sendHandler = async () =>{
            let imgName = prompt("Please enter the dark pattern name. Please use '-' instead of spaces because this is going to be the file name in jira");

            const storage = new Storage()
            const issueKey = await storage.getItem("issueKey") 
            
            const dataURLB64 = canvasRef.current.toDataURL()

            const res = await sendToBackground({
                name: "updateJiraTicket",
                body: {
                    issueKey: issueKey,
                    dataURLB64: dataURLB64,
                    imgName: imgName
                }
              })

        }

        

return(
    <Button onClick={sendHandler} appearance='primary'> Attach to {issueKey}</Button>
)
    

    
    

}