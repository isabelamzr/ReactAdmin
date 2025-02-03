import { useRef, useEffect } from 'react';

export const useRenderLogger = (name) => {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current++;

    console.log(`[${name}] Render #${renderCount.current} - ${new Date().toISOString()}`);
  });
};
