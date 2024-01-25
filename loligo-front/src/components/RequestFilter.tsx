import { Tabs, Tab } from "@nextui-org/react";
import { Key, useState } from "react";

import DataCards from "./DataCards";

export default function RequestFilter() {
  const [itemCard, setItemCard] = useState(DataCards);
  const tabItems = [...new Set(DataCards.map((Val) => Val.requestStatus))];

  const filterItem = (curStatus: Key) => {
    const newItem = DataCards.filter((newVal) => {
      return newVal.requestStatus == curStatus;
    });
    setItemCard(newItem);
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center">
        <Tabs
          color="secondary"
          size="md"
          aria-label="Tabs colors"
          radius="full"
          onSelectionChange={filterItem}
        >
          <Tab key="all" title="All" onClick={() => setItemCard(DataCards)} />
          <Tab key="sent" title="Sent" />
          <Tab key="review" title="In Review" />
          <Tab key="done" title="Done" />
        </Tabs>
        {/* create a grid of cards requests here */}
      </div>
    </>
  );
}
