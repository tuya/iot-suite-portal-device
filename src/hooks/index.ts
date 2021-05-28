import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import throttle from 'lodash.throttle';

export const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

export const useWindowResize = (cb) => {
  useEffect(() => {
    window.addEventListener('resize', cb);
    return () => {
      window.removeEventListener('resize', cb);
    };
  }, [cb]);
};

export const useInnerHeight = () => {
  const [height, setHeight] = useState<number | null>();
  const [width, setWidth] = useState<number | null>();

  const func = throttle(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }, 300);

  useWindowResize(func);

  return [height, width];
};
