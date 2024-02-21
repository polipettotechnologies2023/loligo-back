import { Outlet } from "react-router-dom";

import CustomNav from "../components/CustomNav";
// TODO Creare a good layout page

const Layout = () => {
  return (
    <>
    <CustomNav></CustomNav>
      {/* Container of "My requests" header, filter and new request btn */}

      <div className="container" id="requests" style={{
        maxWidth:"100%"
      }}>
        <Outlet></Outlet>
      </div>
      {/* Container of "My certificates" header*/}


    </>
  )
};

export default Layout;