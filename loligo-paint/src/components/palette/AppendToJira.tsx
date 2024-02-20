import Button from '@atlaskit/button';
import { useCanvas } from "../canvas/CanvasContext";
import { Storage } from "@plasmohq/storage"
import { useEffect, useState } from 'react';
import { sendToBackground } from "@plasmohq/messaging"
import React from 'react';
import { Label } from '@atlaskit/form';
import Select from '@atlaskit/select';



export default function AppendToJira() {
    const { canvasRef } = useCanvas();
    const [issueKey, setIssueKey] = useState('')
    const [selectOption, setSelectOption] = useState([{
        "label" : "Loading",
        "value" : "Loading"
    }])

    const [userChoice, setUserChoice] = useState<{} | undefined>(undefined)
    const [goButton, setGoButton] = useState<any>(<></>)

    useEffect(()=>{

    if(userChoice != undefined) setGoButton(<Button onClick={sendHandler}>Go</Button>)

    },[selectOption,userChoice])

    
        const getList = async () =>{
            
            const storage = new Storage()
            const issueKey = await storage.getItem("issueKey") 

            await sendToBackground({
                name: "fetchSubticket",
                body: {
                    issueKey: issueKey,
                }
              })

            const subtaskList = await storage.getItem("subtaskList") 
            let sub = JSON.parse(subtaskList)
            setSelectOption(sub)
        }


        const sendHandler = async () =>{
            //@ts-ignore
            let imgName = userChoice.label
            const dataURLB64 = canvasRef.current.toDataURL()
            const resAppend = await sendToBackground({
                name: "updateJiraTicket",
                body: {
                     //@ts-ignore
                    issueKey: userChoice.value,
                    dataURLB64: dataURLB64,
                    imgName: imgName
                }
              })
              
              alert(resAppend.status)

        }
            

return(
    <>

    <Label htmlFor="single-select-example">Select A Dark Pattern</Label>
    <Select
      inputId="single-select-example"
      className="single-select"
      classNamePrefix="react-select"
      options={selectOption}
      placeholder="Choose a DP"
      onMenuOpen={getList}
      onChange={(choice) => setUserChoice(choice)}
    />
    {goButton}
    </>
)
    

    
    

}