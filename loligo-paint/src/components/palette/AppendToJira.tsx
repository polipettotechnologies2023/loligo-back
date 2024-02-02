import Button from '@atlaskit/button';
import { useCanvas } from "../canvas/CanvasContext";
import { Storage } from "@plasmohq/storage"
import { useEffect, useState } from 'react';

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

            //make a post to the backned with the issuseURL and the canvasRef.current
            //canvasRef.current
            //after it's coplited, close the window 

        }
return(
    <Button onClick={sendHandler} appearance='primary'> Attach to {issueKey}</Button>
)
    

    

    

}