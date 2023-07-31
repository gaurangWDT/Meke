import React, {createContext, useContext, useState} from 'react';

const AppContext = createContext();

export const AppProvider = ({children}) => {
  const [shortlistedItems, setShortlistedItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        shortlistedItems,
        setShortlistedItems,
        isDrawerOpen,
        setIsDrawerOpen,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
