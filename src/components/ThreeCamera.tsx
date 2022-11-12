import React, {useRef, useState} from "react";
import THREE from "three";

const ThreeCamera = () => {
  const pngGroup = useRef<THREE.Object3D>(new THREE.Object3D());
  const cntPage = useRef(0);
  const moveX = useRef(0);
  const moveY = useRef(0);
  const moveZ = useRef(0);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [progress, setProgress] = useState(0);
  const scene = useRef<THREE.Scene>(new THREE.Scene());
  const camera = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 10000));
  const renderer = useRef<THREE.WebGLRenderer>(new THREE.WebGLRenderer({ antialias: true }));
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className={"fixed left-0 top-0 w-screen h-screen z-0"} ref={canvasRef} />
    </div>
  )
}

export default ThreeCamera;