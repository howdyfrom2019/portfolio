import React, {useCallback, useEffect, useRef, useState} from "react";
import {useZProgressDispatch} from "../store/Context";
import * as THREE from "three";
import {StageResize} from "../utils/stageResize";
import ScrollEvent from "../utils/scrollListener";
import {LoadingPortal} from "../pages/Portal";
import {GroupedImageRenderProps} from "./FrontEndPF";
import {ImageLoader} from "../utils/imageloader";
import {useLocation, useNavigate} from "react-router-dom";

interface EtcsProps {
  toggleMusic?: (isPlaying?: boolean) => void;
}

const Etcs: React.FC<EtcsProps> = ({ toggleMusic }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(100);
  const progressDispatch = useZProgressDispatch();
  const pngGroup = useRef<THREE.Object3D>(new THREE.Object3D());
  const cntPage = useRef(0);
  const moveX = useRef(0);
  const moveY = useRef(0);
  const moveZ = useRef(0);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const scrollY = useRef(0);
  const scene = useRef<THREE.Scene>(new THREE.Scene());
  const camera = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 10000));
  const renderer = useRef<THREE.WebGLRenderer>(new THREE.WebGLRenderer({ antialias: false, alpha: true }));
  const canvasRef = useRef<HTMLDivElement>(null);
  const updateProgress = (scrollY: number, eod: number) => progressDispatch({ type: "onchange", progress: (scrollY/eod) });
  const clearProgress = () => progressDispatch({ type: "clear"});

  StageResize(() => {
    camera.current.updateProjectionMatrix();
    renderer.current.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    camera.current.aspect = window.innerWidth / window.innerHeight;
  });
  ScrollEvent(() => {
    cntPage.current = Math.ceil(window.scrollY / 100);
    const [currScrollY, endOfDocs] = [window.scrollY + window.innerHeight, document.body.scrollHeight];
    if (currScrollY === endOfDocs) clearProgress();
    else if (window.scrollY === 0 && scrollY.current > window.scrollY) navigate(-1);
    else updateProgress(currScrollY, endOfDocs);
    scrollY.current = window.scrollY;
  });

  const renderLayerGroupedImage = useCallback((args: GroupedImageRenderProps) => {
    const { srcs, eachPosition, ratioScale } = args;
    srcs.forEach((src, i) => {
      const imageMap = new THREE.TextureLoader().load(src, (tex) => {
        const { x, y, z, ratioScale: _ratioScale } = eachPosition[i];
        const width = Math.floor(tex.image.width / (_ratioScale || ratioScale || 10));
        const height = Math.floor(tex.image.height / (_ratioScale || ratioScale || 10));
        const geometry = new THREE.BoxGeometry(width, height, 0);
        const material = new THREE.MeshBasicMaterial({ map: imageMap, transparent: true, color: 0xffffff });
        const boxMesh = new THREE.Mesh(geometry, material);
        boxMesh.position.set(x, y, z);
        pngGroup.current.add(boxMesh);
      });
    });
  }, []);
  
  const addLocalImagesToPngGroup = useCallback(async() => {
    const parrotLampIntro = await ImageLoader(37, 40);
    const parrotLampContent = await ImageLoader(41,44);
    
    renderLayerGroupedImage({ srcs: parrotLampIntro, eachPosition: [
        { x: -2, y: 0, z: -4, ratioScale: 12 },
        { x: -37, y: -5, z: -3, ratioScale: 14 },
        { x: 30, y: -5, z: -2, ratioScale: 16 },
        { x: 0, y: -5, z: 1 }
      ]
    });
    renderLayerGroupedImage({ srcs: parrotLampContent, eachPosition: [
        { x: 0, y: 0, z: -44 },
        { x: 0, y: 0, z: -85 },
        { x: 0, y: 0, z: -150 },
        { x: 0, y: 0, z: -151 }
      ]});
  }, [renderLayerGroupedImage]);

  const init = useCallback(() => {
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    renderer.current.setClearColor(0xffffff);
    renderer.current.domElement.style.mixBlendMode = "difference";
    canvasRef.current?.appendChild(renderer.current.domElement);
    camera.current.position.set(0, 0, 50);
    renderer.current.shadowMap.enabled = true;
    scene.current.add(pngGroup.current);
    document.body.style.height = `${window.innerHeight + 37.5 * 300}px`;

    THREE.DefaultLoadingManager.onProgress = (url, item, total) => {
      setLoading(Math.ceil(100 * item / total));
      // if (item === total) toggleMusic && toggleMusic(true);
    }

    const near = 40;
    const far = 100;
    const color = "#ffffff";
    scene.current.fog = new THREE.Fog(color, near, far);

    const light = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
    light.position.set(200, 200, 0);
    scene.current.add(light);
    addLocalImagesToPngGroup().then(() => {
      const color = 0xffffff;
      const intensity = 0.55;
      const light = new THREE.PointLight(color, intensity);
      light.castShadow = true;
      light.position.set(0, 0, 90);
      scene.current.add(light);
    })
  }, []);

  const animate = useCallback(() => {
    moveX.current += (mouseX.current - moveX.current - window.innerWidth / 2) * 0.05;
    moveY.current += (mouseY.current - moveY.current - window.innerHeight / 2) * 0.05;
    moveZ.current += (cntPage.current * 30 - moveZ.current) * 0.07;
    pngGroup.current.position.set(0, 0, moveZ.current / 3);
    pngGroup.current.rotation.set(moveY.current * Math.PI / (180 * 300), moveX.current* Math.PI / (180 * 400), 0);

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
    window.scrollTo({ top: location.state.y ? location.state.y : 0 });
    init();
    animate();

    window.addEventListener("mousemove", setMouseMoveAxis, false);
    return () => {
      window.removeEventListener("mousemove", setMouseMoveAxis);
    }
  }, [animate, init, location.state.y, setMouseMoveAxis]);

  return (
    <>
      <div className={"fixed left-0 top-0 w-screen h-screen z-0"} ref={canvasRef} />
      <LoadingPortal close={loading === 100}>
        <span className={"font-genshin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl"}>
          {loading}%
        </span>
      </LoadingPortal>
    </>
  )
}

export default Etcs;