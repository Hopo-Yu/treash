import React, { useRef } from 'react';
import { Box, CloseButton as ChakraCloseButton } from '@chakra-ui/react';
// import './Tab.scss'; // Assuming you have a SCSS file for styling

type TabProps = {
  handleTabChange: (index: number) => void,
  handleEdit: (index: number, actionType: string) => void,
  index: number,
  active: boolean,
  closable: boolean,
  children: React.ReactNode
};

const Tab: React.FC<TabProps> = ({ handleTabChange, handleEdit, index, active, closable, children }) => {
  const tabRef = useRef<HTMLLIElement>(null);

  const clickTab = () => {
    handleTabChange(index);
  };

  const clickDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // prevent trigger clickTab event
    handleEdit(index, 'delete');
  };

  return (
    <Box as="li"
         ref={tabRef}
         onClick={clickTab}
         className={`tab ${active ? 'active' : ''} ${closable ? 'closable' : ''}`}
         role="tab"
         id={`react-tabtab-tab-${index}`}
         aria-controls={`react-tabtab-panel-${index}`}
         aria-selected={active}>
      <span className="tab-text">{children}</span>
      {closable && <ChakraCloseButton onClick={clickDelete} />}
    </Box>
  );
};

export default Tab;
