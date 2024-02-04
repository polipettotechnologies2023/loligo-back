import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

type TipModalProps = {
  tip: string;
  isOpenState: boolean;
  onOpenChangeFunc: () => void;
};

export default function TipModal({
  tip,
  isOpenState,
  onOpenChangeFunc,
}: TipModalProps) {
  return (
    <Modal
      isOpen={isOpenState}
      onOpenChange={onOpenChangeFunc}
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Do you know?
            </ModalHeader>
            <ModalBody>
              <p>{tip}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                radius="full"
                variant="ghost"
                onPress={onClose}
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
