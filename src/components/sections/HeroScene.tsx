"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color } from "three";

// Per-theme colours, matching the CSS accent variables in globals.css.
const PALETTES = {
  // Almond Milk / Dusty Teal glass with Cherry Soda light
  light: { shapes: ["#5b8f8b", "#d1294b", "#7aaaa6", "#ec6885", "#e7dccb", "#5b8f8b"], a: "#d1294b", b: "#5b8f8b", c: "#ec6885" },
  // Smoked Oak / Fawn Suede glass with Neon Iris light
  dark: { shapes: ["#c4a484", "#7b2ff7", "#e2cdb4", "#a78bfa", "#6c6358", "#c4a484"], a: "#7b2ff7", b: "#c4a484", c: "#a78bfa" },
};
type Palette = (typeof PALETTES)["dark"];

// Floating glass objects: [geometry, position, scale]
const SHAPES: Array<["box" | "ico" | "octa" | "torus", [number, number, number], number]> = [
  ["box", [-4.2, 1.6, -1], 0.9],
  ["ico", [4.4, 1.9, -1.5], 0.85],
  ["octa", [-3.4, -1.9, 0], 0.7],
  ["torus", [3.7, -1.7, -0.5], 0.65],
  ["box", [1.6, 3.0, -3], 0.45],
  ["ico", [-1.8, -3.0, -2.5], 0.4],
];

function GlassShape({ kind, position, scale, tint, seed }: {
  kind: (typeof SHAPES)[number][0];
  position: [number, number, number];
  scale: number;
  tint: string;
  seed: number;
}) {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime + seed;
    if (!ref.current) return;
    ref.current.rotation.x = t * 0.25;
    ref.current.rotation.y = t * 0.35;
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.25;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      {kind === "box" && <boxGeometry args={[1.2, 1.2, 1.2]} />}
      {kind === "ico" && <icosahedronGeometry args={[1, 0]} />}
      {kind === "octa" && <octahedronGeometry args={[1, 0]} />}
      {kind === "torus" && <torusGeometry args={[0.8, 0.28, 16, 48]} />}
      <meshPhysicalMaterial
        color={tint}
        transmission={0.9}
        thickness={1.2}
        roughness={0.12}
        metalness={0.05}
        ior={1.45}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

function Particles({ palette, count = 700 }: { palette: Palette; count?: number }) {
  const geometry = useMemo(() => {
    const g = new BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colors = [new Color(palette.a), new Color(palette.b), new Color(palette.c)];
    for (let i = 0; i < count; i++) {
      pos.set([(Math.random() - 0.5) * 18, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8 - 2], i * 3);
      const c = colors[i % colors.length];
      col.set([c.r, c.g, c.b], i * 3);
    }
    g.setAttribute("position", new BufferAttribute(pos, 3));
    g.setAttribute("color", new BufferAttribute(col, 3));
    return g;
  }, [count, palette]);
  const ref = useRef<Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02;
  });
  return (
    <group ref={ref}>
      <points geometry={geometry}>
        <pointsMaterial size={0.035} vertexColors transparent opacity={0.8} blending={AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  );
}

/** Wireframe "hologram" core behind the hero text. */
function Hologram({ color }: { color: string }) {
  const ref = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.12;
    ref.current.rotation.x += dt * 0.05;
  });
  return (
    <mesh ref={ref} position={[0, 0, -4]} scale={2.6}>
      <torusKnotGeometry args={[1, 0.3, 160, 16]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.12} />
    </mesh>
  );
}

/** Tilts the whole scene toward the pointer. */
function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<Group>(null);
  useFrame(({ pointer }) => {
    if (!ref.current) return;
    ref.current.rotation.y += (pointer.x * 0.25 - ref.current.rotation.y) * 0.05;
    ref.current.rotation.x += (-pointer.y * 0.15 - ref.current.rotation.x) * 0.05;
  });
  return <group ref={ref}>{children}</group>;
}

export default function HeroScene({ active, dark }: { active: boolean; dark: boolean }) {
  const palette = dark ? PALETTES.dark : PALETTES.light;
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      aria-hidden
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.6} color={palette.a} />
      <pointLight position={[-6, -2, 3]} intensity={30} color={palette.b} />
      <pointLight position={[6, 3, 2]} intensity={25} color={palette.c} />
      <Rig>
        <Hologram color={palette.a} />
        {SHAPES.map(([kind, position, scale], i) => (
          <GlassShape key={i} kind={kind} position={position} scale={scale} tint={palette.shapes[i]} seed={i * 1.7} />
        ))}
        <Particles palette={palette} />
      </Rig>
    </Canvas>
  );
}
