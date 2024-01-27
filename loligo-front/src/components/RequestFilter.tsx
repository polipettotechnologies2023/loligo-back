import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Link,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";

import DataCards from "./DataCards";

export default function RequestFilter() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  return (
    <div className="flex w-full flex-col">
      <Tabs
        color="secondary"
        radius="full"
        aria-label="Dynamic tabs"
        items={DataCards}
      >
        {(item) => (
          <Tab key={item.requestId} title={item.requestStatus}>
            <div className="flex flex-wrap gap-4 items-start px-6">
              <Card className="py-4 w-270" isPressable onPress={onOpen}>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <p className="text-large uppercase font-bold">
                    {item.requestId}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Chip
                      color={handlerColor(item.requestStatus)}
                      size="md"
                      variant="flat"
                    >
                      {item.requestStatus}
                    </Chip>
                  </p>
                  <Link
                    isExternal
                    showAnchorIcon
                    href={item.requestWeb}
                    color="secondary"
                  >
                    {item.requestWeb}
                  </Link>
                  <h4 className="font-bold text-large">{item.requestName}</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <Image
                    isZoomed
                    shadow="sm"
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={item.requestPicture}
                    width={100}
                  />
                </CardBody>
              </Card>
            </div>
          </Tab>
        )}
      </Tabs>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
