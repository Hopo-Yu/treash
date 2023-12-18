import { createContext, useContext, useState } from 'react';

const TabStateContext = createContext();

export function TabStateProvider({ children }) {
  const [tabState, setTabState] = useState(/* initial state */);

  // Functions to manage tab state

  return (
    <TabStateContext.Provider value={{ tabState, setTabState }}>
      {children}
    </TabStateContext.Provider>
  );
}

export function useTabState() {
  return useContext(TabStateContext);
}
