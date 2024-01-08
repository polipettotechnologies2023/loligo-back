import { Outlet } from "react-router-dom";
import CustomNav from "../components/CustomNav"

// TODO Creare a good layout page

const Layout = () => {
  return (
    <>
    <br />
      <CustomNav></CustomNav>
      <br />
      <br />
      {/* TODO: change the br with some real spacing in css/trailwind/nexui */}
      <Outlet />
    </>
  )
};

export default Layout;