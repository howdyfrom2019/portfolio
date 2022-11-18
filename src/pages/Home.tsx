import React, {useCallback, useEffect, useRef} from "react";
import Intro from "../assets/video/intro.mp4";
import Audio from "../components/audio";
import Background from "../assets/png/intro-bg.jpg";
import Button from "../components/Button";

const Home = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const entranceRef = useRef<HTMLDivElement>(null);
  const [mouseX, mouseY] = [useRef(0), useRef(0)];
  const [moveX, moveY] = [useRef(0), useRef(0)];
  const bgRef = useRef<HTMLImageElement>(null);
  const circle = useRef<HTMLSpanElement>(null);
  const enter = useRef<HTMLSpanElement>(null);

  const toggleVideoAudio = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  }, []);
  
  const animate = useCallback(() => {
    requestAnimationFrame(animate);
    
    moveX.current += (mouseX.current - moveX.current) * 0.009;
    moveY.current += (mouseY.current - moveY.current) * 0.009;

    if (bgRef.current && circle.current && enter.current) {
      circle.current.style.transform = `translate(calc(-50% + ${-moveX.current / 16}px), ${-moveY.current / 18}px)`;
      enter.current.style.transform = `translate(calc(-50% + ${-moveX.current / 18}px), ${-moveY.current / 16}px)`;
      bgRef.current.style.transform = `scale(1.1) translate(calc(${moveX.current / 30}px), ${moveY.current / 28}px)`;
    }
  }, [mouseX, mouseY, moveX, moveY]);

  const setMouseMoveAxis = useCallback((e: MouseEvent) => {
    mouseX.current = e.clientX - window.innerWidth / 2;
    mouseY.current = e.clientY - window.innerHeight / 2;
  }, [mouseX, mouseY]);
  
  useEffect(() => {
    animate();
    window.addEventListener("mousemove", setMouseMoveAxis, false);
    
    return () => {
      window.removeEventListener("mousemove", setMouseMoveAxis);
    }
  }, [animate, setMouseMoveAxis]);
  return (
    <div className={"relative w-screen h-screen overflow-hidden"}>
      <div className={"absolute top-1vw right-1vw flex items-center z-10"}>
        <Audio className={"z-10"} isInitialPlaying={false} callback={toggleVideoAudio} />
        <Button className={"z-10 text-white"} onClick={() => videoRef.current && (videoRef.current.currentTime = videoRef.current.duration)}>Skip&nbsp;&nbsp;⟫</Button>
      </div>
      <video
        className={"scale-125"}
        muted
        playsInline
        autoPlay
        width={window.innerWidth}
        height={window.innerHeight}
        ref={videoRef}
        onEnded={() => entranceRef.current && (entranceRef.current.style.display = "block")}>
        <source src={Intro} type={"video/mp4"} />
      </video>
      <div className={"hidden w-screen h-screen absolute top-0 left-0 z-20"} ref={entranceRef}>
        <img src={Background} className={"absolute top-0 left-0 w-full h-full object-center"} alt={"background"} ref={bgRef} />
        <span className={"absolute top-0 left-1/2 -translate-x-1/2 text-240 text-white z-20 mt-1vw"}>2022</span>
        <span className={"absolute top-20vw left-1/2 -translate-x-1/2 text-2xl text-white z-20"}>Web Front-End Developer, Russel.dev</span>
        <span className={"absolute bottom-4vw left-1/2 -translate-x-1/2 w-20vw h-10vw rounded-tl-upperCircle rounded-tr-upperCircle border-b-0 border-white border z-20"} ref={circle} />
        <span className={"absolute bottom-5vw left-1/2 -translate-x-1/2 font-genshin text-4xl text-white z-20 cursor-pointer"} ref={enter}>ENTER</span>
      </div>
    </div>
  )
}

export default Home;