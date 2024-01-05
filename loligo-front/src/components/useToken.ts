import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../stores/store";


export function useToken(id:string | undefined) {
  const { isAuthenticated } = useAuth0();
  const [ data, setData ] = useState('');
  const dispatch = useDispatch();
    
  useEffect(() => {
    (async () => {
      if(isAuthenticated){
        try {

          let res = await axios.get(
            `${import.meta.env.VITE_PYTHON_SERVER}/login/${id}`
          );
        

          setData(res.data)

          localStorage.setItem("token", res.data);
      
          dispatch(setToken(res.data));

        } catch (error) {
          console.log(error);
        }
      }

      })()
    

  }, [isAuthenticated]);

  //TODO: get the token out from the response and place it in the store. use this custom hook every time yiu receive a message like (unauthorised or token expired but the user is logged in.)
  return { data };
}
