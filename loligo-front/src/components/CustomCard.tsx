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
import CertificateButton from "./CertificateButton";
import DownloadSVG from "./DownloadSVG";
import CustomTableAutomated from "./CustomTableAutomated";
import CustomTableManual from "./CustomTableManual";


export default function CustomCard(prop: any) {
  //TODO: ts interface
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log("isOpen : ", isOpen);

  let outcome = prop.status + "_" + prop.outcome;
  let outcomeColor = "";
  console.log(outcome);

  if (outcome == "10002_10081") {
    outcomeColor =
      "bg-gradient-to-tr from-sky-400 via-sky-500 to-blue-500 text-white";
  } else {
    outcomeColor =
      "bg-gradient-to-tr from-purple-950 via-purple-800 to-fuchsia-500 text-white";
  }

  var key;
  let automatedDarkPatterns = [""];
  for (key in prop.automatedDarkPatterns){
    automatedDarkPatterns.push(prop.automatedDarkPatterns[key].value);
  }
  automatedDarkPatterns.shift();
  console.log(automatedDarkPatterns);

  var key;
  let manualDarkPatterns = [""];
  for (key in prop.manualDarkPatterns){
    manualDarkPatterns.push(prop.manualDarkPatterns[key].value);
  }
  manualDarkPatterns.shift();
  console.log(manualDarkPatterns);

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
          <h4 className="font-bold text-large">{prop.websiteName}</h4>
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
        className="mt-80"
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={true}
        backdrop="opaque"
        placement="center"
        size="5xl"
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
                            <CertificateButton
                              company_name={prop.websiteName}
                              website_url={prop.website_link}
                              certify_date={prop.finish_time
                                .substring(0, 10)
                                .replace(/-/g, ".")}
                              cid={prop.ticketId}
                            ></CertificateButton>
                            <DownloadSVG cid={prop.ticketId}></DownloadSVG>
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
                          <p>Automatically Detected Datterns</p>
                          <CustomTableAutomated automatedPat={automatedDarkPatterns}></CustomTableAutomated>
                          <p>Manually detected patterns</p>
                          <CustomTableManual manualPat={manualDarkPatterns}></CustomTableManual>
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
