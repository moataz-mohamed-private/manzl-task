import { useRef } from "react";

export const useDebounceAction = (func: Function) => {
  const timeoutRef = useRef<number>();

  const debouncedFunc = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(func, 200);
  };

  return debouncedFunc;
};
