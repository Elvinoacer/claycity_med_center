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
  Group,
  IcosahedronGeometry,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
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
  const group = new Group();
  const barH = new Mesh(new BoxGeometry(1.72, 0.42, 0.42), material);
  const barV = new Mesh(new BoxGeometry(0.42, 1.72, 0.42), material);
  barH.castShadow = false;
  barV.castShadow = false;
  group.add(barH, barV);
  return group;
}

export default function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const particleCount = isMobile ? 90 : 520;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);

    const scene = new Scene();

    // The original mobile camera was too close for a portrait viewport,
    // making the decorative 3D artwork dominate the page. Give mobile a
    // wider field of view and a little more distance so it stays subtle.
    const camera = new PerspectiveCamera(isMobile ? 40 : 34, 1, 0.1, 40);
    camera.position.set(0, isMobile ? 0.15 : 0.2, isMobile ? 10.2 : 7.4);

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
    renderer.domElement.style.opacity = isMobile ? "0.62" : "1";
    host.appendChild(renderer.domElement);

    const root = new Group();
    scene.add(root);

    scene.add(new AmbientLight(0xe0f2fe, 0.75));
    const key = new DirectionalLight(0xffffff, 1.25);
    key.position.set(3.2, 4.2, 5);
    scene.add(key);
    const fill = new PointLight(0x38bdf8, 7, 20, 1.35);
    fill.position.set(-2.4, 1.4, 3);
    scene.add(fill);
    const accent = new PointLight(0xfbbf24, 3.6, 18, 1.5);
    accent.position.set(3.2, -1.2, 2.2);
    scene.add(accent);

    const crossMat = new MeshStandardMaterial({
      color: new Color("#0284c7"),
      metalness: 0.42,
      roughness: 0.28,
      emissive: new Color("#0369a1"),
      emissiveIntensity: 0.35,
    });
    const emblem = makeCross(crossMat);
    emblem.position.set(
      isMobile ? 1.05 : 2.35,
      isMobile ? -0.05 : 0.35,
      -0.4
    );
    emblem.scale.setScalar(isMobile ? 0.56 : 1.15);
    root.add(emblem);

    const orbMat = new MeshStandardMaterial({
      color: new Color("#7dd3fc"),
      metalness: 0.1,
      roughness: 0.18,
      transparent: true,
      opacity: 0.42,
      emissive: new Color("#38bdf8"),
      emissiveIntensity: 0.2,
    });
    const orbGeo = new IcosahedronGeometry(0.22, 1);
    const orbs = [0, 1, 2].map((i) => {
      const mesh = new Mesh(orbGeo, orbMat);
      mesh.userData.phase = i * 2.1;
      emblem.add(mesh);
      return mesh;
    });

    const ringMat = new MeshStandardMaterial({
      color: new Color("#bae6fd"),
      metalness: 0.55,
      roughness: 0.35,
      transparent: true,
      opacity: 0.55,
      emissive: new Color("#0284c7"),
      emissiveIntensity: 0.15,
    });
    const rings = new Group();
    const ringScale = isMobile ? 0.68 : 1;
    const ringSpecs: [number, number, number][] = [
      [1.85 * ringScale, 0.7, 0.4],
      [2.25 * ringScale, 1.1, 2.2],
      [2.65 * ringScale, 0.3, 1.1],
    ];
    ringSpecs.forEach(([r, rx, ry]) => {
      const mesh = new Mesh(
        new TorusGeometry(r, 0.012, 8, isMobile ? 64 : 96),
        ringMat
      );
      mesh.rotation.set(rx, ry, 0);
      rings.add(mesh);
    });
    rings.position.copy(emblem.position);
    rings.scale.copy(emblem.scale);
    root.add(rings);

    const glowTex = makeGlowTexture();
    const pGeo = new BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.45) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    pGeo.setAttribute("position", new BufferAttribute(positions, 3));
    const pMat = new PointsMaterial({
      map: glowTex,
      size: isMobile ? 0.08 : 0.12,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      opacity: 0.85,
      color: new Color("#e0f2fe"),
    });
    const points = new Points(pGeo, pMat);
    root.add(points);

    const clock = new Clock();
    const mouse = { x: 0, y: 0 };
    let running = true;
    let visible = true;
    let pageHidden = document.hidden;

    const onPointer = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
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
      emblem.rotation.y = t * 0.22;
      emblem.rotation.x = Math.sin(t * 0.4) * 0.1;
      rings.rotation.y = t * 0.08;
      rings.rotation.z = t * 0.05;
      points.rotation.y = t * 0.018;

      orbs.forEach((orb, i) => {
        const a = t * 0.7 + orb.userData.phase;
        const radius = 1.15 + i * 0.12;
        orb.position.set(
          Math.cos(a) * radius,
          Math.sin(a * 1.35) * 0.55,
          Math.sin(a) * radius
        );
      });

      root.rotation.y += (mouse.x * 0.28 - root.rotation.y) * 0.045;
      root.rotation.x += (-mouse.y * 0.16 - root.rotation.x) * 0.045;

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
      orbMat.dispose();
      crossMat.dispose();
      ringMat.dispose();
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
