// import { useAuth0 } from "@auth0/auth0-react";
import CustomRequest from "../components/CustomRequest";
import CustomCertificate from "../components/CustomCerficate";
import GetHelp from "../components/GetHelp";
export default function Home() {
  // const { user } = useAuth0();

  return (
    <>
      <CustomRequest></CustomRequest>
      <CustomCertificate></CustomCertificate>
      <GetHelp></GetHelp>
    </>
  );
}
