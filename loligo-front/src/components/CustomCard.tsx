import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function CustomCard(prop: any) {
  //TODO: ts interface
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log("isOpen : ", isOpen);

  let outcome = prop.status + "_" + prop.outcome;
  let certifiedBackground = "";
  let outcomeColor = "";
  console.log(outcome);

  if (outcome == "10002_10081") {
    outcomeColor =
      "bg-gradient-to-tr from-sky-400 via-sky-500 to-blue-500 text-white";
    certifiedBackground = "bg-loligo_certified bg-no-repeat";
  } else {
    outcomeColor =
      "bg-gradient-to-tr from-purple-950 via-purple-800 to-fuchsia-500 text-white";
  }

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
          <small className="text-default-500">{prop.website_link}</small>
          {/* websiteLink */}
          <h4 className="font-bold text-large">{prop.websiteName}</h4>{" "}
          {/* websiteName */}
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

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        backdrop="opaque"
        size="3xl"
        className={certifiedBackground}
        style={{
          backgroundRepeat: "no-repeat",
          backgroundColor: "white",
          backgroundPositionX: "right",
          backgroundSize: "",
        }}
      >
        {/* PASS isOpen STATE FROM  useDisclosure HOOK*/}
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className={outcomeColor}>
                {prop.ticketId.toUpperCase()}
              </ModalHeader>
              <ModalBody>
                <h1 className="text-lg font-bold">Website's name</h1>
                <p className="text-lg">{prop.websiteName}</p>
                <h1 className="text-lg font-bold">Base URL</h1>
                <p className="text-lg">{prop.website_link}</p>
                <h1 className="text-lg font-bold">Request made on</h1>
                <p className="text-lg">{prop.entry_time}</p>
                {(() => {
                  switch (outcome) {
                    case "10002_10081":
                      return (
                        <>
                          <h1 className="text-lg font-bold">
                            Request's Outcome
                          </h1>
                          <p className="text-lg text-wrap">
                            Congratulations! Your website meets the requirements
                            and is now officially certified.
                          </p>
                          <ModalFooter>
                            <Button className={outcomeColor} onPress={onClose}>
                              {/* PASS  onClose FUNCTION TO onPress EVENT LISTENER*/}
                              Close
                            </Button>
                            <Button className={outcomeColor}>
                              {/* PASS  onClose FUNCTION TO onPress EVENT LISTENER*/}
                              Download
                            </Button>
                          </ModalFooter>
                        </>
                      );
                    case "10002_10082":
                      return (
                        <>
                          <h1 className="text-lg font-bold">
                            Request's Outcome
                          </h1>
                          <p className="text-lg text-wrap">
                            Unfortunately, your website does not meet the
                            necessary requirements to be certified.
                            <br></br>
                            What does that mean? After our careful analysis, our
                            experts have found Dark Patterns present in your
                            website.{" "}
                          </p>
                          <h1 className="text-lg font-bold">
                            Here is what we found:
                          </h1>
                          <p>{prop.automaticDetectionResults}</p>
                          <ModalFooter>
                            <Button className={outcomeColor} onPress={onClose}>
                              {/* PASS  onClose FUNCTION TO onPress EVENT LISTENER*/}
                              Close
                            </Button>
                          </ModalFooter>
                        </>
                      );
                    default:
                      return (
                        <ModalFooter>
                          <Button className={outcomeColor} onPress={onClose}>
                            {/* PASS  onClose FUNCTION TO onPress EVENT LISTENER*/}
                            Close
                          </Button>
                        </ModalFooter>
                      );
                  }
                })()}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
