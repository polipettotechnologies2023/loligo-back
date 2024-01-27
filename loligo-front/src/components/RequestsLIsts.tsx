//import { Tabs, Tab } from "@nextui-org/react";

import RequestFilter from "./RequestFilter";

export default function RequestsLists() {
  return (
    <>
      <div className="flex flex-wrap gap-4 items-start px-6">
        <RequestFilter></RequestFilter>
      </div>
      <br />
      <h1 className="px-6 text-xl">My Certificates</h1>
      <br />
    </>
  );
}
