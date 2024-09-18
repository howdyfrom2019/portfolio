import React, {useCallback, useEffect, useRef} from "react";

const MouseFollower = () => {
  const pointerRef = useRef<HTMLDetailsElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  
  const followAnimation = useCallback(() => {
    if (pointerRef.current) {
      pointerRef.current.style.top = `${mouseY.current}px`;
      pointerRef.current.style.left = `${mouseX.current}px`;
    }
    requestAnimationFrame(followAnimation);
  }, []);
  
  const setMouseAxis = useCallback((e: MouseEvent) => {
    mouseX.current = e.clientX;
    mouseY.current = e.clientY;
  }, []);
  
  useEffect(() => {
    document.addEventListener("mousemove", setMouseAxis, false);
    followAnimation();
    return () => {
      document.addEventListener("mousemove", setMouseAxis);
    }
  }, [followAnimation, setMouseAxis]);
  
  return (
    <figure className={"absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 mix-blend-difference w-2vmax h-2vmax rounded-full bg-white"} ref={pointerRef} />
  )
}

export default MouseFollower;