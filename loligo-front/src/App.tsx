import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginButton from './components/LoginButton'
import LogoutButton from "./components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'


function App() {
  const [count, setCount] = useState(0)
  const [hello, setHello] = useState("Not Hello")
  const { user, isAuthenticated } = useAuth0();

  



  useEffect(()=>{

    (async () => {
      let res = await axios.get(`${import.meta.env.VITE_PYTHON_SERVER}/`)
      setHello(res.data?.Hello)
    })()
    
  },[])

  return (

   isAuthenticated ? (

    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      


      <p>{user?.name}</p>
      <p>Hello {hello}</p>
      <LogoutButton></LogoutButton>

      
    </>
   ) : <LoginButton></LoginButton> 

    )
  
}

export default App
