import { useState, useEffect } from 'react'
import LoginButton from '../components/LoginButton'
import LogoutButton from "../components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'


export default function Home() {
  const [hello, setHello] = useState("Not Hello")

  const { user } = useAuth0();

  useEffect(()=>{

    (async () => {
      let res = await axios.get(`${import.meta.env.VITE_PYTHON_SERVER}/`)
      setHello(res.data?.Hello)
    })()
    
  },[])

    return (
  
     
         <> 
           <p>{user?.name}</p>
           <p>Hello {hello}</p>
           <LogoutButton></LogoutButton>

           
         </>
     
         )
       
}