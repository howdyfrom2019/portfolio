const MouseAnimation = () => {
  return (
    <div
      className={
        'lg:rounded-full relative h-32 w-16 border-1 border-black transition-all md:rounded-2xl'
      }
    >
      <span
        className={
          'absolute left-1/2 top-6 h-0.5 w-0.5 -translate-x-1/2 animate-scroll rounded-full bg-black'
        }
      />
    </div>
  );
};

const ScrollNoti = () => {
  return (
    <figure
      className={
        'absolute left-1/2 top-0 z-10 flex h-screen -translate-x-1/2 flex-col items-center gap-9'
      }
    >
      <span className={'w-px flex-1 bg-black'} />
      <MouseAnimation />
      <span className={'w-px flex-1 bg-black'} />
    </figure>
  );
};

export default ScrollNoti;
