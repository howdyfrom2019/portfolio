import {useEffect} from "react";

const ScrollEvent = (callback: (e: Event) => void) => {
  useEffect(() => {
    window.addEventListener("scroll", callback, false);

    return () => {
      window.removeEventListener("scroll", callback);
    }
  }, [callback]);
}

export default ScrollEvent;