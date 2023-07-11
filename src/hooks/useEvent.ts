import { useCallback, useLayoutEffect, useRef } from 'react';

const useEvent = <T extends () => unknown>(cb: T): T => {
  const cbRef = useRef(cb);

  useLayoutEffect(() => {
    cbRef.current = cb;
  });

  const eventCb = useCallback(
    (...args: Parameters<T>) => {
      return cbRef.current.apply(null, args);
    },
    [cbRef]
  );

  return eventCb as T;
};

export default useEvent;
