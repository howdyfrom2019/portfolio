import Background from '@/assets/png/intro-bg.jpg';
import Intro from '@/assets/video/intro.mp4';
import Audio from '@/components/audio';
import Button from '@/components/Button';
import useStageResize from '@/lib/hooks/use-stage-resize';
import useUserAgent from '@/lib/hooks/use-user-agent';
import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigator = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const entranceRef = useRef<HTMLDivElement>(null);
  const [mouseX, mouseY] = [useRef(0), useRef(0)];
  const [moveX, moveY] = [useRef(0), useRef(0)];
  const bgRef = useRef<HTMLImageElement>(null);
  const circle = useRef<HTMLSpanElement>(null);
  const enter = useRef<HTMLSpanElement>(null);
  useStageResize(() => {
    if (!videoRef.current) return;
    const [WIDTH, HEIGHT] = [window.innerWidth, window.innerHeight];
    videoRef.current.style.width = `${WIDTH}px`;
    videoRef.current.style.height = `${HEIGHT}px`;
  });
  const { isDesktop } = useUserAgent();

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
      circle.current.style.transform = `translate(calc(-50% + ${
        -moveX.current / 16
      }px), ${-moveY.current / 18}px)`;
      enter.current.style.transform = `translate(calc(-50% + ${
        -moveX.current / 18
      }px), ${-moveY.current / 16}px)`;
      bgRef.current.style.transform = `scale(1.1) translate(calc(${
        moveX.current / 30
      }px), ${moveY.current / 28}px)`;
    }
  }, [mouseX, mouseY, moveX, moveY]);

  const setMouseMoveAxis = useCallback(
    (e: MouseEvent) => {
      mouseX.current = e.clientX - window.innerWidth / 2;
      mouseY.current = e.clientY - window.innerHeight / 2;
    },
    [mouseX, mouseY],
  );

  const enterToPortfolio = useCallback(() => {
    navigator('/page/front-end');
  }, [navigator]);

  useEffect(() => {
    animate();
    if (!isDesktop) {
      entranceRef.current && (entranceRef.current.style.display = 'block');
    }
    window.addEventListener('mousemove', setMouseMoveAxis, false);

    return () => {
      window.removeEventListener('mousemove', setMouseMoveAxis);
    };
  }, [animate, setMouseMoveAxis]);
  return (
    <div className={'relative h-screen w-screen overflow-hidden'}>
      {isDesktop && (
        <>
          <div className={'absolute right-1vw top-1vw z-10 flex items-center'}>
            <Audio
              className={'z-10'}
              isInitialPlaying={false}
              callback={toggleVideoAudio}
            />
            <Button
              className={'z-10 text-white'}
              onClick={() =>
                videoRef.current &&
                (videoRef.current.currentTime = videoRef.current.duration)
              }
            >
              Skip&nbsp;&nbsp;⟫
            </Button>
          </div>
          <video
            className={'scale-125'}
            muted
            playsInline
            autoPlay
            width={window.innerWidth}
            height={window.innerHeight}
            ref={videoRef}
            onEnded={() =>
              entranceRef.current &&
              (entranceRef.current.style.display = 'block')
            }
          >
            <source src={Intro} type={'video/mp4'} />
          </video>
        </>
      )}
      <div
        className={'absolute left-0 top-0 z-20 hidden h-screen w-screen'}
        ref={entranceRef}
      >
        <img
          src={Background}
          className={'absolute left-0 top-0 h-full w-full object-cover'}
          alt={'background'}
          ref={bgRef}
        />
        <span
          className={
            'absolute left-1/2 top-0 z-20 mt-1vw -translate-x-1/2 text-240 text-white'
          }
        >
          2022
        </span>
        <span
          className={
            'absolute left-1/2 top-20vw z-20 -translate-x-1/2 text-center text-2xl text-white'
          }
        >
          Web Front-End Developer, Russel.dev
        </span>
        <span
          className={
            'absolute bottom-4vw left-1/2 z-20 h-10vmax w-20vmax -translate-x-1/2 rounded-tl-upperCircle rounded-tr-upperCircle border border-b-0 border-white'
          }
          ref={circle}
        />
        <span
          className={
            'absolute bottom-5vw left-1/2 z-20 -translate-x-1/2 cursor-pointer font-genshin text-4xl text-white'
          }
          ref={enter}
          onClick={enterToPortfolio}
        >
          ENTER
        </span>
      </div>
    </div>
  );
};

export default Home;
