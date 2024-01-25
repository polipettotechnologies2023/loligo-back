import {
  Card,
  CardHeader,
  CardBody,
  Link,
  Image,
  Chip,
} from "@nextui-org/react";
import DataCards from "./DataCards";

interface IChip {
  itemCard: typeof DataCards;
}

export default function CustomCard({ itemCard }: IChip) {
  const handlerColor = (status: string) => {
    if (status === "sent") {
      return "primary";
    } else if (status === "review") {
      return "secondary";
    } else if (status === "done") {
      return "success";
    } else {
      return "default";
    }
  };

  return itemCard.map((Val) => {
    return (
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-large uppercase font-bold">
            {Val.requestId}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Chip
              color={handlerColor(Val.requestStatus)}
              size="md"
              variant="flat"
            >
              {Val.requestStatus}
            </Chip>
          </p>
          <Link
            isExternal
            showAnchorIcon
            href={Val.requestWeb}
            color="secondary"
          >
            {Val.requestWeb}
          </Link>
          <h4 className="font-bold text-large">{Val.requestName}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            isZoomed
            shadow="sm"
            alt="Card background"
            className="object-cover rounded-xl"
            src={Val.requestPicture}
            width={100}
          />
        </CardBody>
      </Card>
    );
  });
}
