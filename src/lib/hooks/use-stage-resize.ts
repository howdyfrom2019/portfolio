import { useEffect } from "react";

export default function useStageResize(callback: (e: UIEvent) => void) {
  useEffect(() => {
    window.addEventListener("resize", callback, false);
    return () => {
      window.removeEventListener("resize", callback);
    };
  }, [callback]);
}
