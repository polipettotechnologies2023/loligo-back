import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default function ConfermationModal() {
    const { width, height } = useWindowSize()
    const {onOpenChange} = useDisclosure();

  return (
    <>
    <Confetti
          width={width}
          height={height}
        />
      <Modal className="text-center" isOpen={true} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="bg-gradient-to-tr from-purple-950 via-purple-800 to-fuchsia-500 text-white">Request successfully created!</ModalHeader>
              <ModalBody>
                <img src="polipetto_stars_2.svg"></img>
                <h1 className="text-6xl	bg-gradient-to-tr from-purple-950 via-purple-800 to-fuchsia-500 text-transparent text-wrap bg-clip-text font-bold text-center">THANKS!</h1>
                <h2>Your request is now on the way to our experts.</h2>
              </ModalBody>
              <ModalFooter>
                <Button className="bg-gradient-to-tr from-purple-950 via-purple-800 to-fuchsia-500 text-white" onPress={() => {onClose; location.reload()}}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
