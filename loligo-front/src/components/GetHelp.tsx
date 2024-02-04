import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import QuestionCircleIcon from "@atlaskit/icon/glyph/question-circle";
import TipModal from "./TipModal";

export default function GetHelp() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tip, setTip] = useState("");

  const tips = ["Tip 1", "Tip 2", "Tip 3", "Tip 4", "Tip 5", "Tip 6"];

  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    return tips[randomIndex];
  };

  const handleOpenModal = () => {
    setTip(getRandomTip());
    onOpen();
  };

  const [emailContent, setEmailContent] = useState({
    recipient: "polipettotechnologies@gmail.com",
    subject: "Custom Service - Loligo",
  });
  const sendEmail = () => {
    const { recipient, subject } = emailContent;
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}`;
  };

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
              <Button
                isIconOnly
                className="bg-gradient-to-tr from-purple-950 via-purple-800 to-fuchsia-500"
                radius="full"
              >
                <QuestionCircleIcon label="Question Icon" size="large" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="take_a_tour" color="secondary">
                Take A Tour!
              </DropdownItem>
              <DropdownItem
                key="tip_random"
                color="secondary"
                onPress={handleOpenModal}
              >
                A Tips A Day Keeps Dark Patterns Away
              </DropdownItem>
              <DropdownItem
                key="get_help_email"
                color="secondary"
                onPress={sendEmail}
              >
                Get Help
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <TipModal
            tip={tip}
            isOpenState={isOpen}
            onOpenChangeFunc={onOpenChange}
          ></TipModal>
        </div>
      </div>
    </>
  );
}
