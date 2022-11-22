import BasicLayout from "../layout/BasicLayout";
import ScrollNoti from "../components/ScrollNoti";
import scrollListener from "../utils/scrollListener";
import {useCallback, useRef, useState} from "react";
import FrontEndPF from "../components/FrontEndPF";
import {Routes, Route} from "react-router-dom";
import BGM from "../assets/audio/eyes_on_fires.mp3";
import Etcs from "../components/Etcs";

const PortfolioMain = () => {
  const scrollY = useRef(0);
  const [showNoti, setShowNoti] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  scrollListener(() => {
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
      audioRef.current.play();
      return;
    }
    if (audioRef.current.paused) audioRef.current.play();
    else audioRef.current.pause();
  }, []);

  return(
    <>
      <BasicLayout audioCallback={toggleBGM}>
        {showNoti && <ScrollNoti />}
        <Routes>
          <Route index element={<FrontEndPF toggleMusic={toggleBGM} />} />
          <Route path={"/front-end"} element={<FrontEndPF toggleMusic={toggleBGM} />} />
          <Route path={"/etcs"} element={<Etcs />} />
        </Routes>
      </BasicLayout>
      <audio muted autoPlay playsInline loop ref={audioRef}>
        <source src={BGM} type={"audio/mp3"} />
      </audio>
    </>
  )
}

export default PortfolioMain;