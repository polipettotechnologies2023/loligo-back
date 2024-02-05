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
import DataTips from "./DataTips";

export default function GetHelp() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tipTitle, setTipTitle] = useState("");
  const [tipContent, setTipContent] = useState("");

  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * DataTips.length);
    return DataTips[randomIndex];
  };

  const handleOpenModal = () => {
    const currTip = getRandomTip();
    const tip_title = currTip.title;
    setTipTitle(tip_title);
    const tip_content = currTip.content;
    setTipContent(tip_content);
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
        id="getHelpContainer"
        style={{
          display: "flex",
          marginTop: "5em",
          maxWidth: "100%",
          justifyContent: "center",
        }}
      >
        <div
          className="column"
          style={{
            margin: "1em 1em 0 0",
            flex: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></div>
        <div
          className="column"
          style={{
            margin: "1em 1em 0 0",
            flex: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></div>
        <div
          className="column"
          style={{
            height: "100px",
            flex: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Dropdown placement="top">
            <DropdownTrigger>
              <Button
                className="bg-gradient-to-tr from-purple-950 via-purple-800 to-fuchsia-500"
                radius="md"
              >
                <QuestionCircleIcon label="Question Icon" size="large" />
                <span className="text-white">Need Help</span>
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
            tip_title={tipTitle}
            tip_content={tipContent}
            isOpenState={isOpen}
            onOpenChangeFunc={onOpenChange}
          ></TipModal>
        </div>
      </div>
    </>
  );
}
