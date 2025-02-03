import { useRef } from "react";

export const arrayCompare = (a = [], b = []) => {
    if (a === b) return true;
    if (a.length !== b.length) return false;
    
    return a.every((item, index) => {
      const bItem = b[index];
      if (typeof item === 'object' && item !== null) {
        return JSON.stringify(item) === JSON.stringify(bItem);
      }
      return item === bItem;
    });
  };

export const useDeepCompare = (value) => {
  const ref = useRef();
  
  if (!arrayCompare(ref.current, value)) {
    ref.current = value;
  }
  
  return ref.current;
};
