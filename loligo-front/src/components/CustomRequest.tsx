import NewRequestButton from "../components/NewRequestButton";
import CustomFilter from "../components/CustomFilter";
import CustomCard from "./CustomCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { RootState } from "../vite-env";
import GetHelp from "./GetHelp";

export default function CustomRequest() {
  const [cardList, setCardList] = useState<any>("");
  const { user } = useAuth0();
  const token = useSelector((state: RootState) => state.token.value);

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
          let error = <p> is looking dry in here</p>;
          setCardList(error);
        }

        let cardMap = issues.issues.map((issue: any) => {
          console.log(issue?.fields);
          if (issue?.fields?.customfield_10068?.id !== "10081") {
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
              ></CustomCard>
            );
          }
        });
        setCardList(cardMap);
      }
    })();
  }, []);

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
          <CustomFilter></CustomFilter>
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
      <div className="gap-2 grid grid-cols-3 lg:grid-cols-4">{cardList}</div>
    </>
  );
}
