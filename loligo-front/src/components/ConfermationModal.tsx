import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default function ConfermationModal() {
    const { width, height } = useWindowSize()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
    <Confetti
          width={width}
          height={height}
        />
      <Modal isOpen={true} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Congratulation!</ModalHeader>
              <ModalBody>
                <p> 
                 Congratulation bla bla bla
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={() => {onClose; location.reload()}}>
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
