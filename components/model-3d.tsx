"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Float, PresentationControls } from "@react-three/drei"
import * as THREE from "three"
import { useTheme } from "next-themes"

export function Model3D() {
  const groupRef = useRef<THREE.Group>(null)
  const { theme } = useTheme()
  const isDarkMode = theme === "dark"

  useFrame((state) => {
    if (!groupRef.current) return

    // Subtle animation based on mouse position
    const mouse = state.mouse
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.5, 0.05)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.2, 0.05)
  })

  // Set scene background color based on theme
  const { scene } = useThree()
  scene.background = null // Make background transparent

  return (
    <PresentationControls
      global
      rotation={[0, 0, 0]}
      polar={[-0.2, 0.2]}
      azimuth={[-0.5, 0.5]}
      config={{ mass: 2, tension: 400 }}
      snap={{ mass: 4, tension: 400 }}
    >
      <Float rotationIntensity={0.5} floatIntensity={0.5}>
        <group ref={groupRef}>
          <NeuralNetwork isDarkMode={isDarkMode} />
        </group>
      </Float>
    </PresentationControls>
  )
}

function NeuralNetwork({ isDarkMode }: { isDarkMode: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  // Create a neural network visualization with nodes and connections
  const layers = [4, 8, 8, 4]
  const nodes: { position: [number, number, number]; layer: number; index: number }[] = []
  const connections: { start: number; end: number }[] = []

  // Create nodes
  let nodeIndex = 0
  layers.forEach((nodeCount, layerIndex) => {
    const layerOffset = (layers.length - 1) / 2 - layerIndex

    for (let i = 0; i < nodeCount; i++) {
      const verticalOffset = (nodeCount - 1) / 2 - i
      nodes.push({
        position: [layerOffset * 2, verticalOffset * 1.2, 0],
        layer: layerIndex,
        index: nodeIndex++,
      })
    }
  })

  // Create connections between layers
  for (let l = 0; l < layers.length - 1; l++) {
    const startIndices = nodes.filter((n) => n.layer === l).map((n) => n.index)
    const endIndices = nodes.filter((n) => n.layer === l + 1).map((n) => n.index)

    for (const start of startIndices) {
      for (const end of endIndices) {
        connections.push({ start, end })
      }
    }
  }

  useFrame((state) => {
    if (!groupRef.current) return

    // Animate the neural network
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.2
  })

  // Theme-based colors
  const lineColor = isDarkMode ? "#aaa" : "#888"
  const nodeColor = "#ffffff"
  const emissiveColor = isDarkMode ? "#8ab4f8" : "#6366f1" // Blue for dark mode, purple for light

  return (
    <group ref={groupRef}>
      {/* Render connections */}
      {connections.map((connection, index) => {
        const start = nodes[connection.start].position
        const end = nodes[connection.end].position

        // Create a line between nodes
        const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)]

        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

        return (
          <line key={`connection-${index}`} geometry={lineGeometry}>
            <lineBasicMaterial color={lineColor} transparent opacity={0.5} />
          </line>
        )
      })}

      {/* Render nodes */}
      {nodes.map((node, index) => (
        <mesh key={`node-${index}`} position={node.position}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color={nodeColor}
            emissive={emissiveColor}
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

