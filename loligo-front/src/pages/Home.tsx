// import { useAuth0 } from "@auth0/auth0-react";
import CustomRequest from "../components/CustomRequest"
import CustomCertificate from "../components/CustomCerficate"
export default function Home() {

  // const { user } = useAuth0();


    return (
      <>
            <CustomRequest></CustomRequest>
            <CustomCertificate></CustomCertificate>
            </>
         )

       
}