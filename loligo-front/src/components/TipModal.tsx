import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

type TipModalProps = {
  tip_title: string;
  tip_content: string;
  isOpenState: boolean;
  onOpenChangeFunc: () => void;
};

export default function TipModal({
  tip_title,
  tip_content,
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
              <p>{tip_title}</p>
            </ModalHeader>
            <ModalBody>
              <p>{tip_content}</p>
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
