import NewRequestButton from "../components/NewRequestButton";
import CustomFilter from "../components/CustomFilter";
import CustomCard from "./CustomCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export default function CustomRequest() {
const [cardList, setCardList] = useState(()=> HTMLAllCollection)
const { user } = useAuth0();
  useEffect(()=>{
    (async ()=>{
      
    let res = await axios.post(import.meta.env.VITE_JIRA_SEARCH,{
      // "jql": `project= LOL AND UserID ~ ${user?.sub}`,
      // "maxResults": 50
      },{
      auth: {
        'username': 'polipettotechnologies@gmail.com',
        'password': 'ATATT3xFfGF07QBgdCmx_WTsetPDSLpGtoEiCq6cExdz-QWEyo2DDvQouBwAec_PgbuWrAndyNv3qhYy-Ze4eTHwHAEsDAKYnOlNA5NjLwtm5jpjLS4s1LIw4Yhnxrvw65i6o5y-gYjmdeU2AJoG--58C2zF4E2YcE3yp2IFksklyK5cvsATfiA=FC9B23B0',
      }
    }
    )
      console.log(res)

    })()
  },[])

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
          <CustomCard></CustomCard>
    </>
  );
}
