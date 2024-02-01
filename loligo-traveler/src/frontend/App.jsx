import React, { useEffect } from "react";
import { Image, Button } from "@forge/react";
import { router } from "@forge/bridge";

export const App = () => {
  useEffect(() => {
    (async () => {
      await router.navigate("https://loligo.vercel.app/");
    })();
  }, []);
  return (
    <>
        {/* TODO: add margin to each element and text-align to the container  */}
      <Image src="https://media1.tenor.com/m/VdZJbPtJrfYAAAAC/light-speed.gif"></Image>
      <Button onClick={() => router.navigate("/jira/software/projects/LOL/boards/1")}> ⬅️ Go Back to the Board</Button>
      <Button onClick={() => router.navigate("https://loligo.vercel.app/")}> Go to Loligo ➡️</Button>

    </>
  );
};
