import React, {useCallback, useEffect, useRef} from "react";
import * as THREE from "three";
import { ImageLoader } from "../utils/imageloader";
import { StageResize } from "../utils/stageResize";
import ScrollEvent from "../utils/scrollListener";

interface GroupedImageRenderProps {
  srcs: string[];
  eachPosition: { x: number; y: number; z: number; }[];
  ratioScale?: number;
}

const ThreeCamera = () => {
  const pngGroup = useRef<THREE.Object3D>(new THREE.Object3D());
  const cntPage = useRef(0);
  const moveX = useRef(0);
  const moveY = useRef(0);
  const moveZ = useRef(0);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const scene = useRef<THREE.Scene>(new THREE.Scene());
  const camera = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 10000));
  const renderer = useRef<THREE.WebGLRenderer>(new THREE.WebGLRenderer({ antialias: true, alpha: true }));
  const canvasRef = useRef<HTMLDivElement>(null);
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
        const geometry = new THREE.BoxGeometry(width, height, 1);
        const material = new THREE.MeshPhongMaterial({ map: imageMap, transparent: true, color: 0xffffff });
        const boxMesh = new THREE.Mesh(geometry, material);
        const { x, y, z } = eachPosition[i];
        boxMesh.position.set(x, y, z);
        pngGroup.current.add(boxMesh);
      });
    });
  }, []);
  
  const addLocalImagesToPngGroup = useCallback(async() => {
    const introduction: string[] = await ImageLoader(1, 3);
    const diveMsg = await ImageLoader(4);
    const diveMsg2 = await ImageLoader(5);
    const ocean = await ImageLoader(6);
    const mintty = await ImageLoader(7);
    // const minttyGif = await ImageLoader(8, 8, "gif");
    renderLayerGroupedImage({ srcs: introduction, eachPosition: [
        { x: -10, y: 10, z: 0 },
        { x: 30, y: -7, z: 0 },
        { x: -55, y: -28, z: 0 }
      ]});
    renderLayerGroupedImage({ srcs: diveMsg, eachPosition: [{ x: 0, y: 0, z: -35 }]});
    renderLayerGroupedImage({ srcs: diveMsg2, eachPosition: [{ x: 0, y: 0, z: -50 }], ratioScale: 12 });
    renderLayerGroupedImage({ srcs: ocean, eachPosition: [{ x: -5, y: 0, z: -52 }], ratioScale: 10 });
    renderLayerGroupedImage({ srcs: mintty, eachPosition: [{ x: 0, y: 0, z: -130 }] });
    // renderLayerGroupedImage({ srcs: minttyGif, eachPosition: [{ x: -10, y: 0, z: -160 }], ratioScale: 8 });
  }, [renderLayerGroupedImage]);
  
  const addLight = useCallback((x: number, y: number, z: number) => {
    const color = 0xffffff;
    const intensity = 1;
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
    light.position.set(100, 100, 0);
    scene.current.add(light);

    addLocalImagesToPngGroup().then(() => addLight(20, 0, 50));
  }, [addLight, addLocalImagesToPngGroup]);
  
  const animate = useCallback(() => {
    moveX.current += (mouseX.current - moveX.current - window.innerWidth / 2) * 0.05;
    moveY.current += (mouseY.current - moveY.current - window.innerHeight / 2) * 0.05;
    moveZ.current += (cntPage.current * 30 - moveZ.current) * 0.07;
    pngGroup.current.position.set(-(moveX.current / 800), moveY.current / 700, moveZ.current / 3);
    
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
    <div>
      <div className={"fixed left-0 top-0 w-screen h-screen z-0"} ref={canvasRef} />
    </div>
  )
}

export default ThreeCamera;