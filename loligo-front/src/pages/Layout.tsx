import { Outlet } from "react-router-dom";
import NewRequestButton from "../components/NewRequestButton"
import CustomFilter from "../components/CustomFilter"
import CustomAvatar from "../components/customAvatar";
// TODO Creare a good layout page

const Layout = () => {
  return (
    <>
    <div style={{overflow:"auto"}}>
      <div className="container"style={{
        marginTop:"2em",
        display: "flex",
        maxHeight: "6em",
        maxWidth:"100%"
      }}>
        <div className="column" style={{
          margin:"1em 1em 0 0",
          flex: "1",
          display:"flex",
          alignItems:"center",
          justifyContent: "center",
        }}>
          <img src="loligo_branding_logo.svg" style={{
            scale:".1"
          }}></img>
        </div>
        <div className="column" style={{
          margin:"1em 1em 0 0",
          flex: "1",
          display:"flex",
          alignItems:"center",
          justifyContent: "center",
        }}>
          <img src="loligo_textonly_logo.svg" style={{
            scale: ".3"}
          }></img>
        </div>
        <div className="column" style={{
          margin:"1em 1em 0 0",
          flex: "1",
          display:"flex",
          alignItems:"center",
          justifyContent: "center",
        }}>
          <CustomAvatar></CustomAvatar>
        </div>
      </div>
      {/* Container of "My requests" header, filter and new request btn */}
      <div className="container" style={{
         display: "flex"
      }}>
        <div className="column" style={{
          margin:"1em 1em 0 0",
          flex: "1"
        }}>
            <h1 style={{textAlign:"center",
                  fontSize:"4rem",
                    fontWeight:"bolder",
                    lineHeight: "1em",
                    WebkitTextFillColor:"transparent",
                    backgroundImage: "linear-gradient(45deg, #020024, #a516b3)",
                    backgroundClip: "text",
                    margin:".5em"}}>My requests
            </h1>
        </div>
        <div className="column" style={{
          margin:"1em 1em 0 0",
          flex: "1",
          display:"flex",
          alignItems:"center",
          justifyContent: "center"
        }}>
          <CustomFilter></CustomFilter>
        </div>
        <div className="column" style={{
          margin:"1em 1em 0 0",
          flex: "1",
          display:"flex",
          alignItems:"center",
          justifyContent: "center"
        }}>
          <NewRequestButton></NewRequestButton>
        </div>
      </div>
      <div className="container" id="requests">
        <Outlet></Outlet>
      </div>
      {/* Container of "My certificates" header*/}
      <div className="container" id="myRequestsContainer" style={{
         display: "flex"
      }}>
        <div className="column" style={{
          margin:"1em 1em 0 0",
          flex: "1",
        }}>  <h1 style={{textAlign:"center",
                  fontSize:"4rem",
                  fontWeight:"bolder",
                  lineHeight: "1em",
                  WebkitTextFillColor:"transparent",
                  backgroundImage: "linear-gradient(45deg, #020024, #a516b3)",
                  backgroundClip: "text",
                  margin: ".5em"}}>My certificates
              </h1>
        </div>
        <div className="column" style={{
          margin:"1em 1em 0 0",
          flex: "1",
          display:"flex",
          alignItems:"center",
          justifyContent: "center"
        }}>
        </div>
        <div className="column" style={{
          margin:"1em 1em 0 0",
          flex: "1",
          display:"flex",
          alignItems:"left",
          justifyContent: "left"
        }}>
        </div>
      </div>
      <div className="container" id="certificates">
        <Outlet></Outlet>
      </div>
    </div>
    </>
  )
};

export default Layout;