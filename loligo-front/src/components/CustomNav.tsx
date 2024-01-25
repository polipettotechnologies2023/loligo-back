import {Navbar, NavbarBrand, NavbarContent, NavbarItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button} from "@nextui-org/react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export default function CustomNav() {
    const {user, logout} = useAuth0();
    

  return (
    <Navbar>
      <NavbarBrand>
        <Link to="/">
            <img src="" alt="Logo that goes home" />
        </Link>
      </NavbarBrand>

      <NavbarContent className=" sm:flex gap-4" justify="center">

        <NavbarItem>
        <Link to="/newrequest"><Button> ➕ new Request</Button></Link>
        </NavbarItem>
        
      </NavbarContent>
        
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name={user?.name}
              size="lg"
              src={user?.picture}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
            
            
            <DropdownItem key="profile">Profile</DropdownItem>
            <DropdownItem key="get_help">Get Help</DropdownItem>
            <DropdownItem key="delete_my_account">Delete my account</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
