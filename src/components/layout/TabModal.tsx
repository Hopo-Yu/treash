import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton } from '@chakra-ui/react';
import { SortableContainer } from 'react-sortable-hoc';
import SortMethod from './SortMethod';

interface TabModalProps {
  closeModal: (event: any) => void;
  handleTabSequence: (event: any) => void;
  handleTabChange: (event: any) => void;
  activeIndex: number;
  children: React.ReactNode;
}

const DragTabContainer = SortableContainer(({ children }: { children: React.ReactNode }) => {
  return <div style={{ marginTop: '50px' }}>{children}</div>;
});

class ModalTabListWrapper extends SortMethod {
  render() {
    return (
      <DragTabContainer
        onSortEnd={this.onSortEnd}
        axis="y"
        lockAxis="y"
        pressDelay={100}
      >
        {this.props.children}
      </DragTabContainer>
    );
  }
}

const TabModal: React.FC<TabModalProps> = ({
  closeModal,
  handleTabSequence,
  handleTabChange,
  activeIndex,
  children
}) => {
  return (
    <Modal isOpen={true} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tab Management</ModalHeader>
        <ModalCloseButton />
        <ModalTabListWrapper
          handleTabSequence={handleTabSequence}
          handleTabChange={handleTabChange}
          activeIndex={activeIndex}
        >
          {children}
        </ModalTabListWrapper>
      </ModalContent>
    </Modal>
  );
};

export default TabModal;
