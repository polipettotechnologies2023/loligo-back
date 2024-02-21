import {
  Card,
  CardBody,
} from "@nextui-org/react";

export default function CustomCard(prop: any) {
  //TODO: ts interface

  console.log("Obtained from prop: "+prop.displayValue);
  return (
    <>
      <Card
        className={prop.displayValue}
        isPressable={true}
        style={{
          margin: "1em auto",
          alignContent: "center",
        }}
      >
        <CardBody className="relative col-span-6 md:col-span-4">
          <h1 className="animate-pulse py-32 text-6xl	bg-gradient-to-tr from-purple-950 via-purple-800 to-fuchsia-500 text-transparent text-wrap bg-clip-text font-bold text-center">It's looking a bit dry in here...</h1>
        </CardBody>
      </Card>
    </>
  );
}
