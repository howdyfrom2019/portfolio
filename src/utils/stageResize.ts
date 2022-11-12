import {useEffect} from "react";

const StageResize = (callback: (e: UIEvent) => void) => {
  useEffect(() => {
    window.addEventListener("resize", callback, false);
    return () => {
      window.removeEventListener("resize", callback);
    }
  }, [callback]);
}

export default StageResize;