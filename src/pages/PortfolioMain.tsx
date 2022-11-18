import BasicLayout from "../layout/BasicLayout";
import ScrollNoti from "../components/ScrollNoti";
import scrollListener from "../utils/scrollListener";
import {useEffect, useRef, useState} from "react";
import FrontEndPF from "../components/FrontEndPF";
import {Routes, Route} from "react-router-dom";
import BGM from "../assets/audio/eyes_on_fires.mp3";

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

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = false;
    audioRef.current.play();
  }, []);

  return(
    <>
      <BasicLayout audioCallback={() => {
        console.log(audioRef.current);
        if (audioRef.current?.paused) audioRef.current?.play();
        else audioRef.current?.pause();
      }}>
        {showNoti && <ScrollNoti />}
        <Routes>
          <Route index element={<FrontEndPF />} />
          <Route path={"/front-end"} element={<FrontEndPF />} />
        </Routes>
      </BasicLayout>
      <audio muted autoPlay playsInline loop ref={audioRef}>
        <source src={BGM} type={"audio/mp3"} />
      </audio>
    </>
  )
}

export default PortfolioMain;