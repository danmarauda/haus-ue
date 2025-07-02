"use client"

import { useState, useEffect, Suspense } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, X, Menu, Info, Maximize2, Minimize2, Camera, Home, Map, Compass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { VirtualTourLoading } from "@/components/virtual-tour-loading"
import { mockProperties } from "@/lib/mock-data"

// Dynamically import the 3D components to avoid SSR issues
const VirtualTourScene = dynamic(() => import("@/components/virtual-tour-scene"), {
  ssr: false,
  loading: () => <VirtualTourLoading />,
})

export default function VirtualTourPage() {
  const router = useRouter()
  const { id } = useParams() as { id: string }
  const [property, setProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showInfo, setShowInfo] = useState(true)
  const [currentRoom, setCurrentRoom] = useState("living-room")
  const [infoPoint, setInfoPoint] = useState<string | null>(null)

  // Available rooms in this virtual tour
  const rooms = [
    { id: "living-room", name: "Living Room" },
    { id: "kitchen", name: "Kitchen" },
    { id: "master-bedroom", name: "Master Bedroom" },
    { id: "bathroom", name: "Bathroom" },
    { id: "outdoor", name: "Outdoor Area" },
  ]

  // Information points that can be displayed in the 3D scene
  const infoPoints = {
    "window-view": {
      title: "Lake View",
      description: "Floor-to-ceiling windows provide stunning views of the lake throughout the day.",
    },
    "kitchen-appliances": {
      title: "Premium Appliances",
      description: "The kitchen features high-end stainless steel appliances and a large center island.",
    },
    "smart-home": {
      title: "Smart Home Features",
      description: "This property is equipped with integrated smart home technology throughout.",
    },
    "ceiling-detail": {
      title: "Vaulted Ceilings",
      description: "The living room features 14-foot vaulted ceilings with recessed lighting.",
    },
  }

  useEffect(() => {
    // In a real app, this would be an API call to fetch the property details
    const fetchedProperty = mockProperties.find((p) => p.id === id)

    if (fetchedProperty) {
      setProperty({
        ...fetchedProperty,
        // Additional virtual tour specific data would be loaded here
      })
    }

    setLoading(false)

    // Handle fullscreen changes
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [id])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  const handleRoomChange = (roomId: string) => {
    setCurrentRoom(roomId)
    // Clear any active info point when changing rooms
    setInfoPoint(null)
  }

  const handleInfoPointClick = (pointId: string) => {
    setInfoPoint(pointId === infoPoint ? null : pointId)
  }

  if (loading) {
    return <VirtualTourLoading />
  }

  if (!property) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#121315] px-4 text-center">
        <h1 className="text-2xl font-bold text-[#E9EAEC]">Property Not Found</h1>
        <p className="mt-2 text-[#A0A3A7]">The property you're looking for doesn't exist or has been removed.</p>
        <Button className="mt-6 bg-[#FFD166] text-[#121315]" onClick={() => router.push("/search")}>
          Back to Search
        </Button>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-[#121315] text-[#E9EAEC]">
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col bg-[#121315] p-6"
        >
          <div className="flex justify-end">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} className="text-[#E9EAEC]">
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center space-y-8 pt-20">
            <Link href="/" className="text-xl hover:text-[#FFD166]">
              Home
            </Link>
            <Link href="/search" className="text-xl hover:text-[#FFD166]">
              Search
            </Link>
            <Link href={`/property/${id}`} className="text-xl hover:text-[#FFD166]">
              Property Details
            </Link>
            <Link href="#" className="text-xl text-[#FFD166]">
              Virtual Tour
            </Link>
            <Button className="mt-8 bg-[#FFD166] text-[#121315] hover:bg-[#FFD166]/90">Contact Agent</Button>
          </div>
        </motion.div>
      )}

      {/* Header - Only visible when not in fullscreen */}
      {!isFullscreen && (
        <header className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between p-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-[#FFD166]"></div>
            <span className="font-medium tracking-wider">OPENHAUS.AI</span>
          </Link>
          <div className="hidden items-center space-x-8 md:flex">
            <Link href="/" className="text-sm hover:text-[#FFD166]">
              Home
            </Link>
            <Link href="/search" className="text-sm hover:text-[#FFD166]">
              Search
            </Link>
            <Link href={`/property/${id}`} className="text-sm hover:text-[#FFD166]">
              Property Details
            </Link>
            <Link href="#" className="text-sm text-[#FFD166]">
              Virtual Tour
            </Link>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
        </header>
      )}

      {/* Back button - Only visible when not in fullscreen */}
      {!isFullscreen && (
        <div className="absolute left-6 top-20 z-10">
          <Button
            variant="ghost"
            className="flex items-center space-x-2 text-[#A0A3A7] hover:text-[#E9EAEC]"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to property</span>
          </Button>
        </div>
      )}

      {/* 3D Scene */}
      <div className="h-screen w-full">
        <Suspense fallback={<VirtualTourLoading />}>
          <VirtualTourScene
            currentRoom={currentRoom}
            onInfoPointClick={handleInfoPointClick}
            activeInfoPoint={infoPoint}
          />
        </Suspense>
      </div>

      {/* UI Controls Overlay */}
      <div
        className={`pointer-events-none absolute inset-0 flex flex-col ${isFullscreen ? "p-6" : "p-6 pt-32 md:pt-28"}`}
      >
        {/* Top Controls */}
        <div className="pointer-events-auto flex items-center justify-between">
          {/* Property Title - Only shown when info is visible */}
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg bg-[#121315]/80 px-4 py-2 backdrop-blur-sm"
            >
              <h1 className="text-lg font-bold md:text-xl">{property.title}</h1>
              <p className="text-sm text-[#A0A3A7]">Virtual Tour</p>
            </motion.div>
          )}

          {/* Top Right Controls */}
          <div className="ml-auto flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border-[#2D2F32] bg-[#121315]/80 backdrop-blur-sm hover:bg-[#1F2124]"
                    onClick={() => setShowInfo(!showInfo)}
                  >
                    <Info className={`h-5 w-5 ${showInfo ? "text-[#FFD166]" : "text-[#A0A3A7]"}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{showInfo ? "Hide information" : "Show information"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border-[#2D2F32] bg-[#121315]/80 backdrop-blur-sm hover:bg-[#1F2124]"
                    onClick={toggleFullscreen}
                  >
                    {isFullscreen ? (
                      <Minimize2 className="h-5 w-5 text-[#A0A3A7]" />
                    ) : (
                      <Maximize2 className="h-5 w-5 text-[#A0A3A7]" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Room Navigation - Only shown when info is visible */}
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pointer-events-auto mt-auto"
          >
            <div className="mb-4 flex items-center overflow-x-auto rounded-lg bg-[#121315]/80 p-2 backdrop-blur-sm">
              {rooms.map((room) => (
                <Button
                  key={room.id}
                  variant={currentRoom === room.id ? "default" : "ghost"}
                  className={`mr-2 whitespace-nowrap ${
                    currentRoom === room.id ? "bg-[#FFD166] text-[#121315]" : "text-[#A0A3A7]"
                  }`}
                  onClick={() => handleRoomChange(room.id)}
                >
                  {room.name}
                </Button>
              ))}
            </div>

            <div className="flex justify-between rounded-lg bg-[#121315]/80 p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full border-[#2D2F32] bg-[#1F2124]/80 hover:bg-[#2D2F32]"
                      >
                        <Camera className="h-5 w-5 text-[#A0A3A7]" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Take screenshot</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full border-[#2D2F32] bg-[#1F2124]/80 hover:bg-[#2D2F32]"
                      >
                        <Map className="h-5 w-5 text-[#A0A3A7]" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>View floor plan</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full border-[#2D2F32] bg-[#1F2124]/80 hover:bg-[#2D2F32]"
                      >
                        <Compass className="h-5 w-5 text-[#A0A3A7]" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Reset orientation</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <Link href={`/property/${id}`}>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 border-[#2D2F32] bg-[#1F2124]/80 hover:bg-[#2D2F32]"
                >
                  <Home className="h-4 w-4 text-[#A0A3A7]" />
                  <span>Property Details</span>
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {/* Info Point Popup */}
      <AnimatePresence>
        {infoPoint && infoPoints[infoPoint as keyof typeof infoPoints] && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="pointer-events-auto absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-[#2D2F32] bg-[#121315]/95 p-6 backdrop-blur-md"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 text-[#A0A3A7] hover:text-[#E9EAEC]"
              onClick={() => setInfoPoint(null)}
            >
              <X className="h-5 w-5" />
            </Button>
            <h3 className="text-xl font-semibold text-[#FFD166]">
              {infoPoints[infoPoint as keyof typeof infoPoints].title}
            </h3>
            <p className="mt-2 text-[#A0A3A7]">{infoPoints[infoPoint as keyof typeof infoPoints].description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
