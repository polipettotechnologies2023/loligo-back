import {
  Card,
  CardHeader,
  CardBody,
  Link,
  Image,
  Chip,
} from "@nextui-org/react";

interface IChip {
  requestId: string;
  requestWeb: string;
  requestName: string;
  requestPicture: string;
  requestStatus: string;
}

export default function CustomCard({
  requestId,
  requestWeb,
  requestName,
  requestPicture,
  requestStatus,
}: IChip) {
  const handlerColor = (status: string) => {
    if (status === "Sent") {
      return "primary";
    } else if (status === "In Review") {
      return "secondary";
    } else if (status === "Done") {
      return "success";
    } else {
      return "default";
    }
  };

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-large uppercase font-bold">
          {requestId}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Chip color={handlerColor(requestStatus)} size="md" variant="flat">
            {requestStatus}
          </Chip>
        </p>
        <Link isExternal showAnchorIcon href={requestWeb} color="secondary">
          {requestWeb}
        </Link>
        <h4 className="font-bold text-large">{requestName}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          isZoomed
          shadow="sm"
          alt="Card background"
          className="object-cover rounded-xl"
          src={requestPicture}
          width={270}
        />
      </CardBody>
    </Card>
  );
}

/*export default function CustomCard(prop:IChip) {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">NextUI</p>
          <p className="text-small text-default-500">nextui.org</p>
        </div>
        <Chip color={prop.chipcolor} size="sm">{prop.chipvalue}</Chip>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://LinkToTheUserWebsite"
        >
          Visit the this website
        </Link>
      </CardFooter>
    </Card>
  );
}*/
