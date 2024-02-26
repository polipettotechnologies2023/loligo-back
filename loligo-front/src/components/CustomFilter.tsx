import { Tabs, Tab } from "@nextui-org/react";

type customFilterProps = {
  filterCards: (val: string) => void;
};

export default function customFilter({ filterCards }: customFilterProps) {
  return (
    <div
      id="custom-filter"
      className="flex flex-wrap gap-4"
      style={{
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Tabs
        key="customFilter"
        color="secondary"
        aria-label="Tabs colors"
        radius="full"
        defaultSelectedKey="all"
        onSelectionChange={(key: any) => {
          filterCards(key);
        }}
      >
        <Tab key="sent" title="Sent" />
        <Tab key="in-review" title="In Review" />
        <Tab key="done" title="Done" />
        <Tab key="all" title="All" />
      </Tabs>
    </div>
  );
}
