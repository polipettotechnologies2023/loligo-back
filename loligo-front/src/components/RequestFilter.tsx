import { Button, ButtonGroup } from "@nextui-org/react";

import DataCards from "./DataCards";

interface RequestFilterProps {
  filterItem: (value: string) => void;
  setItemCard: (data: typeof DataCards) => void;
}

export default function RequestFilter({
  filterItem,
  setItemCard,
}: RequestFilterProps) {
  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center">
        <ButtonGroup size="md" radius="full" variant="shadow">
          <Button
            key="all"
            title="All"
            color="warning"
            onClick={() => setItemCard(DataCards)}
          >
            All
          </Button>
          <Button
            key="sent"
            title="Sent"
            color="primary"
            onClick={() => filterItem("sent")}
          >
            Sent
          </Button>
          <Button
            key="review"
            title="In Review"
            color="secondary"
            onClick={() => filterItem("review")}
          >
            In Review
          </Button>
          <Button
            key="done"
            title="Done"
            color="success"
            onClick={() => filterItem("done")}
          >
            Done
          </Button>
        </ButtonGroup>
        {/* create a grid of cards requests here */}
      </div>
    </>
  );
}
