import {useEffect, useRef, useState} from 'react';

export default function useThrottleFn(fn, ms = 200, args) {
  const [state, setState] = useState(null); //callback
  const timeout = useRef(); //timeoutFn
  const nextArgs = useRef(); //storedArgs

  useEffect(() => {
    if (!timeout.current) {
      console.log('fn', fn);
      console.log('args', args);
      setState(fn(...args));
      const timeoutCallback = () => {
        if (nextArgs.current) {
          setState(fn(...nextArgs.current));
          nextArgs.current = undefined;
          timeout.current = setTimeout(timeoutCallback, ms);
        } else {
          timeout.current = undefined;
        }
      };
      timeout.current = setTimeout(timeoutCallback, ms);
    } else {
      nextArgs.current = args;
    }
    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, args);

  return state;
}

/*
function checkStoredArgs() {
      if (storedArgs === null) {
        wait = false;
      } else {
        callback(...storedArgs);
        storedArgs = null;
        setTimeout(checkStoredArgs, delay);
      }

      return (...args) => {
        if (wait) {
          storedArgs = args;
          return;
        }
        callback(...args);
        wait = true;
        setTimeout(checkStoredArgs, delay);
      };
  }
 */
