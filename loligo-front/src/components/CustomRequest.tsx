import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import NewRequestButton from "../components/NewRequestButton";
import CustomFilter from "../components/CustomFilter";

export default function CustomRequest() {
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
      <Card
        className="py-4"
        isPressable
        onPress={() => console.log("item pressed")}
        style={{
          margin: "1em 5em",
        }}
      >
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">REQUEST #12345 </p>{" "}
          {/* ticketId */}
          <small className="text-default-500">
            https://www.loligo.com
          </small>{" "}
          {/* websiteLink */}
          <h4 className="font-bold text-large">Loligo</h4> {/* websiteName */}
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-3xl"
            src="sent_backdrop.svg" //This should be variable, based on status
            width={370}
          />
        </CardBody>
      </Card>
    </>
  );
}
