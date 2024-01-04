import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export function useToken() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        try {
          setLoading(true); 

          let res = await axios.get(
            `${import.meta.env.VITE_PYTHON_SERVER}/login`
          );

          setData(res.data[0]);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [isAuthenticated]);

  //TODO: get the token out from the response and place it in the store. use this custom hook every time yiu receive a message like (unauthorised or token expired but the user is logged in.)
  return { data, loading };
}
