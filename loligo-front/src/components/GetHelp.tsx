import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  useDisclosure,
  Button,
  Tooltip,
} from "@nextui-org/react";
import { useState } from "react";
import QuestionCircleIcon from "@atlaskit/icon/glyph/question-circle";
import TipModal from "./TipModal";

export default function GetHelp() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tip, setTip] = useState("");

  const tips = [
    "Dark patterns are tricks used in websites and apps that make you do things that you didn't mean to, like buying or signing up for something.",
    "Many types of dark patterns are already illegal in the EU and US, depending on the type and context of use.",
    "'Comparison prevention' is a dark pattern that makes the comparison of products as difficult as possible for users. This enables the provider to steer them towards a decision that generates more revenue, but may not be in the user's best interest.",
    "'Trick wording' is a dark pattern that takes advantage of user expectations and ambiguous language to mislead and deceive users.",
    "Dark patterns are also known as 'deceptive patterns'.",
    "'Preselection' employs a psychological phenomenon where people tend to go with the option that is already chosen for them, even if there are other choices available. ",
  ];

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
            tip={tip}
            isOpenState={isOpen}
            onOpenChangeFunc={onOpenChange}
          ></TipModal>
        </div>
      </div>
    </>
  );
}
