import BGM from "@/assets/audio/eyes_on_fires.mp3";
import Etcs from "@/components/Etcs";
import FrontEndPF from "@/components/FrontEndPF";
import MouseFollower from "@/components/MouseFollower";
import ScrollNoti from "@/components/ScrollNoti";
import BasicLayout from "@/layout/BasicLayout";
import useScrollEvent from "@/lib/hooks/use-scroll-event";
import { useCallback, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";

const ThreeCameraPortfolio = () => {
  const scrollY = useRef(0);
  const [showNoti, setShowNoti] = useState(true);
  const [audioToggle, setAudioToggle] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useScrollEvent(() => {
    const currentHeight = window.scrollY;
    if (scrollY.current < currentHeight) {
      setShowNoti(false);
    }
    scrollY.current = currentHeight;
  });

  const toggleBGM = useCallback((playing?: boolean) => {
    if (!audioRef.current) return;
    audioRef.current.muted = false;
    if (playing) {
      if (audioRef.current.paused) audioRef.current.play();
      setAudioToggle(true);
      return;
    } else {
      audioRef.current.pause();
      setAudioToggle(false);
    }
  }, []);

  return (
    <>
      <BasicLayout audioCallback={toggleBGM} audioVal={audioToggle}>
        {showNoti && <ScrollNoti />}
        <Routes>
          <Route index element={<FrontEndPF toggleMusic={toggleBGM} />} />
          <Route
            path={"/front-end"}
            element={<FrontEndPF toggleMusic={toggleBGM} />}
          />
          <Route path={"/etcs"} element={<Etcs toggleMusic={toggleBGM} />} />
        </Routes>
        <MouseFollower />
      </BasicLayout>
      <audio muted autoPlay playsInline loop ref={audioRef}>
        <source src={BGM} type={"audio/mp3"} />
      </audio>
    </>
  );
};

export default ThreeCameraPortfolio;
