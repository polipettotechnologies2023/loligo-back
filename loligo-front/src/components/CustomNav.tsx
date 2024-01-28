import CustomAvatar from "./customAvatar";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

export default function CustomNav() {

  return (
    <>
      <Navbar
        style={{
          marginTop: "2em",
          display: "flex",
          maxHeight: "8em",
          maxWidth: "100%",
        }}
      >
        <NavbarContent>
          <NavbarBrand>
            <img src="loligo_branding_logo.svg" width="20%"></img>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent>
        <NavbarBrand>
          <img src="loligo_textonly_logo.svg" width="100%"></img>
        </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <CustomAvatar></CustomAvatar>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}
