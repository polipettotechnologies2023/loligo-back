import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

export default function CustomCard(prop: any) { //TODO: ts interface
  return (
    <Card
    className="py-4"
    isPressable
    onPress={() => console.log("item pressed")}
    style={{
      margin: "1em 5em",
    }}
  >
    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
      <p className="text-tiny uppercase font-bold">{prop.ticketId}</p>
      {/* ticketId */}
      <small className="text-default-500">
       {prop.website_link}
      </small>
      {/* websiteLink */}
      <h4 className="font-bold text-large">{prop.websiteName}</h4> {/* websiteName */}
    </CardHeader>
    <CardBody className="overflow-visible py-2">
      <Image
        alt="Card background"
        className="object-cover rounded-3xl"
        src={prop.statusImage} //This should be variable, based on status
        width={370}
      />
      <p>{prop.status}</p>
    </CardBody>
  </Card>
  );
}

