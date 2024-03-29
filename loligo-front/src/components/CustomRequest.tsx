import NewRequestButton from "../components/NewRequestButton";
import CustomFilter from "../components/CustomFilter";
import CustomCard from "./CustomCard";
import EmptyCard from "./EmptyCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { RootState } from "../vite-env";
import GetHelp from "./GetHelp";

export default function CustomRequest() {
  const [cardList, setCardList] = useState<any>("");
  const [emptyRequest, setEmptyRequest] = useState("hidden");
  const { user } = useAuth0();
  const token = useSelector((state: RootState) => state.token.value);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    (async () => {
      if (user?.sub) {
        let user_id = await extractUserId(user?.sub);
        let res = await axios.post(
          `${import.meta.env.VITE_PYTHON_SERVER}/dashboard`,
          {
            user_id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );

        //@alexis imporve with a card or an image that says "it's looking dry in here"
        let issues = JSON.parse(res.data);
        if (issues.issues.length == 0) {
          setEmptyRequest("contents");
        }

        let cardMap = issues.issues.map((issue: any) => {
          console.log(issue?.fields);
          let showCard = false;
          if (
            tab === "sent" &&
            issue?.fields?.status?.id === "10000" &&
            issue?.fields?.customfield_10068.id === "10084"
          ) {
            showCard = true;
          } else if (
            tab === "in-review" &&
            (issue?.fields?.status?.id === "10015" ||
              issue?.fields?.status?.id === "10016" ||
              issue?.fields?.status?.id === "10017") &&
            issue?.fields?.customfield_10068.id === "10084"
          ) {
            showCard = true;
          } else if (
            tab === "done" &&
            issue?.fields?.status?.id === "10002" &&
            (issue?.fields?.customfield_10068.id === "10082" ||
              issue?.fields?.customfield_10068.id === "10083")
          ) {
            showCard = true;
          } else if (
            tab === "all" &&
            issue?.fields?.customfield_10068?.id !== "10081"
          ) {
            showCard = true;
          }
          return (
            <CustomCard
              key={issue?.fields?.customfield_10062}
              ticketId={issue.key}
              status={issue?.fields?.status?.id}
              website_link={issue?.fields?.customfield_10074}
              websiteName={issue?.fields?.summary}
              outcome={issue?.fields?.customfield_10068.id}
              entry_time={issue?.fields?.customfield_10046}
              automaticDetectionResults={issue?.fields?.customfield_10070}
              automatedDarkPatterns={issue?.fields?.customfield_10075}
              manualDarkPatterns={issue?.fields?.customfield_10073}
              showCard={showCard}
            ></CustomCard>
          );
        });
        setCardList(cardMap);
      }
    })();
  }, [tab]);


  async function extractUserId(userString: string) {
    const separatorIndex = userString.indexOf("|");
    if (separatorIndex !== -1) {
      return userString.slice(separatorIndex + 1);
    } else {
      return userString;
    }
  }

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
          }}
        >
          <h1
            id="my-request-text"
            className="text-6xl	bg-gradient-to-tr from-purple-950 via-purple-800 to-fuchsia-500 text-transparent text-wrap bg-clip-text font-bold text-center"
            style={{
              margin: ".5em",
            }}
          >
            My requests
          </h1>
        </div>
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
          <CustomFilter filterCards={setTab}></CustomFilter>
        </div>
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
          <NewRequestButton></NewRequestButton>
          <div
            style={{
              marginLeft: "1em",
              marginTop: "0.5em",
            }}
          >
            <GetHelp></GetHelp>
          </div>
        </div>
      </div>
      <div>
        <EmptyCard displayValue={emptyRequest}></EmptyCard>
      </div>
      <div className="gap-2 grid grid-cols-3 lg:grid-cols-4 ml-10">
        {cardList}
      </div>
    </>
  );
}
