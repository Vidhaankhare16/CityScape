"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  Bell,
  Search,
  Camera,
  Users,
  Activity,
  Car,
  Building,
  Calendar,
  Cloud,
  User,
  Send,
  Bot,
  Upload,
  X,
  TrendingUp,
  MapPin,
  Clock,
  AlertTriangle,
  Eye,
  MessageCircle,
  ChevronRight,
  Flame,
  Sun,
  Moon,
  Sparkles,
  ZapIcon,
  Menu,
  Filter,
  BarChart3,
  Shield,
  ArrowUp,
  ArrowDown,
  Layers,
  Heart,
  Share2,
  Bookmark,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import GoogleMap from "./components/google-map"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Notifications from "./components/Notifications"
import Chat from "./components/Chat"
import ReportModal from "./components/ReportModal"
import { getSeverityColor, formatTimeAgo } from "./lib/utils"
import { mockEvents, CityEvent } from "./mock/events"

const eventTypes = [
  {
    id: "traffic",
    label: "Traffic & Transport",
    icon: Car,
    color: "#3b82f6",
    gradient: "from-blue-500 via-blue-600 to-indigo-600",
    lightBg: "from-blue-50 to-indigo-100",
    darkBg: "from-blue-950/50 to-indigo-950/50",
    description: "Real-time traffic monitoring",
    emoji: "🚗",
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    icon: Building,
    color: "#8b5cf6",
    gradient: "from-purple-500 via-violet-600 to-purple-700",
    lightBg: "from-purple-50 to-violet-100",
    darkBg: "from-purple-950/50 to-violet-950/50",
    description: "City systems & utilities",
    emoji: "🏗️",
  },
  {
    id: "events",
    label: "Public Events",
    icon: Calendar,
    color: "#10b981",
    gradient: "from-emerald-500 via-green-600 to-teal-600",
    lightBg: "from-emerald-50 to-green-100",
    darkBg: "from-emerald-950/50 to-green-950/50",
    description: "Community gatherings",
    emoji: "🎉",
  },
  {
    id: "emergency",
    label: "Emergency Services",
    icon: Shield,
    color: "#ef4444",
    gradient: "from-red-500 via-rose-600 to-pink-600",
    lightBg: "from-red-50 to-rose-100",
    darkBg: "from-red-950/50 to-rose-950/50",
    description: "Critical alerts & responses",
    emoji: "🚨",
  },
  {
    id: "weather",
    label: "Weather & Climate",
    icon: Cloud,
    color: "#f59e0b",
    gradient: "from-amber-500 via-orange-600 to-yellow-600",
    lightBg: "from-amber-50 to-orange-100",
    darkBg: "from-amber-950/50 to-orange-950/50",
    description: "Environmental conditions",
    emoji: "🌤️",
  },
]

const trendingLocations = [
  { name: "Downtown Bridge", events: 8, trend: "+12%", change: "up" },
  { name: "Central Park", events: 5, trend: "+8%", change: "up" },
  { name: "5th Avenue", events: 12, trend: "+15%", change: "up" },
  { name: "Park Avenue", events: 3, trend: "-5%", change: "down" },
]

// Color-coded zones for different areas (organic blemish-like shapes)
const mapZones = [
  {
    id: "downtown-traffic",
    name: "Downtown Traffic Zone",
    type: "traffic" as const,
    color: "#ef4444", // Red for heavy traffic
    opacity: 0.25,
    coordinates: { x: 40, y: 50, width: 8, height: 6 },
    description: "High traffic congestion area",
    severity: "high" as const,
    shape: "blob" as const, // Organic blob shape
  },
  {
    id: "industrial-pollution",
    name: "Industrial Pollution Zone",
    type: "pollution" as const,
    color: "#dc2626", // Dark red for pollution
    opacity: 0.3,
    coordinates: { x: 80, y: 30, width: 6, height: 4 },
    description: "High pollution levels detected",
    severity: "high" as const,
    shape: "blob" as const, // Organic blob shape
  },
  {
    id: "park-happiness",
    name: "Green Park Zone",
    type: "happiness" as const,
    color: "#10b981", // Green for happy/positive area
    opacity: 0.2,
    coordinates: { x: 15, y: 55, width: 10, height: 8 },
    description: "High community satisfaction area",
    severity: "low" as const,
    shape: "blob" as const, // Organic blob shape
  },
  {
    id: "business-safety",
    name: "Business District Safety",
    type: "safety" as const,
    color: "#3b82f6", // Blue for safety
    opacity: 0.15,
    coordinates: { x: 55, y: 35, width: 7, height: 5 },
    description: "Enhanced police presence and safety",
    severity: "low" as const,
    shape: "blob" as const, // Organic blob shape
  },
  {
    id: "rush-hour-traffic",
    name: "Rush Hour Traffic",
    type: "traffic" as const,
    color: "#f97316", // Orange for moderate traffic
    opacity: 0.25,
    coordinates: { x: 55, y: 35, width: 8, height: 6 },
    description: "Rush hour traffic congestion",
    severity: "medium" as const,
    shape: "blob" as const, // Organic blob shape
  },
  {
    id: "coastal-wind",
    name: "Coastal Wind Zone",
    type: "pollution" as const,
    color: "#f59e0b", // Amber for wind/pollution
    opacity: 0.15,
    coordinates: { x: 85, y: 75, width: 5, height: 6 },
    description: "Wind advisory and air quality concerns",
    severity: "medium" as const,
    shape: "blob" as const, // Organic blob shape
  },
]

const recentActivity = [
  { user: "Alex Chen", action: "reported traffic jam", location: "Main St", time: "2m ago", type: "traffic" },
  { user: "Maria Garcia", action: "liked event", location: "Central Park", time: "5m ago", type: "events" },
  { user: "John Smith", action: "commented on", location: "5th Avenue", time: "8m ago", type: "infrastructure" },
  { user: "Sarah Wilson", action: "shared alert", location: "Downtown", time: "12m ago", type: "emergency" },
]

const notifications = [
  {
    id: 0,
    type: "traffic",
    title: "Route Alert",
    message: "Your usual work route has a roadblock — suggest alternate routes / Your usual route has more traffic than usual, leave 15 minutes early",
    time: "now",
    read: false,
  },
  {
    id: 1,
    type: "emergency",
    title: "Emergency Alert",
    message: "Fire department response in downtown area",
    time: "2m ago",
    read: false,
  },
  {
    id: 2,
    type: "report",
    title: "New Reports",
    message: "3 citizen reports received in the last hour",
    time: "5m ago",
    read: false,
  },
  {
    id: 3,
    type: "traffic",
    title: "Traffic Update",
    message: "Downtown congestion has decreased by 15%",
    time: "10m ago",
    read: true,
  },
  {
    id: 4,
    type: "weather",
    title: "Weather Alert",
    message: "Heavy rain expected in your area",
    time: "15m ago",
    read: true,
  },
]

export default function UrbanPulseDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mobileChatOpen, setMobileChatOpen] = useState(false)
  const [mobileChatExpanded, setMobileChatExpanded] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([
    "traffic",
    "infrastructure",
    "events",
    "emergency",
    "weather",
  ])
  const [searchQuery, setSearchQuery] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [liveStats, setLiveStats] = useState({
    activeEvents: 35,
    citizensOnline: 1247,
    alertsToday: 12,
    responseTime: 4.2,
  })
  const [selectedEvent, setSelectedEvent] = useState<CityEvent | null>(null)
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "bot",
      message: "Hi! I'm your city assistant. Ask me anything about traffic, events, or city services.",
      timestamp: new Date(Date.now() - 60000),
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportForm, setReportForm] = useState({
    title: "",
    description: "",
    type: "traffic",
    image: null as File | null,
  })
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [likedEvents, setLikedEvents] = useState<Set<number>>(new Set())
  const [bookmarkedEvents, setBookmarkedEvents] = useState<Set<number>>(new Set())
  const fileInputRef = useRef<HTMLInputElement>(null!)
  const notificationRef = useRef<HTMLDivElement>(null!)
  const mobileChatRef = useRef<HTMLDivElement>(null!)
  const chatMessagesRef = useRef<HTMLDivElement>(null!)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) {
        setSidebarOpen(false)
        setRightPanelCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    // Simulate loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    const timer = setInterval(() => {
      setCurrentTime(new Date())
      setLiveStats((prev) => ({
        activeEvents: Math.max(15, prev.activeEvents + Math.floor(Math.random() * 3) - 1),
        citizensOnline: Math.max(1000, prev.citizensOnline + Math.floor(Math.random() * 20) - 10),
        alertsToday: Math.max(5, prev.alertsToday + (Math.random() > 0.95 ? 1 : 0)),
        responseTime: Math.max(2, prev.responseTime + (Math.random() - 0.5) * 0.5),
      }))
    }, 5000)

    return () => {
      clearTimeout(loadingTimer)
      clearInterval(timer)
    }
  }, [])

  // Auto-scroll chat messages
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }
  }, [chatMessages])

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
      if (mobileChatRef.current && !mobileChatRef.current.contains(event.target as Node)) {
        if (mobileChatExpanded && isMobile) {
          setMobileChatExpanded(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [mobileChatExpanded, isMobile])

  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev: string[]) => (prev.includes(filterId) ? prev.filter((id: string) => id !== filterId) : [...prev, filterId]))
  }

  const filteredEvents: CityEvent[] = mockEvents.filter(
    (event) =>
      activeFilters.includes(event.type) &&
      (searchQuery === "" || event.location.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return

    const userMessage = {
      id: Date.now(),
      type: "user",
      message: chatInput,
      timestamp: new Date(),
    }

    setChatMessages((prev: any[]) => [...prev, userMessage])
    setChatInput("")
    setIsTyping(true)

    // Hardcoded response for wheelchair accessible metro routes
    if (userMessage.message.trim().toLowerCase() === "which metro routes near my home are wheelchair accessible?" ||
        userMessage.message.trim().toLowerCase().includes("wheelchair accessible") && userMessage.message.trim().toLowerCase().includes("metro")) {
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          type: "bot",
          message:
            "🛤️ Sure — based on your current location in Indiranagar, the following nearby metro stations are fully wheelchair accessible with lifts and ramps:\n\nIndiranagar Metro Station (Purple Line) — ✔️ Accessible\n\nHalasuru Metro Station (Purple Line) — ✔️ Accessible\n\nSwami Vivekananda Metro Station (Purple Line) — ❌ Limited access (only one exit has a ramp) .",
          timestamp: new Date(),
        }
        setChatMessages((prev: any[]) => [...prev, botMessage])
        setIsTyping(false)
      }, 1500)
      return
    }

    setTimeout(() => {
      const responses = [
        "Traffic is heavy on Downtown Bridge with 15-minute delays. I recommend taking 5th Avenue as an alternate route.",
        "There are 3 events today: Jazz Night at Central Park (8 PM), Street Festival on 5th Avenue (6 PM).",
        "Current emergency status is normal. The recent fire department response has been resolved.",
        "Weather shows partly cloudy conditions at 72°F. Heavy rain expected around 4 PM.",
        "City infrastructure is running normally. Water main work on Park Avenue should complete tomorrow.",
        "I found 5 trending locations near you. Downtown Bridge has the most activity with 8 events.",
        "The city response time is currently 4.2 minutes, which is excellent for this time of day.",
        "There are 1,247 citizens currently online and reporting city events in real-time.",
      ]

      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }

      setChatMessages((prev: any[]) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleLikeEvent = (eventId: number) => {
    setLikedEvents((prev: Set<number>) => {
      const newSet = new Set(prev)
      if (newSet.has(eventId)) {
        newSet.delete(eventId)
      } else {
        newSet.add(eventId)
      }
      return newSet
    })
  }

  const handleBookmarkEvent = (eventId: number) => {
    setBookmarkedEvents((prev: Set<number>) => {
      const newSet = new Set(prev)
      if (newSet.has(eventId)) {
        newSet.delete(eventId)
      } else {
        newSet.add(eventId)
      }
      return newSet
    })
  }

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      const video = document.createElement("video")
      video.srcObject = stream
      video.play()

      video.addEventListener("loadedmetadata", () => {
        const canvas = document.createElement("canvas")
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const ctx = canvas.getContext("2d")
        ctx?.drawImage(video, 0, 0)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" })
              setReportForm((prev: { title: string; description: string; type: string; image: File | null }) => ({ ...prev, image: file }))
              setCapturedImage(canvas.toDataURL())
            }
          },
          "image/jpeg",
          0.8,
        )

        stream.getTracks().forEach((track) => track.stop())
      })
    } catch (error) {
      console.error("Camera access denied:", error)
      fileInputRef.current?.click()
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setReportForm((prev: { title: string; description: string; type: string; image: File | null }) => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitReport = () => {
    console.log("Report submitted:", reportForm)
    setShowReportModal(false)
    setReportForm({ title: "", description: "", type: "traffic", image: null })
    setCapturedImage(null)
  }

  const handleEventSelect = (event: any) => {
    setSelectedEvent(event)
  }

  const unreadNotifications = notifications.filter((n) => !n.read).length

  if (isLoading) {
    return (
      <div
        className={`h-screen flex items-center justify-center ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900"
            : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
        }`}
      >
        <div className="text-center">
          <div className="relative">
            <div className="w-32 h-32 border-8 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-8"></div>
            <div className="absolute inset-0 w-32 h-32 border-8 border-transparent border-r-purple-600 rounded-full animate-spin mx-auto animation-delay-150"></div>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
              Urban Pulse
            </h2>
            <p className={`text-lg font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"} animate-pulse`}>
              Initializing City Intelligence Platform...
            </p>
            <div className="flex justify-center space-x-2 mt-6">
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce animation-delay-100"></div>
              <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce animation-delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`h-screen flex flex-col transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
      }`}
    >
      {/* Enhanced Header */}
      <Header
        isDarkMode={isDarkMode}
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        liveStats={liveStats}
        currentTime={currentTime}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        notificationRef={notificationRef}
        notifications={notifications}
        unreadNotifications={unreadNotifications}
      />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Enhanced Left Sidebar with Social Feed */}
        <Sidebar
          isMobile={isMobile}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isDarkMode={isDarkMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilters={activeFilters}
          toggleFilter={toggleFilter}
          filteredEvents={filteredEvents}
          handleEventSelect={handleEventSelect}
          mobileChatExpanded={mobileChatExpanded}
        />

        {/* Main Map Area - Center Focus */}
        <div className={`flex-1 p-2 md:p-4 lg:p-8 ${isMobile && mobileChatExpanded ? "pb-80" : ""}`}>
          <div
            className={`h-full backdrop-blur-xl rounded-2xl md:rounded-3xl border shadow-2xl overflow-hidden relative transition-all duration-500 ${
              isDarkMode
                ? "bg-gray-900/90 border-gray-600/30 shadow-blue-900/40"
                : "bg-white/70 border-white/30 shadow-blue-500/10"
            }`}
            style={{
              // Mobile performance optimizations
              willChange: 'transform',
              transform: 'translateZ(0)', // Force hardware acceleration
            }}
          >
            {/* Enhanced Map Controls */}
            <div className="absolute top-4 md:top-6 left-4 md:left-6 z-10">
              <Badge
                className={`backdrop-blur-sm border px-3 md:px-4 py-2 shadow-lg font-semibold transition-all duration-300 hover:scale-105 text-xs md:text-sm ${
                  isDarkMode
                    ? "bg-gray-800/90 text-gray-200 border-gray-600/30"
                    : "bg-white/90 text-gray-700 border-white/40"
                }`}
              >
                <Activity className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 animate-pulse" />
                {filteredEvents.length} events visible
              </Badge>
            </div>

            <GoogleMap
              events={filteredEvents}
              selectedEvent={selectedEvent}
              onEventSelect={handleEventSelect}
              eventTypes={eventTypes}
              isDarkMode={isDarkMode}
              zones={mapZones}
            />
          </div>
        </div>

        {/* Right Panel - Chat (Hidden on mobile by default) */}
        <Chat
          isDarkMode={isDarkMode}
          isMobile={isMobile}
          rightPanelCollapsed={rightPanelCollapsed}
          setRightPanelCollapsed={setRightPanelCollapsed}
          chatMessages={chatMessages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          isTyping={isTyping}
          handleSendMessage={handleSendMessage}
          chatMessagesRef={chatMessagesRef}
          mobileChatRef={mobileChatRef}
          mobileChatOpen={mobileChatOpen}
          mobileChatExpanded={mobileChatExpanded}
          setMobileChatExpanded={setMobileChatExpanded}
        />
      </div>

      {/* Enhanced Report Modal */}
      <ReportModal
        isDarkMode={isDarkMode}
        show={showReportModal}
        onClose={() => setShowReportModal(false)}
        reportForm={reportForm}
        setReportForm={setReportForm}
        handleCameraCapture={handleCameraCapture}
        fileInputRef={fileInputRef}
        handleFileUpload={handleFileUpload}
        capturedImage={capturedImage}
        setCapturedImage={setCapturedImage}
        handleSubmitReport={handleSubmitReport}
        eventTypes={eventTypes}
      />
    </div>
  )
}
