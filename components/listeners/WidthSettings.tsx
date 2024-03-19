import React, { useEffect, useState, useCallback } from 'react';

const useMediaQuery = (width: number) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e: { matches: any; }) => {
        if (e.matches) {
          setTargetReached(true);
        } else {
          setTargetReached(false);
        }
      }, []);

    useEffect(() => {
        const media = window.matchMedia(`(max-width: ${width}px)`);
        if (media.addEventListener) {
            media.addEventListener("change", updateTarget);
          } else {
            media.addEventListener("change", updateTarget);
          }
          if (media.matches) {
            setTargetReached(true);
          }
          if (media.removeEventListener) {
            return () => media.removeEventListener('change', updateTarget);
          } else {
            return () => media.removeEventListener("change", updateTarget);
          }
        }, [updateTarget, width]);

    return targetReached;

}

export default useMediaQuery;