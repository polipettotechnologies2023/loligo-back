import NewRequestButton from "../components/NewRequestButton";
import CustomFilter from "../components/CustomFilter";
import CustomCard from "./CustomCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { RootState } from "../vite-env";

export default function CustomRequest() {
const [cardList, setCardList] = useState("")
const { user } = useAuth0();
const token = useSelector((state: RootState) => state.token.value);

  useEffect(()=>{
    (async ()=>{
    if(user?.sub)
    {
    let user_id = await extractUserId(user?.sub)
    let res = await axios.post(`${import.meta.env.VITE_PYTHON_SERVER}/dashboard`,{
      user_id
      },{
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    )
    
      let issues = JSON.parse(res.data)
      let cardMap = issues.issues.map((issue:any)=> {
        return <CustomCard key={issue?.fields?.customfield_10062} ticketId={issue?.fields?.customfield_10062} status={issue?.fields?.status?.name}></CustomCard>
      });
      setCardList(cardMap)
    }
    })()
  },[])

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
        }}
      >
        <div
          className="column"
          style={{
            margin: "1em 1em 0 0",
            flex: "1",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "4rem",
              fontWeight: "bolder",
              lineHeight: "1em",
              WebkitTextFillColor: "transparent",
              backgroundImage: "linear-gradient(45deg, #020024, #a516b3)",
              backgroundClip: "text",
              margin: ".5em",
            }}
          >
            My requests
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
        >
          <CustomFilter></CustomFilter>
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
        >
          <NewRequestButton></NewRequestButton>

        </div>
      </div>
        <div className="gap-2 grid grid-cols-2 md:grid-cols-4">
          {cardList}
          </div>
    </>
  );
}
