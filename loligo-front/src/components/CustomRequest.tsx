import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

export default function App() {
  return (
    <Card className="py-4" isPressable onPress={() => console.log("item pressed")} style={{
      margin:"1em 5em"
    }}>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">REQUEST #12345 </p >  {/* ticketId */}
        <small className="text-default-500">https://www.loligo.com</small> {/* websiteLink */}
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
  );
}
