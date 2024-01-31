import {
  Avatar,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/react";

export default function GetHelp() {
  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          marginTop: "2em",
          maxWidth: "100%",
          justifyContent: "center",
        }}
      >
        <div
          className="column"
          style={{
            marginTop: "1em",
            flex: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Dropdown placement="top">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="?"
                size="lg"
                src="../../public/question-mark.png"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="my_profile" color="secondary">
                Take A Tour!
              </DropdownItem>
              <DropdownItem key="get_help" color="secondary">
                A Tips A Day Keeps Dark Patterns Away
              </DropdownItem>
              <DropdownItem key="delete_account" color="secondary">
                Get Help
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </>
  );
}
