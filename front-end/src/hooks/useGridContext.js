import { useContext } from 'react';
import { GridContext } from '../context/GridContext'; 

export const useGridContext = () => {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error('O componente que chamou useGridContext não está dentro de um GridProvider');
  }
  return context;
};
