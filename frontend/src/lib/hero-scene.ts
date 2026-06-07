import * as THREE from 'three';

export type HeroSceneVariant = 'primitives' | 'cube';

export interface HeroSceneOptions {
  variant?: HeroSceneVariant;
  accent?: string;
}

export interface HeroSceneHandle {
  dispose: () => void;
}

interface DynamicObject {
  obj: THREE.Object3D;
  baseY: number;
  amp: number;
  speed: number;
  phase: number;
  rx?: number;
  ry?: number;
}

export function initHeroScene(
  canvas: HTMLCanvasElement,
  { variant = 'primitives', accent = '#EC6A1F' }: HeroSceneOptions = {},
): HeroSceneHandle | null {
  let renderer: THREE.WebGLRenderer;

  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
  } catch {
    return null;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0.4, 6.5);
  camera.lookAt(0, 0, 0);

  const hemi = new THREE.HemisphereLight(0xfff3e0, 0xefe2c8, 0.9);
  scene.add(hemi);

  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(3.5, 4, 3);
  scene.add(key);

  const rim = new THREE.DirectionalLight(new THREE.Color(accent), 0.6);
  rim.position.set(-4, -1, -2);
  scene.add(rim);

  const fill = new THREE.PointLight(0xffe3c4, 0.7, 12);
  fill.position.set(-2.5, 2, 3);
  scene.add(fill);

  const matOrange = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accent),
    roughness: 0.42,
    metalness: 0.08,
    flatShading: true,
  });
  const matCream = new THREE.MeshStandardMaterial({
    color: 0xf5ece0,
    roughness: 0.55,
    metalness: 0.04,
    flatShading: true,
  });
  const matInk = new THREE.MeshStandardMaterial({
    color: 0x2a241e,
    roughness: 0.55,
    metalness: 0.15,
    flatShading: true,
  });
  const matAccent2 = new THREE.MeshStandardMaterial({
    color: 0xf4a774,
    roughness: 0.5,
    metalness: 0.05,
    flatShading: true,
  });

  const group = new THREE.Group();
  scene.add(group);

  const dynamic: DynamicObject[] = [];

  function addWire(mesh: THREE.Mesh, color = 0x1a1613) {
    const edges = new THREE.EdgesGeometry(mesh.geometry);
    const line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.18 }),
    );
    mesh.add(line);
  }

  if (variant === 'cube') {
    const cube = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.2, 2.2), matOrange);
    addWire(cube);
    group.add(cube);
    dynamic.push({ obj: cube, baseY: 0, amp: 0.12, speed: 0.7, phase: 0 });
  } else {
    const matAccentGlow = new THREE.MeshStandardMaterial({
      color: new THREE.Color(accent),
      roughness: 0.35,
      metalness: 0.1,
      emissive: new THREE.Color(accent),
      emissiveIntensity: 0.45,
      flatShading: true,
    });

    const cube = new THREE.Mesh(new THREE.BoxGeometry(1.55, 1.55, 1.55), matOrange);
    addWire(cube);
    group.add(cube);
    dynamic.push({
      obj: cube,
      baseY: 0,
      amp: 0.14,
      speed: 0.6,
      phase: 0,
      rx: 0.0025,
      ry: 0.0045,
    });

    const sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(0.6, 0), matCream);
    sphere.position.set(-1.65, 0.95, 0.7);
    addWire(sphere);
    group.add(sphere);
    dynamic.push({
      obj: sphere,
      baseY: 0.95,
      amp: 0.22,
      speed: 0.9,
      phase: 1.2,
      rx: 0.008,
      ry: 0.005,
    });

    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.05, 5), matAccent2);
    cone.position.set(1.7, -0.85, 0.5);
    cone.rotation.z = 0.35;
    group.add(cone);
    dynamic.push({
      obj: cone,
      baseY: -0.85,
      amp: 0.18,
      speed: 0.7,
      phase: 2.4,
      rx: 0.001,
      ry: 0.012,
    });

    const torus = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.16, 10, 22), matInk);
    torus.position.set(1.55, 1.15, -0.4);
    torus.rotation.x = 0.6;
    torus.rotation.y = 0.3;
    group.add(torus);
    dynamic.push({
      obj: torus,
      baseY: 1.15,
      amp: 0.14,
      speed: 1,
      phase: 0.6,
      rx: 0.007,
      ry: 0.011,
    });

    const cube2 = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.55), matInk);
    cube2.position.set(-1.4, -1.1, -0.2);
    cube2.rotation.set(0.4, 0.6, 0);
    group.add(cube2);
    dynamic.push({
      obj: cube2,
      baseY: -1.1,
      amp: 0.12,
      speed: 1.1,
      phase: 3.1,
      rx: 0.009,
      ry: 0.013,
    });

    const octa = new THREE.Mesh(new THREE.OctahedronGeometry(0.34, 0), matAccentGlow);
    octa.position.set(-0.55, -1.25, 0.95);
    group.add(octa);
    dynamic.push({
      obj: octa,
      baseY: -1.25,
      amp: 0.22,
      speed: 1.4,
      phase: 0.9,
      rx: 0.012,
      ry: 0.018,
    });

    const wireGeo = new THREE.DodecahedronGeometry(0.62, 0);
    const wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(wireGeo),
      new THREE.LineBasicMaterial({
        color: new THREE.Color(accent),
        transparent: true,
        opacity: 0.55,
      }),
    );
    wire.position.set(0.5, 0.6, 1.4);
    group.add(wire);
    dynamic.push({
      obj: wire,
      baseY: 0.6,
      amp: 0.15,
      speed: 0.5,
      phase: 2,
      rx: 0.004,
      ry: 0.009,
    });
    wireGeo.dispose();

    const tetra = new THREE.Mesh(new THREE.TetrahedronGeometry(0.32, 0), matInk);
    tetra.position.set(-1.9, -0.2, -0.6);
    group.add(tetra);
    dynamic.push({
      obj: tetra,
      baseY: -0.2,
      amp: 0.18,
      speed: 0.85,
      phase: 1.7,
      rx: 0.006,
      ry: 0.014,
    });

    const disc = new THREE.Mesh(
      new THREE.CircleGeometry(3.6, 48),
      new THREE.MeshStandardMaterial({
        color: 0xefe2cf,
        roughness: 0.95,
        metalness: 0,
        transparent: true,
        opacity: 0.6,
      }),
    );
    disc.rotation.x = -Math.PI / 2;
    disc.position.y = -1.6;
    scene.add(disc);
  }

  const target = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };

  function onMove(event: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    target.x = x * 0.6;
    target.y = -y * 0.4;
  }

  function onLeave() {
    target.x = 0;
    target.y = 0;
  }

  window.addEventListener('mousemove', onMove);
  canvas.addEventListener('mouseleave', onLeave);

  function resize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return;

    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resize();

  let raf = 0;
  const startedAt = performance.now();

  function loop() {
    const time = (performance.now() - startedAt) / 1000;

    current.x += (target.x - current.x) * 0.06;
    current.y += (target.y - current.y) * 0.06;

    group.rotation.y = time * 0.22 + current.x;
    group.rotation.x = current.y * 0.6;

    dynamic.forEach((item) => {
      item.obj.position.y = item.baseY + Math.sin(time * item.speed + item.phase) * item.amp;
      item.obj.rotation.x += item.rx ?? 0.003 * item.speed;
      item.obj.rotation.y += item.ry ?? 0.005 * item.speed;
    });

    renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  }

  loop();

  return {
    dispose() {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      renderer.dispose();
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        mesh.geometry?.dispose();

        const material = mesh.material;
        if (Array.isArray(material)) {
          material.forEach((entry) => entry.dispose());
        } else {
          material?.dispose();
        }
      });
    },
  };
}
