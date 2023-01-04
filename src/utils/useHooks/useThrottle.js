import {useEffect, useRef, useState} from 'react';

const useThrottle = (value, ms = 200) => {
  const [state, setState] = useState();
  const timeout = useRef();
  const nextValue = useRef(null);
  const hasNextValue = useRef(0);

  useEffect(() => {
    if (!timeout.current) {
      setState(value);
      const timeoutCallback = () => {
        if (hasNextValue.current) {
          hasNextValue.current = false;
          setState(nextValue.current);
          timeout.current = setTimeout(timeoutCallback, ms);
        } else {
          timeout.current = undefined;
        }
      };
      timeout.current = setTimeout(timeoutCallback, ms);
    } else {
      nextValue.current = value;
      hasNextValue.current = true;
    }
    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, [value]);

  return state;
};

export default useThrottle;
