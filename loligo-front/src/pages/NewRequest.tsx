import axios from "axios"
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from '../vite-env';
import { Button } from "@nextui-org/react";

export default function NewRequest(){

    //formData is a name that represent the values that are passed in the form
    // PS: we are not using the formData obj so it's better to rename it
    const [name, setFormData] = useState('')

    const token = useSelector((state:RootState) => state.token.value);


    const createTicket = async () =>{

        let res = await axios.post(
            `${import.meta.env.VITE_PYTHON_SERVER}/newrequest/`,
            {
                name
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            }
          );

        if(res.status == 200){

            console.log(res.data)
        
        }else{

            //TODO: Change this with a good handler

            alert(res.status)
            console.log(res)
        }

    }


    return(
        <>
        <input type="text" value={name} onChange={(e) => setFormData(e.target.value)} />
        <Button onClick={createTicket}> button </Button>
        </>
        )
}