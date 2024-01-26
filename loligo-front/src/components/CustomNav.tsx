import CustomAvatar from "./customAvatar"
// import import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";

export default function CustomNav() {
  return (
  <>
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
  </>
    )
      }