import { Tabs, Tab } from "@nextui-org/react";
import CustomCard from "../components/CustomCard";
import { useState } from "react";

export default function RequestsLists() {
  //const [requestState, setRequestState] = useState(-1);

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center">
        <Tabs color="secondary" aria-label="Tabs colors" radius="full">
          <Tab key="all" title="All" />
          <Tab key="sent" title="Sent" />
          <Tab key="review" title="In Review" />
          <Tab key="done" title="Done" />
        </Tabs>
        {/* create a grid of cards requests here */}
      </div>
      <br />
      <h1 className="px-6 text-xl">My Requests</h1>
      <br />
      <div className="flex flex-wrap gap-4 items-start px-6">
        <CustomCard
          requestId="REQUEST #000001"
          requestWeb="https://polipetto.pp.ua/"
          requestName="Polipetto Technologies"
          requestPicture="/PolipettoLogo.png"
          requestStatus="Sent"
        ></CustomCard>
        <CustomCard
          requestId="REQUEST #000002"
          requestWeb="https://polipetto.pp.ua/"
          requestName="Polipetto Technologies"
          requestPicture="/PolipettoLogo.png"
          requestStatus="Sent"
        ></CustomCard>
        <CustomCard
          requestId="REQUEST #000003"
          requestWeb="https://polipetto.pp.ua/"
          requestName="Polipetto Technologies"
          requestPicture="/PolipettoLogo.png"
          requestStatus="Sent"
        ></CustomCard>
        <CustomCard
          requestId="REQUEST #000004"
          requestWeb="https://polipetto.pp.ua/"
          requestName="Polipetto Technologies"
          requestPicture="/PolipettoLogo.png"
          requestStatus="Sent"
        ></CustomCard>
      </div>
      <br />
      <h1 className="px-6 text-xl">My Certificates</h1>
    </>
  );
}
