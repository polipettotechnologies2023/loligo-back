//import { Tabs, Tab } from "@nextui-org/react";
import CustomCard from "../components/CustomCard";
import { useState } from "react";

import DataCards from "./DataCards";
import RequestFilter from "./RequestFilter";

export default function RequestsLists() {
  const [itemCard, setItemCard] = useState(DataCards);

  const filterItem = (curStatus: String) => {
    const newItem = DataCards.filter((newVal) => {
      return newVal.requestStatus === curStatus;
    });
    setItemCard(newItem);
  };

  return (
    <>
      <RequestFilter
        filterItem={filterItem}
        setItemCard={setItemCard}
      ></RequestFilter>
      <br />
      <h1 className="px-6 text-xl">My Requests</h1>
      <br />
      <div className="flex flex-wrap gap-4 items-start px-6">
        <CustomCard itemCard={itemCard}></CustomCard>
      </div>
      <br />
      <h1 className="px-6 text-xl">My Certificates</h1>
      <br />
    </>
  );
}
