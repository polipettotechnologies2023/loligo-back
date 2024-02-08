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
//////
import { useSetState } from "react-use";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { logGroup } from "./Helpers";

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

  //////////
  interface State {
    run: boolean;
    steps: Step[];
  }

  const [{ run, steps }, setState] = useSetState<State>({
    run: false,
    steps: [
      {
        content: (
          <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>
            Let's begin our journey!
          </h2>
        ),
        placement: "center",
        target: "body",
      },
      {
        content: <h2>Under this title, you can see all your requests.</h2>,
        placement: "bottom",
        target: "#my-request-text",
        title: "Request",
      },
      {
        content: (
          <div>
            <h2>
              By choosing one of the categories, you can easily see your
              requests that fulfill the selected requirement.
            </h2>
            <h2>
              For example, when you click "In Review", your requests that are
              being reviewed by our experts will be shown below "My requests".
            </h2>
          </div>
        ),
        placement: "bottom",
        target: "#custom-filter",
        title: "Custom Filter",
      },
      {
        content: (
          <div>
            <h2>
              By clicking this button, a new request can be easily created!
            </h2>
            <h2>You just need to fill in:</h2>
            <h3>the name of your website and its URL.</h3>
          </div>
        ),
        placement: "bottom",
        target: "#new-request-button",
        title: "New Request Button",
      },
      {
        content: (
          <div>
            <h2>By clicking your avatar, you can see:</h2>
            <h2>the email your signed in with,</h2>
            <h2>manage your profile,</h2>
            <h2>go to the get help page,</h2>
            <h2>delete your account,</h2>
            <h2>or log out.</h2>
          </div>
        ),
        placement: "bottom",
        target: "#custom-avatar",
        title: "Your Profile",
      },
      {
        content: (
          <h2>
            Under this title, you can see all the certificates you've got.
          </h2>
        ),
        placement: "bottom",
        target: "#my-certificate-text",
        title: "Certificate",
      },
      {
        content: (
          <div>
            <h2>By clicking this button:</h2>
            <h2>you can re-read this tour,</h2>
            <h2>read a random tip about dark patterns,</h2>
            <h2>
              or send us an email directly through clicking the "Get Help".
            </h2>
          </div>
        ),
        placement: "bottom",
        target: "#help-button",
        title: "Help Button",
      },
    ],
  });

  const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    setState({
      run: true,
    });
  };
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState({ run: false });
    }

    logGroup(type, data);
  };

  return (
    <>
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideCloseButton
        run={run}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
        styles={{
          options: {
            zIndex: 10000,
            arrowColor: "#e3ffeb",
            primaryColor: "#6327B0",
            textColor: "#06004A",
            width: 350,
          },
        }}
      />
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
                id="help-button"
                className="bg-gradient-to-tr from-purple-950 via-purple-800 to-fuchsia-500"
                radius="md"
              >
                <QuestionCircleIcon label="Question Icon" size="large" />
                <span className="text-white">Need Help</span>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="take_a_tour"
                color="secondary"
                onClick={handleClickStart}
              >
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
