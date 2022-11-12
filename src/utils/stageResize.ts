import {useEffect} from "react";

export const StageResize = (callback: (e: UIEvent) => void) => {
  useEffect(() => {
    window.addEventListener("resize", callback, false);
    return () => {
      window.removeEventListener("resize", callback);
    }
  }, [callback]);
}