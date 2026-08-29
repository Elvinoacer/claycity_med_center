"use client";

import { useEffect, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Clock,
  Color,
  DirectionalLight,
  ExtrudeGeometry,
  Group,
  IcosahedronGeometry,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  Shape,
  SphereGeometry,
  SRGBColorSpace,
  BoxGeometry,
  TorusGeometry,
  WebGLRenderer,
  AmbientLight,
  PointLight,
} from "three";

function makeGlowTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new CanvasTexture(canvas);

  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(186,230,253,0.55)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);

  const tex = new CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function makeCross(material: MeshStandardMaterial) {
  const shape = new Shape();
  const arm = 0.86;
  const half = 0.17;

  shape.moveTo(-half, -arm);
  shape.lineTo(half, -arm);
  shape.lineTo(half, -half);
  shape.lineTo(arm, -half);
  shape.lineTo(arm, half);
  shape.lineTo(half, half);
  shape.lineTo(half, arm);
  shape.lineTo(-half, arm);
  shape.lineTo(-half, half);
  shape.lineTo(-arm, half);
  shape.lineTo(-arm, -half);
  shape.lineTo(-half, -half);
  shape.closePath();

  const geometry = new ExtrudeGeometry(shape, {
    depth: 0.52,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.065,
    bevelThickness: 0.065,
  });
  geometry.center();

  const mesh = new Mesh(geometry, material);
  mesh.castShadow = false;
  return mesh;
}

function makeNode(material: MeshStandardMaterial, size = 0.16) {
  const node = new Mesh(new BoxGeometry(size, size, size), material);
  node.rotation.set(0.55, 0.35, 0.25);
  return node;
}

export default function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const particleCount = isMobile ? 90 : 560;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.15 : 1.6);

    if (isMobile) {
      Object.assign(host.style, {
        top: "26%",
        left: "6%",
        right: "-2%",
        bottom: "0",
        width: "96%",
        height: "74%",
      });
    }

    const scene = new Scene();
    const camera = new PerspectiveCamera(isMobile ? 40 : 32, 1, 0.1, 50);
    camera.position.set(0, isMobile ? 0.1 : 0.18, isMobile ? 9.2 : 6.9);

    const renderer = new WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: isMobile ? "low-power" : "high-performance",
      stencil: false,
      depth: true,
    });
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.domElement.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;";
    // More presence on mobile so the 3D layer actually feels there
    renderer.domElement.style.opacity = isMobile ? "0.62" : "1";
    host.appendChild(renderer.domElement);

    const root = new Group();
    scene.add(root);

    scene.add(new AmbientLight(0xe0f2fe, 0.9));

    const key = new DirectionalLight(0xffffff, 1.55);
    key.position.set(3.2, 4.2, 5);
    scene.add(key);

    const fill = new PointLight(0x38bdf8, 10, 22, 1.25);
    fill.position.set(-2.4, 1.4, 3);
    scene.add(fill);

    const accent = new PointLight(0xfbbf24, 4.6, 18, 1.4);
    accent.position.set(3.2, -1.2, 2.2);
    scene.add(accent);

    const crossMat = new MeshStandardMaterial({
      color: new Color("#0ea5e9"),
      metalness: 0.62,
      roughness: 0.2,
      emissive: new Color("#0284c7"),
      emissiveIntensity: 0.48,
    });
    const emblem = makeCross(crossMat);
    emblem.position.set(isMobile ? 0.9 : 2.25, isMobile ? 0.12 : 0.32, 0.25);
    emblem.scale.setScalar(isMobile ? 0.85 : 1.28);
    root.add(emblem);

    const coreMat = new MeshStandardMaterial({
      color: new Color("#7dd3fc"),
      metalness: 0.12,
      roughness: 0.12,
      transparent: true,
      opacity: isMobile ? 0.22 : 0.34,
      emissive: new Color("#38bdf8"),
      emissiveIntensity: 0.28,
    });
    const core = new Mesh(new IcosahedronGeometry(isMobile ? 0.74 : 0.95, 2), coreMat);
    core.scale.set(1, 1.2, 0.7);
    core.position.copy(emblem.position);
    core.position.z = -0.18;
    root.add(core);

    const ringMat = new MeshStandardMaterial({
      color: new Color("#bae6fd"),
      metalness: 0.75,
      roughness: 0.22,
      transparent: true,
      opacity: isMobile ? 0.42 : 0.58,
      emissive: new Color("#0284c7"),
      emissiveIntensity: 0.2,
    });

    const rings = new Group();
    const ringScale = isMobile ? 0.68 : 1.05;
    const ringSpecs: [number, number, number][] = [
      [1.7 * ringScale, 0.7, 0.4],
      [2.2 * ringScale, 1.05, 2.2],
      [2.65 * ringScale, 0.3, 1.1],
    ];

    for (const [radius, rx, ry] of ringSpecs) {
      const mesh = new Mesh(
        new TorusGeometry(radius, isMobile ? 0.018 : 0.026, 8, isMobile ? 64 : 100),
        ringMat
      );
      mesh.rotation.set(rx, ry, 0);
      rings.add(mesh);
    }

    rings.position.copy(emblem.position);
    root.add(rings);

    const nodeMat = new MeshStandardMaterial({
      color: new Color("#38bdf8"),
      metalness: 0.55,
      roughness: 0.25,
      emissive: new Color("#0ea5e9"),
      emissiveIntensity: 0.32,
    });

    const nodePositions = isMobile
      ? [
          [-0.95, 0.95, -0.8],
          [1.15, -0.7, -1.5],
          [1.75, 1.05, -2.1],
        ]
      : [
          [1.1, 1.25, -0.8],
          [3.5, -0.9, -1.3],
          [4.15, 1.35, -2.2],
          [1.8, -1.55, -1.8],
        ];

    const nodes = nodePositions.map(([x, y, z], index) => {
      const node = makeNode(nodeMat, isMobile ? 0.13 : 0.19);
      node.position.set(x, y, z);
      node.userData.phase = index * 0.9;
      node.userData.baseY = y;
      root.add(node);
      return node;
    });

    const orbMat = new MeshStandardMaterial({
      color: new Color("#bae6fd"),
      metalness: 0.15,
      roughness: 0.1,
      transparent: true,
      opacity: 0.55,
      emissive: new Color("#38bdf8"),
      emissiveIntensity: 0.36,
    });
    const orb = new Mesh(new SphereGeometry(isMobile ? 0.25 : 0.38, 22, 22), orbMat);
    orb.position.set(isMobile ? -0.2 : 2.7, isMobile ? -0.65 : -1.1, isMobile ? -1.2 : -0.8);
    orb.userData.baseY = orb.position.y;
    root.add(orb);

    const glowTex = makeGlowTexture();
    const pGeo = new BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
    }
    pGeo.setAttribute("position", new BufferAttribute(positions, 3));

    const pMat = new PointsMaterial({
      map: glowTex,
      size: isMobile ? 0.08 : 0.125,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      opacity: isMobile ? 0.62 : 0.88,
      color: new Color("#e0f2fe"),
    });

    const points = new Points(pGeo, pMat);
    root.add(points);

    const clock = new Clock();
    const pointer = { x: 0, y: 0 };
    const cameraTarget = { x: 0, y: 0 };
    let running = true;
    let visible = true;
    let pageHidden = document.hidden;

    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const setSize = () => {
      const { width, height } = host.getBoundingClientRect();
      const w = Math.max(1, Math.floor(width));
      const h = Math.max(1, Math.floor(height));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(host);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        syncLoop();
      },
      { threshold: 0.05 }
    );
    io.observe(host);

    const onVis = () => {
      pageHidden = document.hidden;
      syncLoop();
    };
    document.addEventListener("visibilitychange", onVis);

    const tick = () => {
      const t = clock.getElapsedTime();

      emblem.rotation.y = t * 0.28;
      emblem.rotation.x = Math.sin(t * 0.55) * 0.1;
      emblem.rotation.z = Math.sin(t * 0.35) * 0.04;

      core.rotation.y = -t * 0.18;
      core.rotation.z = Math.sin(t * 0.5) * 0.14;
      core.position.y = emblem.position.y + Math.sin(t * 0.85) * 0.07;

      rings.rotation.y = t * 0.18;
      rings.rotation.z = t * 0.07;

      nodes.forEach((node, i) => {
        const phase = node.userData.phase as number;
        const baseY = node.userData.baseY as number;
        node.rotation.x += 0.007 + i * 0.0008;
        node.rotation.y += 0.01 + i * 0.0012;
        node.position.y = baseY + Math.sin(t * 0.8 + phase) * 0.055;
      });

      const orbBaseY = orb.userData.baseY as number;
      orb.position.y = orbBaseY + Math.sin(t * 0.95) * 0.07;
      orb.rotation.y = t * 0.22;
      points.rotation.y = t * 0.015;

      // Stronger parallax so depth reads clearly when the pointer moves
      const parallaxX = isMobile ? 0.16 : 0.42;
      const parallaxY = isMobile ? 0.1 : 0.26;
      cameraTarget.x += (pointer.x * parallaxX - cameraTarget.x) * 0.04;
      cameraTarget.y += (-pointer.y * parallaxY - cameraTarget.y) * 0.04;
      camera.position.x += (cameraTarget.x - camera.position.x) * 0.03;
      camera.position.y += (0.18 + cameraTarget.y - camera.position.y) * 0.03;
      camera.lookAt(emblem.position.x * 0.35, 0, 0);

      renderer.render(scene, camera);
    };

    function syncLoop() {
      const shouldRun = running && visible && !pageHidden;
      renderer.setAnimationLoop(shouldRun ? tick : null);
    }

    syncLoop();

    return () => {
      running = false;
      renderer.setAnimationLoop(null);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
      ro.disconnect();
      io.disconnect();

      scene.traverse((obj) => {
        if (obj instanceof Mesh || obj instanceof Points) {
          obj.geometry.dispose();
        }
      });

      pMat.dispose();
      glowTex.dispose();
      coreMat.dispose();
      orbMat.dispose();
      crossMat.dispose();
      ringMat.dispose();
      nodeMat.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
