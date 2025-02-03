import { createContext, memo, useMemo } from 'react';
import { arrayCompare } from '../hooks/useDeepCompare';

export const GridContext = createContext();

const areColumnsEqual = (prevColumns, nextColumns) => {
  if (prevColumns === nextColumns) return true;
  if (prevColumns.length !== nextColumns.length) return false;

  return prevColumns.every((col, index) => 
    col.field === nextColumns[index].field &&
    col.type === nextColumns[index].type &&
    arrayCompare(col.getOptions?.(), nextColumns[index].getOptions?.())
  );
};

export const GridProvider = memo(({ children, columns, mainColumn }) => {
  const contextValue = useMemo(() => ({
    columns,
    mainColumn
  }), [columns, mainColumn]);

  return (
    <GridContext.Provider value={contextValue}>
      {children}
    </GridContext.Provider>
  );
}, (prevProps, nextProps) =>
  prevProps.mainColumn === nextProps.mainColumn &&
  areColumnsEqual(prevProps.columns, nextProps.columns)
);
