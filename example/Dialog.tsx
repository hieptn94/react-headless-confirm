import * as React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

export default function Dialog({
  isOpen,
  title,
  content,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{content}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onConfirm}>
            {confirmText}
          </Button>
          <Button onClick={onCancel} variant="ghost">
            {cancelText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
