import { useEffect } from "react";

export default function useScrollEvent(callback: (e: Event) => void) {
  useEffect(() => {
    window.addEventListener("scroll", callback, false);

    return () => {
      window.removeEventListener("scroll", callback);
    };
  }, [callback]);
}
