import {Card, CardHeader, CardBody, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function CustomCard(prop: any) { //TODO: ts interface
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log("isOpen : ", isOpen);

  return (
  <>
    <Card
    className="py-4"
    isPressable={true}
    onPress={onOpen}
    style={{
      margin: "1em",
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
        src={`backdrop_${prop.status}_${prop.outcome}.svg`} //This should be variable, based on status
        width={370}
      />
    </CardBody>
  </Card>

  <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                {/* PASS isOpen STATE FROM  useDisclosure HOOK*/}
                <ModalContent>

                    {(onClose) => (
                        <>
                            <ModalHeader className="bg-gradient-to-tr from-purple-950 via-purple-800 to-fuchsia-500 text-white">{prop.ticketId.toUpperCase()}</ModalHeader>
                            <ModalBody>
                                <h1 className="text-lg font-bold">Website's name</h1>
                                <p className="text-lg">{prop.websiteName}</p>
                                <h1 className="text-lg font-bold">Base URL</h1>
                                <p className="text-lg">{prop.website_link}</p>
                                <h1 className="text-lg font-bold">Request made on</h1>
                                <p className="text-lg">{prop.entry_time}</p>

                            </ModalBody>
                            <ModalFooter>
                                <Button className="bg-gradient-to-tr from-purple-950 via-purple-800 to-fuchsia-500 text-white"
                                    onPress={onClose}>
                                    {/* PASS  onClose FUNCTION TO onPress EVENT LISTENER*/}
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
  </>

  )

 
}

