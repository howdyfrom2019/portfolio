import React, {useCallback, useEffect, useRef, useState} from "react";
import * as THREE from "three";
import { ImageLoader } from "../utils/imageloader";
import { StageResize } from "../utils/stageResize";
import ScrollEvent from "../utils/scrollListener";

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
  const renderer = useRef<THREE.WebGLRenderer>(new THREE.WebGLRenderer({ antialias: true }));
  const canvasRef = useRef<HTMLDivElement>(null);
  StageResize(() => {
    camera.current.updateProjectionMatrix();
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    camera.current.aspect = window.innerWidth / window.innerHeight;
  });
  ScrollEvent(() => {
    cntPage.current = Math.ceil(window.scrollY / 100);
  })
  
  const addLocalImagesToPngGroup = useCallback(async() => {
    const localImages: string[] = await ImageLoader();
    localImages.forEach((localImage, i) => {
      const imageMap = new THREE.TextureLoader().load(localImage,
        (texture) => {
          const cntWidth = Math.floor(texture.image.width / 10);
          const cntHeight = Math.floor(texture.image.height/ 10);
          const geometry = new THREE.BoxGeometry(i === 3 ? cntWidth * 2 : cntWidth, i === 3 ? cntHeight * 2 : cntHeight, 1);
          const material = new THREE.MeshPhongMaterial({ map: imageMap, transparent: true, color: 0xffffff });
          const boxMesh = new THREE.Mesh(geometry, material);

          boxMesh.position.set(0, 0, -i * 20);
          pngGroup.current.add(boxMesh);
        });
    });
  }, []);
  
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
    canvasRef.current?.appendChild(renderer.current.domElement);
    camera.current.position.set(0, 0, 50);
    renderer.current.shadowMap.enabled = true;
    scene.current.add(pngGroup.current);
    document.body.style.height = `${window.innerHeight + 3 * 300}px`;

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