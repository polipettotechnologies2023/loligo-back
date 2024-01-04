import { useState, useEffect } from 'react'
import LogoutButton from "../components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";



export default function Home() {

  const { user } = useAuth0();

  useEffect(()=>{

    (async () => {

      
    })()
    
  },[])

    return (
  
     
         <> 
           <p>{user?.name}</p>

           <LogoutButton></LogoutButton>

           
         </>
     
         )
       
}