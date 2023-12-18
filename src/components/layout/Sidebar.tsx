import React from 'react';
import { Box, VStack, IconButton } from '@chakra-ui/react';
import { FaHome, FaChartBar, FaCog, FaQuestion, FaColumns } from 'react-icons/fa';
import '../../styles/Sidebar.scss';

interface SidebarProps {
  toggleSplitView: () => void;
}

function Sidebar({ toggleSplitView }: SidebarProps) {
  return (
    <Box className="sidebar" w="50px" bg="gray.200">
      <VStack spacing={4} align="stretch">
        <IconButton
          aria-label="Node Library"
          icon={<FaHome />}
        />
        <IconButton
          aria-label="Visualization"
          icon={<FaChartBar />}
        />
        <IconButton
          aria-label="Settings"
          icon={<FaCog />}
        />
        <IconButton
          aria-label="Help"
          icon={<FaQuestion />}
        />
        <IconButton
          aria-label="Toggle Split View"
          icon={<FaColumns />}
          onClick={toggleSplitView}
        />
      </VStack>
    </Box>
  );
}

export default Sidebar;
