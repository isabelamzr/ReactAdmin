import { createContext, useContext } from 'react';
const GridContext = createContext();

export const GridProvider = ({ children, columns, mainColumn }) => {
  return (
    <GridContext.Provider value={{ columns, mainColumn }}>
      {children}
    </GridContext.Provider>
  );
};

export const useGridContext = () => {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error('useGridContext must be used within a GridProvider');
  }
  return context;
};