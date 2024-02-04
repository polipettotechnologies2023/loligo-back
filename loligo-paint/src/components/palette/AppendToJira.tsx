import Button from '@atlaskit/button';
import { useCanvas } from "../canvas/CanvasContext";
import { Storage } from "@plasmohq/storage"
import { useEffect, useState } from 'react';
import { sendToBackground } from "@plasmohq/messaging"


export default function AppendToJira() {
    const { canvasRef } = useCanvas();
    const [issueKey, setIssueKey] = useState('')
    useEffect(()=>{
            (async () => {const storage = new Storage()
            const issuekeyStore = await storage.getItem("issueKey") 
            setIssueKey(issuekeyStore)
            })();
    },[])


        const sendHandler = async () =>{
            const storage = new Storage()
            const issueKey = await storage.getItem("issueKey") 
            
            const dataURLB64 = canvasRef.current.toDataURL()

            const res = await sendToBackground({
                name: "createJiraTicket",
                body: {
                    issueKey: issueKey,
                    dataURLB64: dataURLB64
                    // here you we to send also the name of the image
                }
              })

        }

        

return(
    <Button onClick={sendHandler} appearance='primary'> Attach to {issueKey}</Button>
)
    

    
    

}