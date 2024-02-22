import CustomCard from "./CustomCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { RootState } from "../vite-env";

export default function CustomCertificate() {
  const [cardList, setCardList] = useState("");
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
          }
        );

        let issues = JSON.parse(res.data);
        let cardMap = issues.issues.map((issue: any) => {
          if (issue?.fields?.customfield_10068?.id == "10081") {
            return (
              <CustomCard
                key={issue?.fields?.customfield_10062}
                ticketId={issue.key}
                status={issue?.fields?.status?.id}
                website_link={issue?.fields?.customfield_10074}
                websiteName={issue?.fields?.summary}
                outcome={issue?.fields?.customfield_10068.id}
                entry_time={issue?.fields?.customfield_10046}
                finish_time={issue?.fields?.customfield_10055}
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
        id="myRequestsContainer"
        style={{
          display: "flex",
        }}
      >
        <div
          className="column ml-20"
          style={{
            flex: "1",
          }}
        >
          <h1
            id="my-certificate-text"
            className="ml-10 text-6xl	bg-gradient-to-tr from-sky-400 via-sky-500 to-blue-500 text-transparent text-wrap bg-clip-text font-bold text-right"
            style={{
              margin: ".5em",
            }}
          >
            My certificates
          </h1>
        </div>
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
            alignItems: "left",
            justifyContent: "left",
          }}
        ></div>
      </div>
      <div className="gap-2 grid grid-cols-3 lg:grid-cols-4 ml-10">{cardList}</div>
    </>
  );
}
