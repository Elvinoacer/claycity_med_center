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

  const w = 0.34;
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
    depth: 0.42,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.055,
    bevelThickness: 0.055,
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
    const particleCount = isMobile ? 75 : 520;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);

    // On portrait screens the 3D layer belongs behind the action/trust area,
    // not behind the headline. On larger screens it can remain full-bleed.
    if (isMobile) {
      Object.assign(host.style, {
        top: "28%",
        left: "8%",
        right: "-4%",
        bottom: "0",
        width: "96%",
        height: "72%",
      });
    }

    const scene = new Scene();
    const camera = new PerspectiveCamera(isMobile ? 42 : 34, 1, 0.1, 50);
    camera.position.set(0, isMobile ? 0.12 : 0.2, isMobile ? 9.8 : 7.4);

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
    renderer.domElement.style.opacity = isMobile ? "0.48" : "1";
    host.appendChild(renderer.domElement);

    const root = new Group();
    scene.add(root);

    scene.add(new AmbientLight(0xe0f2fe, 0.82));

    const key = new DirectionalLight(0xffffff, 1.35);
    key.position.set(3.2, 4.2, 5);
    scene.add(key);

    const fill = new PointLight(0x38bdf8, 8, 20, 1.35);
    fill.position.set(-2.4, 1.4, 3);
    scene.add(fill);

    const accent = new PointLight(0xfbbf24, 3.8, 18, 1.5);
    accent.position.set(3.2, -1.2, 2.2);
    scene.add(accent);

    // Main 3D clinical emblem: a genuinely extruded/bevelled cross hovering
    // inside a rotating system of orbital rings.
    const crossMat = new MeshStandardMaterial({
      color: new Color("#0284c7"),
      metalness: 0.58,
      roughness: 0.24,
      emissive: new Color("#0369a1"),
      emissiveIntensity: 0.32,
    });

    const emblem = makeCross(crossMat);
    emblem.position.set(isMobile ? 0.95 : 2.35, isMobile ? 0.15 : 0.35, 0.2);
    emblem.scale.setScalar(isMobile ? 0.8 : 1.18);
    root.add(emblem);

    // Soft translucent core behind the cross adds actual volumetric depth.
    const coreMat = new MeshStandardMaterial({
      color: new Color("#7dd3fc"),
      metalness: 0.1,
      roughness: 0.15,
      transparent: true,
      opacity: isMobile ? 0.18 : 0.28,
      emissive: new Color("#38bdf8"),
      emissiveIntensity: 0.18,
    });
    const core = new Mesh(new IcosahedronGeometry(isMobile ? 0.7 : 0.88, 2), coreMat);
    core.scale.set(1, 1.18, 0.72);
    core.position.copy(emblem.position);
    core.position.z = -0.12;
    root.add(core);

    const ringMat = new MeshStandardMaterial({
      color: new Color("#bae6fd"),
      metalness: 0.7,
      roughness: 0.26,
      transparent: true,
      opacity: isMobile ? 0.38 : 0.52,
      emissive: new Color("#0284c7"),
      emissiveIntensity: 0.14,
    });

    const rings = new Group();
    const ringScale = isMobile ? 0.64 : 1;
    const ringSpecs: [number, number, number][] = [
      [1.7 * ringScale, 0.7, 0.4],
      [2.15 * ringScale, 1.05, 2.2],
      [2.55 * ringScale, 0.3, 1.1],
    ];

    for (const [radius, rx, ry] of ringSpecs) {
      const mesh = new Mesh(
        new TorusGeometry(radius, isMobile ? 0.016 : 0.022, 8, isMobile ? 64 : 96),
        ringMat
      );
      mesh.rotation.set(rx, ry, 0);
      rings.add(mesh);
    }

    rings.position.copy(emblem.position);
    root.add(rings);

    // Four smaller 3D data nodes sit at different depths and move at slightly
    // different rates, creating a layered parallax constellation.
    const nodeMat = new MeshStandardMaterial({
      color: new Color("#0ea5e9"),
      metalness: 0.5,
      roughness: 0.3,
      emissive: new Color("#0284c7"),
      emissiveIntensity: 0.2,
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
      const node = makeNode(nodeMat, isMobile ? 0.12 : 0.17);
      node.position.set(x, y, z);
      node.userData.phase = index * 0.9;
      root.add(node);
      return node;
    });

    // A second, smaller glowing body provides another clear 3D depth cue.
    const orbMat = new MeshStandardMaterial({
      color: new Color("#bae6fd"),
      metalness: 0.12,
      roughness: 0.12,
      transparent: true,
      opacity: 0.48,
      emissive: new Color("#38bdf8"),
      emissiveIntensity: 0.28,
    });
    const orb = new Mesh(new SphereGeometry(isMobile ? 0.23 : 0.34, 20, 20), orbMat);
    orb.position.set(isMobile ? -0.2 : 2.7, isMobile ? -0.65 : -1.1, isMobile ? -1.2 : -0.8);
    root.add(orb);

    // Depth field.
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
      size: isMobile ? 0.07 : 0.11,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      opacity: isMobile ? 0.55 : 0.8,
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

      emblem.rotation.y = t * 0.24;
      emblem.rotation.x = Math.sin(t * 0.55) * 0.08;

      core.rotation.y = -t * 0.16;
      core.rotation.z = Math.sin(t * 0.5) * 0.12;
      core.position.y = emblem.position.y + Math.sin(t * 0.85) * 0.06;

      rings.rotation.y = t * 0.16;
      rings.rotation.z = t * 0.06;

      nodes.forEach((node, i) => {
        const phase = node.userData.phase as number;
        node.rotation.x += 0.006 + i * 0.0007;
        node.rotation.y += 0.009 + i * 0.001;
        node.position.y += Math.sin(t * 0.75 + phase) * 0.0008;
      });

      orb.position.y += Math.sin(t * 0.9) * 0.0013;
      orb.rotation.y = t * 0.18;
      points.rotation.y = t * 0.012;

      // True camera parallax: the camera moves through the scene while the
      // object continues its own independent rotation.
      cameraTarget.x += (pointer.x * (isMobile ? 0.12 : 0.28) - cameraTarget.x) * 0.035;
      cameraTarget.y += (-pointer.y * (isMobile ? 0.08 : 0.18) - cameraTarget.y) * 0.035;
      camera.position.x += (cameraTarget.x - camera.position.x) * 0.025;
      camera.position.y += (0.2 + cameraTarget.y - camera.position.y) * 0.025;
      camera.lookAt(0, 0, 0);

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
