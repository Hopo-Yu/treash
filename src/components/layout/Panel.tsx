import React, { ReactNode, FC } from 'react';
import { Box } from '@chakra-ui/react';
// import './Panel.scss'; // Assuming you have defined styles in Panel.scss

interface PanelProps {
  children: ReactNode;
  active: boolean;
  index: number;
}

const PanelComponent: FC<PanelProps> = ({
  active,
  index,
  children
}) => {
  return (
    <Box 
      role="tabpanel"
      id={`react-tabtab-panel-${index}`}
      aria-labelledby={`react-tabtab-tab-${index}`}
      aria-hidden={!active}
      className={`panel ${active ? 'active' : ''}`}
    >
      {active ? children : null}
    </Box>
  );
};

export { PanelComponent as Panel };
