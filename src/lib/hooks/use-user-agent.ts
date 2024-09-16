import MobileDetect from "mobile-detect";
import { useEffect, useState } from "react";

export default function useUserAgent() {
  const [mobileDetect, setMobileDetect] = useState<MobileDetect | null>(null);

  useEffect(() => {
    if (!window.navigator) return;
    setMobileDetect(new MobileDetect(window.navigator.userAgent));
  }, []);

  return {
    mobileDetect,
    isDesktop:
      mobileDetect?.phone() === null && mobileDetect?.tablet() === null,
    isAndroid: mobileDetect?.is("AndroidOS"),
  };
}
