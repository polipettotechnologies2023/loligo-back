import {Tabs, Tab} from "@nextui-org/react";

export default function customFilter() {

  return (
    <div className="flex flex-wrap gap-4" style={{
        alignItems: "center",
        alignContent: "center"
    }}>
        <Tabs key="customFilter" color="secondary" aria-label="Tabs colors" radius="full">
          <Tab key="sent" title="Sent"/>
          <Tab key="in-review" title="In Review"/>
          <Tab key="done" title="Done"/>
          <Tab key="all" title="All"/>
        </Tabs>
    </div>
  );
}
