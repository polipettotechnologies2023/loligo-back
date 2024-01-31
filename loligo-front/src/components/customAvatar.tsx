import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { useAuth0 } from "@auth0/auth0-react";

export default function CustomAvatar() {
  const { user, logout } = useAuth0();
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
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
        <DropdownItem key="my_profile" color="secondary">
          Profile
        </DropdownItem>
        <DropdownItem key="get_help" color="secondary">
          Get Help
        </DropdownItem>
        <DropdownItem key="delete_account" color="secondary">
          Delete my account
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
