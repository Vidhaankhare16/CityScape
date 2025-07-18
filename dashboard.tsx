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

// Mock data with social features
const mockEvents = [
  {
    id: 1,
    type: "traffic",
    title: "Heavy Traffic on Main St",
    location: "Downtown Bridge",
    timestamp: new Date(Date.now() - 5 * 60000),
    severity: "high",
    summary: "Congestion detected causing 15-min delays",
    reporter: {
      name: "Traffic System",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
      followers: 1250,
    },
    coordinates: { x: 45, y: 60 },
    likes: 12,
    comments: 3,
    shares: 2,
    bookmarks: 5,
    image: null,
    tags: ["traffic", "downtown", "urgent"],
    customEmoji: "🚦",
  },
  {
    id: 2,
    type: "emergency",
    title: "Fire Dept Response",
    location: "5th Avenue",
    timestamp: new Date(Date.now() - 12 * 60000),
    severity: "critical",
    summary: "Emergency vehicles dispatched",
    reporter: {
      name: "Emergency Dispatch",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
      followers: 5420,
    },
    coordinates: { x: 65, y: 45 },
    likes: 8,
    comments: 1,
    shares: 15,
    bookmarks: 12,
    image: null,
    tags: ["emergency", "fire", "critical"],
    customEmoji: "🚒",
  },
  {
    id: 3,
    type: "infrastructure",
    title: "Water Main Work",
    location: "Park Avenue",
    timestamp: new Date(Date.now() - 25 * 60000),
    severity: "medium",
    summary: "Scheduled maintenance affecting water pressure",
    reporter: {
      name: "City Works",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
      followers: 890,
    },
    coordinates: { x: 30, y: 35 },
    likes: 5,
    comments: 7,
    shares: 3,
    bookmarks: 8,
    image: null,
    tags: ["infrastructure", "water", "maintenance"],
    customEmoji: "🚰",
  },
  {
    id: 4,
    type: "events",
    title: "Jazz Night",
    location: "Central Park",
    timestamp: new Date(Date.now() - 35 * 60000),
    severity: "low",
    summary: "Live jazz performance at 8 PM",
    reporter: {
      name: "Sarah M.",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: false,
      followers: 234,
    },
    coordinates: { x: 50, y: 40 },
    likes: 24,
    comments: 12,
    shares: 8,
    bookmarks: 18,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["events", "music", "jazz", "entertainment"],
    customEmoji: "🎷",
  },
  {
    id: 5,
    type: "weather",
    title: "Rain Warning",
    location: "Citywide",
    timestamp: new Date(Date.now() - 45 * 60000),
    severity: "medium",
    summary: "Heavy rain expected in 2 hours",
    reporter: {
      name: "Weather Service",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
      followers: 12500,
    },
    coordinates: { x: 75, y: 25 },
    likes: 15,
    comments: 4,
    shares: 22,
    bookmarks: 35,
    image: null,
    tags: ["weather", "rain", "alert"],
    customEmoji: "🌧️",
  },
  {
    id: 6,
    type: "traffic",
    title: "Accident on Highway",
    location: "I-95 North",
    timestamp: new Date(Date.now() - 8 * 60000),
    severity: "high",
    summary: "Multi-vehicle accident blocking 2 lanes",
    reporter: {
      name: "Traffic System",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
      followers: 1250,
    },
    coordinates: { x: 80, y: 70 },
    likes: 18,
    comments: 5,
    shares: 8,
    bookmarks: 12,
    image: null,
    tags: ["traffic", "accident", "highway"],
    customEmoji: "🚨",
  },
  {
    id: 7,
    type: "events",
    title: "Food Festival",
    location: "Riverside Park",
    timestamp: new Date(Date.now() - 20 * 60000),
    severity: "low",
    summary: "Annual food festival with 50+ vendors",
    reporter: {
      name: "City Events",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
      followers: 3200,
    },
    coordinates: { x: 25, y: 80 },
    likes: 45,
    comments: 23,
    shares: 15,
    bookmarks: 28,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["events", "food", "festival"],
    customEmoji: "🍕",
  },
  {
    id: 8,
    type: "infrastructure",
    title: "Power Outage",
    location: "Downtown District",
    timestamp: new Date(Date.now() - 15 * 60000),
    severity: "high",
    summary: "Electrical maintenance causing temporary outages",
    reporter: {
      name: "Power Company",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
      followers: 2100,
    },
    coordinates: { x: 55, y: 55 },
    likes: 32,
    comments: 18,
    shares: 25,
    bookmarks: 15,
    image: null,
    tags: ["infrastructure", "power", "outage"],
    customEmoji: "⚡",
  },
  {
    id: 9,
    type: "events",
    title: "Street Art Festival",
    location: "Arts District",
    timestamp: new Date(Date.now() - 30 * 60000),
    severity: "low",
    summary: "Local artists painting murals and live performances",
    reporter: {
      name: "Arts Council",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
      followers: 1800,
    },
    coordinates: { x: 35, y: 25 },
    likes: 67,
    comments: 34,
    shares: 28,
    bookmarks: 42,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["events", "art", "culture"],
    customEmoji: "🎨",
  },
  {
    id: 10,
    type: "weather",
    title: "Air Quality Alert",
    location: "Industrial Zone",
    timestamp: new Date(Date.now() - 18 * 60000),
    severity: "high",
    summary: "High pollution levels detected in industrial area",
    reporter: {
      name: "Environmental Agency",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
      followers: 8900,
    },
    coordinates: { x: 85, y: 35 },
    likes: 89,
    comments: 45,
    shares: 67,
    bookmarks: 23,
    image: null,
    tags: ["weather", "pollution", "alert"],
    customEmoji: "🌫️",
  },
  {
    id: 11,
    type: "traffic",
    title: "Rush Hour Congestion",
    location: "Business District",
    timestamp: new Date(Date.now() - 10 * 60000),
    severity: "medium",
    summary: "Heavy traffic during evening rush hour",
    reporter: {
      name: "Traffic System",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
      followers: 1250,
    },
    coordinates: { x: 60, y: 40 },
    likes: 23,
    comments: 8,
    shares: 12,
    bookmarks: 7,
    image: null,
    tags: ["traffic", "rush-hour", "congestion"],
    customEmoji: "🚗",
  },
  {
    id: 12,
    type: "emergency",
    title: "Medical Emergency",
    location: "Central Hospital",
    timestamp: new Date(Date.now() - 7 * 60000),
    severity: "critical",
    summary: "Ambulance dispatched to central hospital",
    reporter: {
      name: "Emergency Dispatch",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
      followers: 5420,
    },
    coordinates: { x: 45, y: 75 },
    likes: 12,
    comments: 3,
    shares: 8,
    bookmarks: 5,
    image: null,
    tags: ["emergency", "medical", "ambulance"],
    customEmoji: "🚑",
  },
  {
    id: 13,
    type: "events",
    title: "Community Garden Opening",
    location: "Green Park",
    timestamp: new Date(Date.now() - 40 * 60000),
    severity: "low",
    summary: "New community garden opening with free plants",
    reporter: {
      name: "Green Initiative",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
      followers: 1200,
    },
    coordinates: { x: 20, y: 60 },
    likes: 156,
    comments: 89,
    shares: 234,
    bookmarks: 167,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["events", "community", "garden"],
    customEmoji: "🌱",
  },
  {
    id: 14,
    type: "infrastructure",
    title: "Fiber Optic Installation",
    location: "Tech Hub",
    timestamp: new Date(Date.now() - 22 * 60000),
    severity: "low",
    summary: "High-speed internet infrastructure being installed",
    reporter: {
      name: "Tech Services",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
      followers: 3400,
    },
    coordinates: { x: 70, y: 20 },
    likes: 78,
    comments: 23,
    shares: 45,
    bookmarks: 34,
    image: null,
    tags: ["infrastructure", "internet", "technology"],
    customEmoji: "📡",
  },
  {
    id: 15,
    type: "weather",
    title: "Sunny Day Alert",
    location: "City Parks",
    timestamp: new Date(Date.now() - 35 * 60000),
    severity: "low",
    summary: "Perfect weather for outdoor activities",
    reporter: {
      name: "Weather Service",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
      followers: 12500,
    },
    coordinates: { x: 40, y: 30 },
    likes: 234,
    comments: 67,
    shares: 189,
    bookmarks: 145,
    image: null,
    tags: ["weather", "sunny", "outdoor"],
    customEmoji: "☀️",
  },
  {
    id: 16,
    type: "traffic",
    title: "Bike Lane Construction",
    location: "Riverside Drive",
    timestamp: new Date(Date.now() - 28 * 60000),
    severity: "medium",
    summary: "New bike lanes being constructed for cyclists",
    reporter: {
      name: "City Planning",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
      followers: 2100,
    },
    coordinates: { x: 15, y: 45 },
    likes: 189,
    comments: 45,
    shares: 78,
    bookmarks: 92,
    image: null,
    tags: ["traffic", "bike-lane", "construction"],
    customEmoji: "🚴",
  },
  {
    id: 17,
    type: "emergency",
    title: "Police Activity",
    location: "Shopping District",
    timestamp: new Date(Date.now() - 5 * 60000),
    severity: "medium",
    summary: "Police presence in shopping area for safety",
    reporter: {
      name: "Police Department",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
      followers: 8900,
    },
    coordinates: { x: 50, y: 65 },
    likes: 34,
    comments: 12,
    shares: 23,
    bookmarks: 8,
    image: null,
    tags: ["emergency", "police", "safety"],
    customEmoji: "👮",
  },
  {
    id: 18,
    type: "events",
    title: "Yoga in the Park",
    location: "Zen Garden",
    timestamp: new Date(Date.now() - 50 * 60000),
    severity: "low",
    summary: "Free yoga classes every morning at 7 AM",
    reporter: {
      name: "Wellness Center",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
      followers: 890,
    },
    coordinates: { x: 30, y: 85 },
    likes: 267,
    comments: 89,
    shares: 156,
    bookmarks: 234,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["events", "yoga", "wellness"],
    customEmoji: "🧘",
  },
  {
    id: 19,
    type: "infrastructure",
    title: "Smart Street Lights",
    location: "Innovation District",
    timestamp: new Date(Date.now() - 33 * 60000),
    severity: "low",
    summary: "AI-powered street lights installed for energy efficiency",
    reporter: {
      name: "Smart City Initiative",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
      followers: 5600,
    },
    coordinates: { x: 75, y: 50 },
    likes: 145,
    comments: 34,
    shares: 67,
    bookmarks: 89,
    image: null,
    tags: ["infrastructure", "smart-city", "energy"],
    customEmoji: "💡",
  },
  {
    id: 20,
    type: "weather",
    title: "Wind Advisory",
    location: "Coastal Area",
    timestamp: new Date(Date.now() - 12 * 60000),
    severity: "medium",
    summary: "Strong winds expected in coastal regions",
    reporter: {
      name: "Weather Service",
      avatar: "/placeholder.svg?height=32&width=32",
      verified: true,
      followers: 12500,
    },
    coordinates: { x: 90, y: 80 },
    likes: 45,
    comments: 12,
    shares: 23,
    bookmarks: 15,
    image: null,
    tags: ["weather", "wind", "coastal"],
    customEmoji: "💨",
  },
]

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
  const [selectedEvent, setSelectedEvent] = useState<(typeof mockEvents)[0] | null>(null)
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
  const fileInputRef = useRef<HTMLInputElement>(null)
  const notificationRef = useRef<HTMLDivElement>(null)
  const mobileChatRef = useRef<HTMLDivElement>(null)
  const chatMessagesRef = useRef<HTMLDivElement>(null)

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
    setActiveFilters((prev) => (prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]))
  }

  const filteredEvents = mockEvents.filter(
    (event) =>
      activeFilters.includes(event.type) &&
      (searchQuery === "" || event.location.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "#dc2626"
      case "high":
        return "#ea580c"
      case "medium":
        return "#ca8a04"
      case "low":
        return "#16a34a"
      default:
        return "#6b7280"
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const minutes = Math.floor((Date.now() - timestamp.getTime()) / 60000)
    if (minutes < 1) return "now"
    if (minutes < 60) return `${minutes}m`
    return `${Math.floor(minutes / 60)}h`
  }

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return

    const userMessage = {
      id: Date.now(),
      type: "user",
      message: chatInput,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])
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
            "🛤️ “Sure — based on your current location in Indiranagar, the following nearby metro stations are fully wheelchair accessible with lifts and ramps:\n\nIndiranagar Metro Station (Purple Line) — ✔️ Accessible\n\nHalasuru Metro Station (Purple Line) — ✔️ Accessible\n\nSwami Vivekananda Metro Station (Purple Line) — ❌ Limited access (only one exit has a ramp) .",
          timestamp: new Date(),
        }
        setChatMessages((prev) => [...prev, botMessage])
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

      setChatMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleLikeEvent = (eventId: number) => {
    setLikedEvents((prev) => {
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
    setBookmarkedEvents((prev) => {
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
              setReportForm((prev) => ({ ...prev, image: file }))
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
      setReportForm((prev) => ({ ...prev, image: file }))
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
      <header
        className={`h-16 md:h-20 backdrop-blur-xl border-b flex items-center justify-between px-3 md:px-8 shadow-2xl transition-all duration-500 relative z-50 ${
          isDarkMode
            ? "bg-gray-900/90 border-gray-600/30 shadow-blue-900/40"
            : "bg-white/70 border-white/30 shadow-blue-500/5"
        }`}
      >
        <div className="flex items-center space-x-2 md:space-x-8 flex-1">
          {/* Mobile Menu Button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden w-9 h-9 rounded-xl flex-shrink-0"
            >
              <Menu className="w-4 h-4" />
            </Button>
          )}

          <div className="flex items-center space-x-2 md:space-x-4 group min-w-0">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-lg md:rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/25 group-hover:shadow-2xl group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-110 flex-shrink-0">
              <Activity className="w-4 h-4 md:w-7 md:h-7 text-white animate-pulse" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base md:text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent truncate">
                Urban Pulse
              </h1>
              <p
                className={`text-xs md:text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"} hidden sm:block`}
              >
                City Social Network
              </p>
            </div>
          </div>

          {/* Desktop Quick Stats */}
          <div className="hidden lg:flex items-center space-x-4">
            <div
              className={`flex items-center space-x-2 backdrop-blur-sm px-3 py-2 rounded-xl border shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                isDarkMode
                  ? "bg-gray-800/60 border-gray-600/30 shadow-blue-900/10"
                  : "bg-white/60 border-white/40 shadow-blue-500/5"
              }`}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
              <span className={`text-sm font-semibold ${isDarkMode ? "text-gray-100" : "text-gray-700"}`}>
                {liveStats.activeEvents}
              </span>
            </div>
            <div
              className={`flex items-center space-x-2 backdrop-blur-sm px-3 py-2 rounded-xl border shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                isDarkMode
                  ? "bg-gray-800/60 border-gray-600/30 shadow-blue-900/10"
                  : "bg-white/60 border-white/40 shadow-blue-500/5"
              }`}
            >
              <Users className="w-3 h-3 text-blue-600" />
              <span className={`text-sm font-semibold ${isDarkMode ? "text-gray-100" : "text-gray-700"}`}>
                {Math.floor(liveStats.citizensOnline / 1000)}K
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-6 flex-shrink-0">
          <div
            className={`text-xs md:text-sm font-medium backdrop-blur-sm px-2 md:px-5 py-2 md:py-3 rounded-lg md:rounded-2xl border shadow-lg transition-all duration-300 hover:scale-105 ${
              isDarkMode
                ? "text-gray-100 bg-gray-800/60 border-gray-600/30 shadow-blue-900/10"
                : "text-gray-600 bg-white/60 border-white/40 shadow-blue-500/5"
            }`}
          >
            {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-2xl shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
              isDarkMode ? "hover:bg-gray-700/50" : "hover:bg-white/60"
            }`}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
            ) : (
              <Moon className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            )}
          </Button>

          {/* Enhanced Notifications */}
          <div className="relative" ref={notificationRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-2xl shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
                isDarkMode ? "hover:bg-gray-700/50" : "hover:bg-white/60"
              }`}
            >
              <Bell className={`w-4 h-4 md:w-5 md:h-5 ${showNotifications ? "animate-swing" : ""}`} />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse shadow-lg shadow-red-500/50 flex items-center justify-center">
                  <span className="text-xs text-white font-bold">{unreadNotifications}</span>
                </span>
              )}
            </Button>

            {/* Fixed Notifications Dropdown */}
            {showNotifications && (
              <div
                className={`absolute top-12 md:top-16 right-0 w-80 md:w-96 backdrop-blur-xl rounded-2xl md:rounded-3xl border shadow-2xl p-4 md:p-6 z-[9999] transform transition-all duration-300 animate-slideDown ${
                  isDarkMode
                    ? "bg-gray-800/90 border-gray-600/30 shadow-blue-900/40"
                    : "bg-white/90 border-white/30 shadow-blue-500/10"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-bold text-base md:text-lg ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
                    Notifications
                  </h3>
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 animate-pulse">
                    {unreadNotifications} new
                  </Badge>
                </div>
                <div className="space-y-3 max-h-80 md:max-h-96 overflow-y-auto">
                  {notifications.map((notification, index) => (
                    <div
                      key={notification.id}
                      className={`p-3 md:p-4 rounded-xl md:rounded-2xl border shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md animate-fadeInUp ${
                        notification.type === "emergency"
                          ? "bg-gradient-to-r from-red-50 to-pink-50 border-red-100 dark:from-red-900/20 dark:to-pink-900/20 dark:border-red-800/30"
                          : notification.type === "report"
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100 dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-blue-800/30"
                            : notification.type === "traffic"
                              ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-100 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-800/30"
                              : "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-100 dark:from-amber-900/20 dark:to-orange-900/20 dark:border-amber-800/30"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start space-x-3">
                        {notification.type === "emergency" && (
                          <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-600 mt-0.5 animate-pulse" />
                        )}
                        {notification.type === "report" && (
                          <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mt-0.5" />
                        )}
                        {notification.type === "traffic" && (
                          <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-600 mt-0.5" />
                        )}
                        {notification.type === "weather" && (
                          <Cloud className="w-4 h-4 md:w-5 md:h-5 text-amber-600 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p
                              className={`text-sm font-semibold ${
                                notification.type === "emergency"
                                  ? "text-red-800 dark:text-red-200"
                                  : notification.type === "report"
                                    ? "text-blue-800 dark:text-blue-200"
                                    : notification.type === "traffic"
                                      ? "text-green-800 dark:text-green-200"
                                      : "text-amber-800 dark:text-amber-200"
                              }`}
                            >
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                            )}
                          </div>
                          <p
                            className={`text-xs ${
                              notification.type === "emergency"
                                ? "text-red-600 dark:text-red-300"
                                : notification.type === "report"
                                  ? "text-blue-600 dark:text-blue-300"
                                  : notification.type === "traffic"
                                    ? "text-green-600 dark:text-green-300"
                                    : "text-amber-600 dark:text-amber-300"
                            }`}
                          >
                            {notification.message}
                          </p>
                          <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile - Hidden on mobile */}
          <div
            className={`hidden md:flex items-center space-x-3 backdrop-blur-sm rounded-xl md:rounded-2xl px-3 md:px-5 py-2 md:py-3 border shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              isDarkMode
                ? "bg-gray-800/60 border-gray-600/30 shadow-blue-900/10"
                : "bg-white/60 border-white/40 shadow-blue-500/5"
            }`}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
              <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div>
              <span className={`text-sm font-semibold ${isDarkMode ? "text-gray-100" : "text-gray-700"}`}>Admin</span>
              <p className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Super User</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Enhanced Left Sidebar with Social Feed */}
        <aside
          className={`${
            isMobile
              ? `fixed left-0 top-16 w-80 z-50 transform transition-transform duration-300 ${
                  sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } ${mobileChatExpanded ? "bottom-80" : "bottom-16"}`
              : "w-80 lg:w-96"
          } backdrop-blur-xl border-r flex flex-col shadow-2xl transition-all duration-500 ${
            isDarkMode
              ? "bg-gray-900/90 border-gray-600/30 shadow-blue-900/40"
              : "bg-white/70 border-white/30 shadow-blue-500/5"
          }`}
        >
          <div className="flex-1 overflow-y-auto">
            <div className={`p-4 md:p-6 lg:p-8 ${isMobile ? "pb-8" : ""}`}>
              {/* Enhanced Search */}
              <div className="relative mb-6 md:mb-8 group">
                <Search className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                <Input
                  placeholder="Search locations, events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-12 md:pl-14 pr-4 md:pr-6 py-3 md:py-4 backdrop-blur-sm border focus:border-blue-400 focus:ring-blue-400/20 rounded-xl md:rounded-2xl h-12 md:h-14 text-sm md:text-base font-medium shadow-lg transition-all duration-300 hover:shadow-xl focus:shadow-xl focus:scale-[1.02] ${
                    isDarkMode
                      ? "bg-gray-800/60 border-gray-600/30 text-gray-200 placeholder-gray-400"
                      : "bg-white/60 border-white/40 shadow-blue-500/5"
                  }`}
                />
                <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Social Event Feed */}
              <div className="mb-6 md:mb-8">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h3
                    className={`text-base md:text-lg font-bold flex items-center ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
                  >
                    <TrendingUp className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-blue-500 animate-pulse" />
                    Live Feed
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-xs px-2 py-1 rounded-lg ${isDarkMode ? "text-gray-300 hover:text-gray-100" : "text-gray-600 hover:text-gray-800"}`}
                  >
                    <Filter className="w-3 h-3 mr-1" />
                    Filter
                  </Button>
                </div>

                <div className="space-y-4">
                  {filteredEvents.slice(0, 3).map((event, index) => (
                    <div
                      key={event.id}
                      className={`backdrop-blur-sm rounded-xl md:rounded-2xl border shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl animate-fadeInUp overflow-hidden ${
                        isDarkMode
                          ? "bg-gray-800/60 border-gray-600/30 shadow-blue-900/10"
                          : "bg-white/60 border-white/40 shadow-blue-500/5"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Event Header */}
                      <div className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-sm">{event.reporter.name.charAt(0)}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span
                                className={`font-semibold text-sm ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
                              >
                                {event.reporter.name}
                              </span>
                              {event.reporter.verified && (
                                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs">✓</span>
                                </div>
                              )}
                            </div>
                            <p className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                              {formatTimeAgo(event.timestamp)} • {event.location}
                            </p>
                          </div>
                          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>

                        <h4 className={`font-bold text-sm mb-2 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
                          {event.title}
                        </h4>
                        <p className={`text-xs mb-3 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                          {event.summary}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {event.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              className={`text-xs px-2 py-1 ${
                                isDarkMode
                                  ? "bg-gray-700/60 text-gray-300 hover:bg-gray-600/60"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Event Image */}
                        {event.image && (
                          <div className="mb-3 rounded-lg overflow-hidden">
                            <img
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              className="w-full h-32 object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        )}

                        {/* Social Actions */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-200/20">
                          <div className="flex items-center space-x-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLikeEvent(event.id)}
                              className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-lg transition-all duration-300 ${
                                likedEvents.has(event.id)
                                  ? "text-red-500 bg-red-50 dark:bg-red-900/20"
                                  : isDarkMode
                                    ? "text-gray-400 hover:text-red-400"
                                    : "text-gray-500 hover:text-red-500"
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${likedEvents.has(event.id) ? "fill-current" : ""}`} />
                              <span>{event.likes + (likedEvents.has(event.id) ? 1 : 0)}</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-lg ${
                                isDarkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-500 hover:text-blue-500"
                              }`}
                            >
                              <MessageCircle className="w-4 h-4" />
                              <span>{event.comments}</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-lg ${
                                isDarkMode ? "text-gray-400 hover:text-green-400" : "text-gray-500 hover:text-green-500"
                              }`}
                            >
                              <Share2 className="w-4 h-4" />
                              <span>{event.shares}</span>
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleBookmarkEvent(event.id)}
                            className={`p-1 rounded-lg transition-all duration-300 ${
                              bookmarkedEvents.has(event.id)
                                ? "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                                : isDarkMode
                                  ? "text-gray-400 hover:text-yellow-400"
                                  : "text-gray-500 hover:text-yellow-500"
                            }`}
                          >
                            <Bookmark className={`w-4 h-4 ${bookmarkedEvents.has(event.id) ? "fill-current" : ""}`} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ultra-Modern Event Type Filters */}
              <div className="mb-6 md:mb-8">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h3
                    className={`text-base md:text-lg font-bold flex items-center ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
                  >
                    <Layers className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-blue-500 animate-pulse" />
                    Categories
                  </h3>
                </div>
                <div className="space-y-3 md:space-y-4">
                  {eventTypes.map((type, index) => {
                    const Icon = type.icon
                    const isActive = activeFilters.includes(type.id)
                    const eventCount = mockEvents.filter((e) => e.type === type.id).length
                    return (
                      <button
                        key={type.id}
                        onClick={() => toggleFilter(type.id)}
                        className={`w-full group relative overflow-hidden rounded-xl md:rounded-2xl transition-all duration-500 hover:scale-[1.02] animate-fadeInUp ${
                          isActive
                            ? `bg-gradient-to-r ${type.gradient} shadow-2xl shadow-${type.color}/30 transform scale-[1.02]`
                            : isDarkMode
                              ? `bg-gradient-to-r ${type.darkBg} hover:shadow-xl border border-gray-600/30`
                              : `bg-gradient-to-r ${type.lightBg} hover:shadow-xl border border-white/40`
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full -translate-y-10 translate-x-10"></div>
                          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
                        </div>

                        <div className="relative p-4 md:p-6">
                          <div className="flex items-center justify-between mb-3 md:mb-4">
                            <div className="flex items-center space-x-3 md:space-x-4">
                              <div
                                className={`p-2 md:p-3 rounded-xl md:rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${
                                  isActive
                                    ? "bg-white/20 shadow-lg"
                                    : isDarkMode
                                      ? "bg-gray-800/60 shadow-md"
                                      : "bg-white/80 shadow-md"
                                }`}
                              >
                                <Icon
                                  className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? "text-white" : isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                                />
                              </div>
                              <div className="text-left">
                                <h4
                                  className={`font-bold text-sm md:text-base ${isActive ? "text-white" : isDarkMode ? "text-gray-100" : "text-gray-900"}`}
                                >
                                  {type.label}
                                </h4>
                                <p
                                  className={`text-xs ${isActive ? "text-white/80" : isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                                >
                                  {type.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                className={`font-bold px-2 py-1 transition-all duration-300 text-xs ${
                                  isActive
                                    ? "bg-white/20 text-white shadow-lg"
                                    : isDarkMode
                                      ? "bg-gray-800/80 text-gray-200 shadow-md"
                                      : "bg-white/80 text-gray-700 shadow-md"
                                }`}
                              >
                                {eventCount}
                              </Badge>
                              {isActive && (
                                <div className="flex space-x-1">
                                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                  <div className="w-1.5 h-1.5 bg-white/70 rounded-full animate-pulse animation-delay-100"></div>
                                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse animation-delay-200"></div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div
                            className={`w-full h-1 rounded-full overflow-hidden ${isActive ? "bg-white/20" : isDarkMode ? "bg-gray-700/50" : "bg-gray-200/50"}`}
                          >
                            <div
                              className={`h-full transition-all duration-1000 ${isActive ? "bg-white/60" : "bg-gradient-to-r " + type.gradient}`}
                              style={{ width: `${Math.min(100, (eventCount / 15) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Enhanced Report Button */}
              <Button
                onClick={() => {
                  setShowReportModal(true)
                  if (isMobile) setSidebarOpen(false)
                }}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white mb-6 md:mb-8 h-12 md:h-14 rounded-xl md:rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 font-semibold text-sm md:text-base hover:scale-[1.02] group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <Camera className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 group-hover:animate-bounce relative z-10" />
                <span className="relative z-10">Report New Event</span>
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 ml-2 animate-pulse relative z-10" />
              </Button>

              {/* Live Statistics */}
              <div className="mb-6 md:mb-8">
                <h3
                  className={`text-base md:text-lg font-bold mb-4 md:mb-5 flex items-center ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
                >
                  <BarChart3 className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-blue-500 animate-pulse" />
                  Live Statistics
                </h3>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {[
                    {
                      icon: Activity,
                      value: liveStats.activeEvents,
                      label: "Active Events",
                      color: "blue",
                      gradient: "from-blue-500 to-indigo-600",
                      lightBg: "from-blue-50 to-indigo-100",
                      darkBg: "from-blue-950/50 to-indigo-950/50",
                    },
                    {
                      icon: Users,
                      value: `${Math.floor(liveStats.citizensOnline / 1000)}K`,
                      label: "Citizens Online",
                      color: "emerald",
                      gradient: "from-emerald-500 to-green-600",
                      lightBg: "from-emerald-50 to-green-100",
                      darkBg: "from-emerald-950/50 to-green-950/50",
                    },
                    {
                      icon: AlertTriangle,
                      value: liveStats.alertsToday,
                      label: "Alerts Sent",
                      color: "amber",
                      gradient: "from-amber-500 to-orange-600",
                      lightBg: "from-amber-50 to-orange-100",
                      darkBg: "from-amber-950/50 to-orange-950/50",
                    },
                    {
                      icon: Clock,
                      value: liveStats.responseTime.toFixed(1),
                      label: "Response Time",
                      color: "purple",
                      gradient: "from-purple-500 to-pink-600",
                      lightBg: "from-purple-50 to-pink-100",
                      darkBg: "from-purple-950/50 to-pink-950/50",
                    },
                  ].map((stat, index) => (
                    <div
                      key={stat.label}
                      className={`bg-gradient-to-br rounded-xl md:rounded-2xl p-4 md:p-5 border shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fadeInUp group relative overflow-hidden ${
                        isDarkMode
                          ? "bg-gray-800/40 border-gray-600/30"
                          : `${stat.lightBg} border-${stat.color}-100`
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Background Pattern */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>

                      <div className="relative">
                        <div className="flex items-center justify-between mb-2 md:mb-3">
                          <stat.icon
                            className={`w-5 h-5 md:w-6 md:h-6 text-${stat.color}-600 group-hover:animate-bounce`}
                          />
                          <span
                            className={`text-xs font-bold px-2 py-1 rounded-full ${
                              stat.label === "Active Events"
                                ? `text-${stat.color}-600 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 dark:text-${stat.color}-300`
                                : stat.label === "Citizens Online"
                                  ? "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300"
                                  : stat.label === "Alerts Sent"
                                    ? "text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300"
                                    : "text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300"
                            }`}
                          >
                            {stat.label === "Active Events"
                              ? "LIVE"
                              : stat.label === "Alerts Sent"
                                ? "TODAY"
                                : stat.label === "Response Time"
                                  ? "AVG"
                                  : "ONLINE"}
                          </span>
                        </div>
                        <p
                          className={`text-xl md:text-2xl font-black ${
                            isDarkMode ? `text-${stat.color}-200` : `text-${stat.color}-900`
                          } group-hover:scale-110 transition-transform duration-300`}
                        >
                          {stat.value}
                        </p>
                        <p
                          className={`text-xs font-semibold ${
                            isDarkMode ? `text-${stat.color}-300` : `text-${stat.color}-600`
                          }`}
                        >
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Locations */}
              <div className="mb-6 md:mb-8">
                <h3
                  className={`text-base md:text-lg font-bold mb-4 md:mb-5 flex items-center ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
                >
                  <Flame className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-orange-500 animate-pulse" />
                  Trending Locations
                </h3>
                <div className="space-y-3">
                  {trendingLocations.map((location, index) => (
                    <div
                      key={location.name}
                      className={`flex items-center justify-between p-3 md:p-4 backdrop-blur-sm rounded-xl md:rounded-2xl border shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl animate-fadeInUp group ${
                        isDarkMode
                          ? "bg-gray-800/60 border-gray-600/30 shadow-blue-900/10"
                          : "bg-white/60 border-white/40 shadow-blue-500/5"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center space-x-3 md:space-x-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:animate-bounce">
                          {index + 1}
                        </div>
                        <div>
                          <p
                            className={`font-semibold text-sm md:text-base ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
                          >
                            {location.name}
                          </p>
                          <p className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                            {location.events} events
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={`font-bold transition-all duration-300 group-hover:scale-110 text-xs ${
                            location.change === "up"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                          }`}
                        >
                          {location.trend}
                        </Badge>
                        {location.change === "up" ? (
                          <ArrowUp className="w-3 h-3 text-green-600" />
                        ) : (
                          <ArrowDown className="w-3 h-3 text-red-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3
                  className={`text-base md:text-lg font-bold mb-4 md:mb-5 flex items-center ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
                >
                  <Eye className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-green-500 animate-pulse" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => {
                    const typeConfig = eventTypes.find((t) => t.id === activity.type)
                    return (
                      <div
                        key={index}
                        className={`flex items-start space-x-3 p-3 md:p-4 backdrop-blur-sm rounded-xl md:rounded-2xl border shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl animate-fadeInUp ${
                          isDarkMode
                            ? "bg-gray-800/60 border-gray-600/30 shadow-blue-900/10"
                            : "bg-white/60 border-white/40 shadow-blue-500/5"
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div
                          className={`w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r ${typeConfig?.gradient || "from-blue-400 to-purple-500"} rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg transition-all duration-300 hover:scale-110`}
                        >
                          {activity.user.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
                            <span className="font-semibold">{activity.user}</span> {activity.action}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <p
                              className={`text-xs flex items-center ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                            >
                              <MapPin className="w-3 h-3 mr-1" />
                              {activity.location}
                            </p>
                            <span className={`text-xs ${isDarkMode ? "text-gray-600" : "text-gray-500"}`}>
                              {activity.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </aside>

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
        <div
          className={`${
            isMobile ? "hidden" : rightPanelCollapsed ? "w-16" : "w-80 lg:w-96"
          } backdrop-blur-xl border-l flex flex-col transition-all duration-300 relative shadow-2xl ${
            isDarkMode
              ? "bg-gray-900/90 border-gray-600/30 shadow-blue-900/40"
              : "bg-white/70 border-white/30 shadow-blue-500/5"
          }`}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}
            className={`absolute -left-4 top-6 z-10 backdrop-blur-sm shadow-xl hover:shadow-2xl rounded-full w-8 h-8 border transition-all duration-300 hover:scale-110 ${
              isDarkMode
                ? "bg-gray-800/90 border-gray-600/30 hover:bg-gray-700/90"
                : "bg-white/90 border-white/40 hover:bg-white"
            }`}
          >
            <ChevronRight
              className={`w-4 h-4 transition-transform duration-300 ${rightPanelCollapsed ? "" : "rotate-180"}`}
            />
          </Button>

          {!rightPanelCollapsed && (
            <>
              {/* Enhanced Chat Header */}
              <div
                className={`p-6 md:p-8 border-b transition-all duration-500 ${isDarkMode ? "border-gray-600/30" : "border-white/30"}`}
              >
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/25 group-hover:shadow-2xl group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-110">
                    <Bot className="w-7 h-7 text-white animate-pulse" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
                      City Assistant
                    </h3>
                    <p className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                      Ask anything about your city
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                  </div>
                </div>
              </div>

              {/* Enhanced Chat Messages */}
              <div ref={chatMessagesRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                {chatMessages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex animate-fadeInUp ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={`max-w-[85%] rounded-3xl px-6 py-4 shadow-lg transition-all duration-300 hover:scale-[1.02] ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-blue-500/25"
                          : isDarkMode
                            ? "bg-gray-800/80 backdrop-blur-sm text-gray-100 border border-gray-600/30 shadow-blue-900/10"
                            : "bg-white/80 backdrop-blur-sm text-gray-900 border border-white/40 shadow-blue-500/5"
                      }`}
                    >
                      <p className="text-sm leading-relaxed font-medium">{message.message}</p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div
                      className={`backdrop-blur-sm rounded-3xl px-6 py-4 border shadow-lg ${
                        isDarkMode
                          ? "bg-gray-800/80 border-gray-600/30 shadow-blue-900/10"
                          : "bg-white/80 border-white/40 shadow-blue-500/5"
                      }`}
                    >
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Chat Input */}
              <div
                className={`p-6 md:p-8 border-t transition-all duration-500 ${isDarkMode ? "border-gray-600/30" : "border-white/30"}`}
              >
                <div className="flex space-x-4">
                  <Input
                    placeholder="Ask about traffic, events..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className={`flex-1 backdrop-blur-sm border focus:border-blue-400 focus:ring-blue-400/20 rounded-2xl h-12 font-medium shadow-lg transition-all duration-300 hover:shadow-xl focus:shadow-xl focus:scale-[1.02] ${
                      isDarkMode
                        ? "bg-gray-800/60 border-gray-600/30 text-gray-200 placeholder-gray-400"
                        : "bg-white/60 border-white/40 shadow-blue-500/5"
                    }`}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim() || isTyping}
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 rounded-2xl w-12 h-12 p-0 shadow-xl shadow-blue-500/25 transition-all duration-300 hover:scale-110 group"
                  >
                    <Send className="w-5 h-5 group-hover:animate-pulse" />
                  </Button>
                </div>
              </div>
            </>
          )}

          {rightPanelCollapsed && (
            <div className="p-4 flex flex-col items-center space-y-6 mt-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/25 transition-all duration-300 hover:scale-110">
                <Bot className="w-7 h-7 text-white animate-pulse" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Chat Bar */}
      {isMobile && (
        <div
          ref={mobileChatRef}
          className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${
            mobileChatExpanded ? "h-80" : "h-16"
          }`}
        >
          {/* Chat Bar */}
          <div
            className={`backdrop-blur-xl border-t shadow-2xl transition-all duration-500 ${
              isDarkMode
                ? "bg-gray-900/90 border-gray-600/30 shadow-blue-900/40"
                : "bg-white/90 border-white/30 shadow-blue-500/10"
            } ${mobileChatExpanded ? "h-full" : "h-16"}`}
          >
            {/* Chat Header Bar */}
            <div
              className="h-16 flex items-center justify-between px-4 cursor-pointer"
              onClick={() => setMobileChatExpanded(!mobileChatExpanded)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Bot className="w-6 h-6 text-white animate-pulse" />
                </div>
                <div>
                  <h3 className={`font-bold text-sm ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
                    City Assistant
                  </h3>
                  <p className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {isTyping ? "Typing..." : "Ask me anything"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg">
                  {mobileChatExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Expanded Chat Content */}
            {mobileChatExpanded && (
              <div className="flex flex-col h-64">
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-lg ${
                          message.type === "user"
                            ? "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white"
                            : isDarkMode
                              ? "bg-gray-800/80 text-gray-100 border border-gray-600/30"
                              : "bg-white/80 text-gray-900 border border-white/40"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.message}</p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div
                        className={`rounded-2xl px-4 py-3 border shadow-lg ${
                          isDarkMode ? "bg-gray-800/80 border-gray-600/30" : "bg-white/80 border-white/40"
                        }`}
                      >
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-gray-200/20">
                  <div className="flex space-x-3">
                    <Input
                      placeholder="Ask about traffic, events..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className={`flex-1 rounded-xl h-10 text-sm ${
                        isDarkMode
                          ? "bg-gray-800/60 border-gray-600/30 text-gray-200 placeholder-gray-400"
                          : "bg-white/60 border-white/40"
                      }`}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!chatInput.trim() || isTyping}
                      className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 rounded-xl w-10 h-10 p-0 shadow-lg"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Enhanced Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div
            className={`w-full max-w-2xl backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl border transition-all duration-500 animate-slideUp max-h-[90vh] overflow-y-auto ${
              isDarkMode ? "bg-gray-800/90 border-gray-600/30" : "bg-white/90 border-white/30"
            }`}
          >
            <div className={`p-6 md:p-8 border-b ${isDarkMode ? "border-gray-600/30" : "border-white/30"}`}>
              <div className="flex items-center justify-between">
                <h2 className={`text-xl md:text-2xl font-bold ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
                  Report New Event
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowReportModal(false)}
                  className="rounded-2xl transition-all duration-300 hover:scale-110"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </Button>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6 md:space-y-8">
              <div className="group">
                <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? "text-gray-100" : "text-gray-700"}`}>
                  Event Title
                </label>
                <Input
                  value={reportForm.title}
                  onChange={(e) => setReportForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="What's happening?"
                  className={`backdrop-blur-sm border rounded-xl md:rounded-2xl h-12 font-medium shadow-lg transition-all duration-300 hover:shadow-xl focus:shadow-xl focus:scale-[1.02] group-focus-within:border-blue-400 ${
                    isDarkMode
                      ? "bg-gray-700/60 border-gray-600/40 text-gray-200 placeholder-gray-400"
                      : "bg-white/60 border-white/40 shadow-blue-500/5"
                  }`}
                />
              </div>

              <div className="group">
                <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? "text-gray-100" : "text-gray-700"}`}>
                  Description
                </label>
                <Textarea
                  value={reportForm.description}
                  onChange={(e) => setReportForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the event in detail..."
                  className={`backdrop-blur-sm border rounded-xl md:rounded-2xl min-h-[120px] font-medium shadow-lg transition-all duration-300 hover:shadow-xl focus:shadow-xl focus:scale-[1.02] group-focus-within:border-blue-400 ${
                    isDarkMode
                      ? "bg-gray-700/60 border-gray-600/40 text-gray-200 placeholder-gray-400"
                      : "bg-white/60 border-white/40 shadow-blue-500/5"
                  }`}
                />
              </div>

              <div className="group">
                <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? "text-gray-100" : "text-gray-700"}`}>
                  Event Type
                </label>
                <select
                  value={reportForm.type}
                  onChange={(e) => setReportForm((prev) => ({ ...prev, type: e.target.value }))}
                  className={`w-full p-4 backdrop-blur-sm border rounded-xl md:rounded-2xl focus:border-blue-400 focus:ring-blue-400/20 font-medium shadow-lg transition-all duration-300 hover:shadow-xl focus:shadow-xl focus:scale-[1.02] ${
                    isDarkMode
                      ? "bg-gray-700/60 border-gray-600/40 text-gray-200"
                      : "bg-white/60 border-white/40 shadow-blue-500/5"
                  }`}
                >
                  {eventTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? "text-gray-100" : "text-gray-700"}`}>
                  Add Photo
                </label>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button
                    type="button"
                    onClick={handleCameraCapture}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl md:rounded-2xl h-12 md:h-14 font-semibold shadow-xl shadow-green-500/25 transition-all duration-300 hover:scale-[1.02] group"
                  >
                    <Camera className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 group-hover:animate-bounce" />
                    Take Photo
                  </Button>
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className={`flex-1 rounded-xl md:rounded-2xl h-12 md:h-14 font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] group ${
                      isDarkMode
                        ? "border-gray-600/40 hover:bg-gray-700/60"
                        : "border-white/40 hover:bg-white/60 shadow-blue-500/5"
                    }`}
                  >
                    <Upload className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 group-hover:animate-bounce" />
                    Upload File
                  </Button>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </div>

              {capturedImage && (
                <div className="relative animate-fadeIn">
                  <img
                    src={capturedImage || "/placeholder.svg"}
                    alt="Captured"
                    className="w-full h-48 md:h-64 object-cover rounded-xl md:rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  />
                  <Button
                    onClick={() => {
                      setCapturedImage(null)
                      setReportForm((prev) => ({ ...prev, image: null }))
                    }}
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>

            <div
              className={`p-6 md:p-8 border-t flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 ${isDarkMode ? "border-gray-600/30" : "border-white/30"}`}
            >
              <Button
                variant="outline"
                onClick={() => setShowReportModal(false)}
                className={`flex-1 rounded-xl md:rounded-2xl h-12 md:h-14 font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] ${
                  isDarkMode
                    ? "border-gray-600/40 hover:bg-gray-700/60"
                    : "border-white/40 hover:bg-white/60 shadow-blue-500/5"
                }`}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitReport}
                className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white rounded-xl md:rounded-2xl h-12 md:h-14 font-semibold shadow-xl shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] group"
              >
                Submit Report
                <ZapIcon className="w-4 h-4 ml-2 group-hover:animate-pulse" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
