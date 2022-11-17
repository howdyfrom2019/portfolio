import React, {useCallback, useEffect, useRef, useState} from "react";
import * as THREE from "three";
import { ImageLoader } from "../utils/imageloader";
import { StageResize } from "../utils/stageResize";
import ScrollEvent from "../utils/scrollListener";
import MinttyVid from "../assets/video/mintty.mp4";

type positionProps = {
  x: number;
  y: number;
  z: number;
}

interface GroupedImageRenderProps {
  srcs: string[];
  eachPosition: positionProps[];
  ratioScale?: number;
}

interface VideoRenderProps {
  ref: HTMLVideoElement;
  position: positionProps;
  scale: { w: number; h: number; };
}

const ThreeCamera = () => {
  const [loadProgress, setLoadProgress] = useState(0);
  const pngGroup = useRef<THREE.Object3D>(new THREE.Object3D());
  const cntPage = useRef(0);
  const moveX = useRef(0);
  const moveY = useRef(0);
  const moveZ = useRef(0);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const scene = useRef<THREE.Scene>(new THREE.Scene());
  const camera = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 10000));
  const renderer = useRef<THREE.WebGLRenderer>(new THREE.WebGLRenderer({ antialias: false, alpha: true }));
  const canvasRef = useRef<HTMLDivElement>(null);
  const minttyRef = useRef<HTMLVideoElement>(null);
  StageResize(() => {
    camera.current.updateProjectionMatrix();
    renderer.current.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1)
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    camera.current.aspect = window.innerWidth / window.innerHeight;
  });
  ScrollEvent(() => {
    cntPage.current = Math.ceil(window.scrollY / 100);
  });

  const renderLayerGroupedImage = useCallback((args: GroupedImageRenderProps) => {
    const { srcs, eachPosition, ratioScale } = args;
    srcs.forEach((src, i) => {
      const imageMap = new THREE.TextureLoader().load(src, (tex) => {
        const width = Math.floor(tex.image.width / (ratioScale || 10));
        const height = Math.floor(tex.image.height / (ratioScale || 10));
        const geometry = new THREE.BoxGeometry(width, height, 0);
        const material = new THREE.MeshBasicMaterial({ map: imageMap, transparent: true, color: 0xffffff });
        const boxMesh = new THREE.Mesh(geometry, material);
        const { x, y, z } = eachPosition[i];
        boxMesh.position.set(x, y, z);
        pngGroup.current.add(boxMesh);
      });
    });
  }, []);

  const renderVideoTexture = useCallback((args: VideoRenderProps) => {
    const { ref, position, scale } = args;
    const { x, y, z } = position;
    const { w, h } = scale;
    const videoTexture = new THREE.VideoTexture(ref);
    const material = new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.FrontSide, toneMapped: false });
    const screen = new THREE.BoxGeometry(w, h, 0);
    const videoScreen = new THREE.Mesh(screen, material);
    material.needsUpdate = true;
    videoScreen.position.set(x, y, z);
    pngGroup.current.add(videoScreen);
  }, []);
  
  const addLocalImagesToPngGroup = useCallback(async() => {
    const introduction: string[] = await ImageLoader(1, 3);
    const diveMsg = await ImageLoader(4);
    const diveMsg2 = await ImageLoader(5);
    const ocean = await ImageLoader(6);
    const mintty = await ImageLoader(7);
    const metaMask = await ImageLoader(8);
    const minttyDesc = await ImageLoader(9, 10);
    const nftDesc = await ImageLoader(11);
    const nftPic = await ImageLoader(12);
    const nftBlog = await ImageLoader(13, 15);
    const internshipText = await ImageLoader(16);
    const internshipBg = await ImageLoader(17);
    const blueHomepage = await ImageLoader(18, 21);
    const blueChart = await ImageLoader(22, 23);
    const msiIntro = await ImageLoader(24, 25);
    renderLayerGroupedImage({ srcs: introduction, eachPosition: [
        { x: -10, y: 10, z: 0 },
        { x: 30, y: -7, z: 2 },
        { x: -55, y: -28, z: 4 }
      ]});
    renderLayerGroupedImage({ srcs: diveMsg, eachPosition: [{ x: 0, y: 0, z: -35 }]});
    renderLayerGroupedImage({ srcs: diveMsg2, eachPosition: [{ x: 0, y: 0, z: -50 }], ratioScale: 12 });
    renderLayerGroupedImage({ srcs: ocean, eachPosition: [{ x: -5, y: 0, z: -52 }], ratioScale: 10 });
    renderLayerGroupedImage({ srcs: mintty, eachPosition: [{ x: 0, y: 0, z: -130 }] });
    if (minttyRef.current) {
      const position: positionProps = { x: 0, y: 0, z: -150 };
      const scale = { w: 57, h: 24 };
      renderVideoTexture({ ref: minttyRef.current, position: position, scale: scale });
    }
    renderLayerGroupedImage({ srcs: minttyDesc, eachPosition: [
        { x: 20, y: 25, z: -200 },
        { x: -40, y: 0, z: -200 },
      ]
    });
    renderLayerGroupedImage( {srcs: metaMask, eachPosition: [{ x: 20, y: -10, z: -200 }], ratioScale: 40 })
    renderLayerGroupedImage({ srcs: nftPic, eachPosition: [{ x: 30, y: 0, z: -260 }]});
    renderLayerGroupedImage({ srcs: nftDesc, eachPosition: [{ x: -40, y: 0, z: -300}]});
    renderLayerGroupedImage({ srcs: nftBlog, eachPosition: [
      { x: -40, y: 0, z: -340 },
      { x: 20, y: 10, z: -340 },
      { x: 20, y: -25, z: -340 },
      ]
    });
    renderLayerGroupedImage({ srcs: internshipBg, eachPosition: [{ x: 0, y: 0, z: -440 }], ratioScale: 5});
    renderLayerGroupedImage({ srcs: internshipText, eachPosition: [{ x: 0, y: 0, z: -420}]});
    renderLayerGroupedImage({ srcs: blueHomepage, eachPosition: [
        { x: -5, y: 0, z: -470 },
        { x: 0, y: 8, z: -581 },
        { x: 0, y: -5, z: -580 },
        { x: 5, y: 5, z: -520 }
      ]});
    renderLayerGroupedImage({ srcs: blueChart, eachPosition: [
        { x: 16, y: 14, z: -650 },
        { x: 0, y: 20, z: -640 }
      ]})
  }, [renderLayerGroupedImage, renderVideoTexture]);
  
  const addLight = useCallback((x: number, y: number, z: number) => {
    const color = 0xffffff;
    const intensity = 0.55;
    const light = new THREE.PointLight(color, intensity);
    light.castShadow = true;
    light.position.set(x, y, z);
    scene.current.add(light);
  }, []);
  
  const init = useCallback(() => {
    // part1: renderer, camera initial setting.
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    renderer.current.setClearColor(0xffffff);
    renderer.current.domElement.style.mixBlendMode = "difference";
    canvasRef.current?.appendChild(renderer.current.domElement);
    camera.current.position.set(0, 0, 50);
    renderer.current.shadowMap.enabled = true;
    scene.current.add(pngGroup.current);
    document.body.style.height = `${window.innerHeight + 30 * 300}px`;

    // const axes = new THREE.AxesHelper(150);
    // const gridHelper = new THREE.GridHelper(240, 20);
    // scene.current.add(axes, gridHelper);
    
    //part2: fog generator
    const near = 40;
    const far = 100;
    const color = "#ffffff";
    scene.current.fog = new THREE.Fog(color, near, far);
    
    const light = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
    light.position.set(200, 200, 0);
    scene.current.add(light);

    addLocalImagesToPngGroup().then(() => addLight(0, 0, 90));
  }, [addLight, addLocalImagesToPngGroup]);
  
  const animate = useCallback(() => {
    moveX.current += (mouseX.current - moveX.current - window.innerWidth / 2) * 0.05;
    moveY.current += (mouseY.current - moveY.current - window.innerHeight / 2) * 0.05;
    moveZ.current += (cntPage.current * 30 - moveZ.current) * 0.07;
    pngGroup.current.position.set(-(moveX.current / 800), moveY.current / 700, moveZ.current / 3);
    pngGroup.current.rotation.set(moveY.current * Math.PI / (180 * 200), moveX.current* Math.PI / (180 * 600), 0);

    camera.current.lookAt(scene.current.position);
    camera.current.updateProjectionMatrix();
    renderer.current.render(scene.current, camera.current);
    requestAnimationFrame(animate);
  }, []);
  
  const setMouseMoveAxis = useCallback((e: MouseEvent) => {
    mouseX.current = e.clientX;
    mouseY.current = e.clientY;
  }, []);

  useEffect(() => {
    init();
    animate();
    
    window.addEventListener("mousemove", setMouseMoveAxis, false);
    return () => {
      window.removeEventListener("mousemove", setMouseMoveAxis);
    }
  }, [animate, init, setMouseMoveAxis]);

  return (
    <>
      <div className={"fixed left-0 top-0 w-screen h-screen z-0"} ref={canvasRef} />
      <video muted playsInline loop autoPlay width={"1920"} height={"720"} style={{ display: "block", visibility: "hidden", position: "absolute" }} ref={minttyRef}>
        <source src={MinttyVid} type={"video/mp4"} />
      </video>
    </>
  )
}

export default ThreeCamera;