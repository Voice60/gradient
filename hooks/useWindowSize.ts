import { useEffect, useState } from "react";

export function useWindowSize() {
  interface IWindowSize {
    width: undefined | number
    height: undefined | number
  }

  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = (): void => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    
      window.addEventListener("resize", handleResize);
      handleResize();
      return (): void => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
}