import React, { useState, useRef, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
// import { LeftIcon, RightIcon, BulletIcon } from './IconSvg';
import TabModal from './TabModal';
// import './TabList.scss'; // Assuming SCSS is used for styling

interface TabListProps {
  activeIndex: number;
  showArrowButton: 'auto' | boolean;
  showModalButton: number | boolean;
  handleTabChange: (index: number) => void;
  handleTabSequenceChange: (oldIndex: number, newIndex: number) => void;
  handleEdit: (type: 'delete', index: number) => void;
  ExtraButton?: React.ReactNode;
  children: React.ReactNode;
}

const TabList: React.FC<TabListProps> = ({
  activeIndex,
  showArrowButton,
  showModalButton,
  handleTabChange,
  handleTabSequenceChange,
  handleEdit,
  ExtraButton,
  children
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const listScrollRef = useRef<HTMLUListElement>(null);

  // Define the functions here if needed
  const checkShowArrowButton = () => {
    // Implementation for checking if the arrow button should be shown
  };

  const checkShowModalButton = () => {
    // Implementation for checking if the modal button should be shown
  };

  useEffect(() => {
    checkShowArrowButton();
    checkShowModalButton();
    if (activeIndex > 0) {
      scrollToIndex(activeIndex, 'left');
    }
  }, [activeIndex, children]);

  // Define other utility functions and handlers here...

  const renderTabs = (options = {}, isModal = false) => {
    return React.Children.map(children, (child, index) => (
      React.cloneElement(child as React.ReactElement, {
        key: index,
        active: index === activeIndex,
        index,
        handleTabChange,
        handleEdit,
        ...options
      })
    ));
  };

  // Implement scrollToIndex and other related functions

  return (
    <Box className="tablist-container">
      {ExtraButton && <Box className="extra-button">{ExtraButton}</Box>}
      <Box className="tablist" ref={listContainerRef}>
        {/* Render Arrow Buttons and Tabs here */}
        <Box className="tablist-inner" ref={listScrollRef}>
          {renderTabs()}
        </Box>
      </Box>
      {/* Conditional rendering for TabModal */}
      {modalIsOpen && (
        <TabModal
          closeModal={() => setModalIsOpen(false)}
          handleTabSequenceChange={handleTabSequenceChange}
          handleTabChange={handleTabChange}
          activeIndex={activeIndex}
        >
          {renderTabs({ vertical: true }, true)}
        </TabModal>
      )}
    </Box>
  );
};

export default TabList;
