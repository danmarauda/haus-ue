"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, OrbitControls, useTexture, Html, Sphere } from "@react-three/drei"
import { MathUtils } from "three"
import { motion } from "framer-motion-3d"
import { MotionConfig } from "framer-motion"

// Info point component that appears in the 3D scene
function InfoPoint({ position, id, active, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.group
      position={position}
      animate={{
        scale: active ? 1.2 : hovered ? 1.1 : 1,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      <Sphere
        args={[0.15, 16, 16]}
        onClick={() => onClick(id)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={active ? "#FFD166" : hovered ? "#FFD166" : "#FFFFFF"}
          emissive={active ? "#FFD166" : hovered ? "#FFD166" : "#FFFFFF"}
          emissiveIntensity={0.5}
        />
      </Sphere>
      <Html position={[0, 0.3, 0]} center distanceFactor={10} occlude>
        <div
          className={`px-2 py-1 text-xs font-medium rounded-full ${active ? "bg-[#FFD166] text-[#121315]" : "bg-[#121315]/80 text-white"} backdrop-blur-sm transition-all duration-200`}
        >
          i
        </div>
      </Html>
    </motion.group>
  )
}

// Room transition animation
function RoomTransition({ visible }) {
  return (
    <motion.mesh
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 0.9 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial color="#121315" transparent />
    </motion.mesh>
  )
}

// Living Room Scene
function LivingRoom({ active, onInfoPointClick, activeInfoPoint }) {
  const texture = useTexture("/virtual-tour/living-room-360.png")
  const group = useRef()

  // Slowly rotate the scene for an immersive effect when not being controlled
  useFrame((state) => {
    if (group.current && active) {
      group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, group.current.rotation.y + 0.0005, 0.01)
    }
  })

  return (
    <motion.group
      ref={group}
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      visible={active}
    >
      <Sphere args={[50, 64, 64]} scale={[-1, 1, 1]}>
        <meshBasicMaterial map={texture} side={2} />
      </Sphere>

      {/* Info points */}
      <InfoPoint
        position={[10, 0, -20]}
        id="window-view"
        active={activeInfoPoint === "window-view"}
        onClick={onInfoPointClick}
      />
      <InfoPoint
        position={[-15, 5, -10]}
        id="ceiling-detail"
        active={activeInfoPoint === "ceiling-detail"}
        onClick={onInfoPointClick}
      />
      <InfoPoint
        position={[8, -5, 15]}
        id="smart-home"
        active={activeInfoPoint === "smart-home"}
        onClick={onInfoPointClick}
      />
    </motion.group>
  )
}

// Kitchen Scene
function Kitchen({ active, onInfoPointClick, activeInfoPoint }) {
  const texture = useTexture("/virtual-tour/kitchen-360.png")
  const group = useRef()

  useFrame((state) => {
    if (group.current && active) {
      group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, group.current.rotation.y + 0.0005, 0.01)
    }
  })

  return (
    <motion.group
      ref={group}
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      visible={active}
    >
      <Sphere args={[50, 64, 64]} scale={[-1, 1, 1]}>
        <meshBasicMaterial map={texture} side={2} />
      </Sphere>

      {/* Info points */}
      <InfoPoint
        position={[0, 0, -20]}
        id="kitchen-appliances"
        active={activeInfoPoint === "kitchen-appliances"}
        onClick={onInfoPointClick}
      />
    </motion.group>
  )
}

// Master Bedroom Scene
function MasterBedroom({ active }) {
  const texture = useTexture("/virtual-tour/bedroom-360.png")
  const group = useRef()

  useFrame((state) => {
    if (group.current && active) {
      group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, group.current.rotation.y + 0.0005, 0.01)
    }
  })

  return (
    <motion.group
      ref={group}
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      visible={active}
    >
      <Sphere args={[50, 64, 64]} scale={[-1, 1, 1]}>
        <meshBasicMaterial map={texture} side={2} />
      </Sphere>
    </motion.group>
  )
}

// Bathroom Scene
function Bathroom({ active }) {
  const texture = useTexture("/virtual-tour/bathroom-360.png")
  const group = useRef()

  useFrame((state) => {
    if (group.current && active) {
      group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, group.current.rotation.y + 0.0005, 0.01)
    }
  })

  return (
    <motion.group
      ref={group}
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      visible={active}
    >
      <Sphere args={[50, 64, 64]} scale={[-1, 1, 1]}>
        <meshBasicMaterial map={texture} side={2} />
      </Sphere>
    </motion.group>
  )
}

// Outdoor Area Scene
function OutdoorArea({ active }) {
  const texture = useTexture("/virtual-tour/outdoor-360.png")
  const group = useRef()

  useFrame((state) => {
    if (group.current && active) {
      group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, group.current.rotation.y + 0.0005, 0.01)
    }
  })

  return (
    <motion.group
      ref={group}
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      visible={active}
    >
      <Sphere args={[50, 64, 64]} scale={[-1, 1, 1]}>
        <meshBasicMaterial map={texture} side={2} />
      </Sphere>
    </motion.group>
  )
}

// Navigation instructions that appear at the start
function NavigationInstructions() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <Html center position={[0, 0, -10]}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="p-4 rounded-lg bg-[#121315]/90 text-white text-center backdrop-blur-md"
      >
        <p className="text-sm">
          <span className="block font-bold mb-2">Navigation Controls</span>
          <span className="block text-[#A0A3A7]">Click and drag to look around</span>
          <span className="block text-[#A0A3A7]">Scroll to zoom in/out</span>
          <span className="block text-[#A0A3A7]">Click on info points (i) to learn more</span>
        </p>
      </motion.div>
    </Html>
  )
}

// Scene setup and camera controls
function SceneSetup({ children }) {
  const { camera } = useThree()

  useEffect(() => {
    camera.fov = 75
    camera.updateProjectionMatrix()
  }, [camera])

  return (
    <>
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={2}
        maxDistance={20}
        rotateSpeed={0.5}
        dampingFactor={0.1}
        enableDamping={true}
      />
      {children}
    </>
  )
}

// Main component that renders the 3D scene
export default function VirtualTourScene({ currentRoom, onInfoPointClick, activeInfoPoint }) {
  const [transitioning, setTransitioning] = useState(false)

  // Handle room transitions with animation
  useEffect(() => {
    setTransitioning(true)
    const timer = setTimeout(() => {
      setTransitioning(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [currentRoom])

  return (
    <MotionConfig transition={{ duration: 0.5 }}>
      <Canvas shadows>
        <SceneSetup>
          <color attach="background" args={["#121315"]} />

          <LivingRoom
            active={currentRoom === "living-room"}
            onInfoPointClick={onInfoPointClick}
            activeInfoPoint={activeInfoPoint}
          />
          <Kitchen
            active={currentRoom === "kitchen"}
            onInfoPointClick={onInfoPointClick}
            activeInfoPoint={activeInfoPoint}
          />
          <MasterBedroom active={currentRoom === "master-bedroom"} />
          <Bathroom active={currentRoom === "bathroom"} />
          <OutdoorArea active={currentRoom === "outdoor"} />

          <RoomTransition visible={transitioning} />
          <NavigationInstructions />

          <Environment preset="apartment" />
        </SceneSetup>
      </Canvas>
    </MotionConfig>
  )
}
