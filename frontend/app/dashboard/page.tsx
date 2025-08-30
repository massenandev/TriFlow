"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Waves,
  Bike,
  Zap,
  Clock,
  Target,
  TrendingUp,
  Settings,
  Plus,
} from "lucide-react"

interface TrainingSession {
  id: string
  type: "swim" | "bike" | "run" | "rest" | "brick"
  title: string
  duration: number
  intensity: "easy" | "moderate" | "high" | "recovery"
  completed: boolean
  date: string
  notes?: string
}

const mockSessions: TrainingSession[] = [
  {
    id: "1",
    type: "swim",
    title: "Technique Focus",
    duration: 60,
    intensity: "moderate",
    completed: true,
    date: "2024-01-15",
    notes: "Focus on catch and pull technique",
  },
  {
    id: "2",
    type: "bike",
    title: "Interval Training",
    duration: 90,
    intensity: "high",
    completed: false,
    date: "2024-01-16",
    notes: "5x5min @ FTP",
  },
  {
    id: "3",
    type: "run",
    title: "Easy Recovery",
    duration: 45,
    intensity: "easy",
    completed: false,
    date: "2024-01-17",
    notes: "Zone 1-2 heart rate",
  },
  {
    id: "4",
    type: "swim",
    title: "Speed Work",
    duration: 75,
    intensity: "high",
    completed: false,
    date: "2024-01-18",
    notes: "8x100m @ race pace",
  },
  {
    id: "5",
    type: "rest",
    title: "Active Recovery",
    duration: 0,
    intensity: "recovery",
    completed: false,
    date: "2024-01-19",
    notes: "Stretching and mobility",
  },
  {
    id: "6",
    type: "brick",
    title: "Bike-Run Brick",
    duration: 120,
    intensity: "moderate",
    completed: false,
    date: "2024-01-20",
    notes: "60min bike + 30min run",
  },
  {
    id: "7",
    type: "run",
    title: "Long Run",
    duration: 90,
    intensity: "moderate",
    completed: false,
    date: "2024-01-21",
    notes: "Build endurance",
  },
]

export default function DashboardPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedSession, setSelectedSession] = useState<TrainingSession | null>(null)

  const getSessionIcon = (type: string) => {
    switch (type) {
      case "swim":
        return <Waves className="h-4 w-4 text-blue-500" />
      case "bike":
        return <Bike className="h-4 w-4 text-orange-500" />
      case "run":
        return <Zap className="h-4 w-4 text-yellow-500" />
      case "brick":
        return <Target className="h-4 w-4 text-purple-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "moderate":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      case "recovery":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getSessionsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return mockSessions.filter((session) => session.date === dateString)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth(currentDate)
  const today = new Date()
  const todaySessions = getSessionsForDate(today)
  const completedThisWeek = mockSessions.filter((s) => s.completed).length
  const totalThisWeek = mockSessions.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Waves className="h-6 w-6 text-blue-500" />
                <Bike className="h-6 w-6 text-orange-500" />
                <Zap className="h-6 w-6 text-yellow-500" />
              </div>
              <h1 className="text-xl font-bold">TriFlow</h1>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Session
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/athlete-profile.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Stats */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Completed</span>
                  <span className="font-semibold">
                    {completedThisWeek}/{totalThisWeek}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(completedThisWeek / totalThisWeek) * 100}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <Waves className="h-4 w-4 text-blue-500 mx-auto mb-1" />
                    <div className="text-xs text-muted-foreground">Swim</div>
                    <div className="font-semibold">2.5h</div>
                  </div>
                  <div>
                    <Bike className="h-4 w-4 text-orange-500 mx-auto mb-1" />
                    <div className="text-xs text-muted-foreground">Bike</div>
                    <div className="font-semibold">4.5h</div>
                  </div>
                  <div>
                    <Zap className="h-4 w-4 text-yellow-500 mx-auto mb-1" />
                    <div className="text-xs text-muted-foreground">Run</div>
                    <div className="font-semibold">3.0h</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Race Goal</span>
                    <span className="font-semibold">Olympic</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Target Date</span>
                    <span className="font-semibold">Jun 15</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Weeks Left</span>
                    <span className="font-semibold text-orange-600">18</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today's Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today</CardTitle>
              </CardHeader>
              <CardContent>
                {todaySessions.length > 0 ? (
                  <div className="space-y-3">
                    {todaySessions.map((session) => (
                      <div key={session.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        {getSessionIcon(session.type)}
                        <div className="flex-1">
                          <div className="font-medium text-sm">{session.title}</div>
                          <div className="text-xs text-muted-foreground">{session.duration}min</div>
                        </div>
                        <Badge variant="secondary" className={getIntensityColor(session.intensity)}>
                          {session.intensity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No sessions scheduled</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Calendar */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                      Today
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => {
                    if (!day) {
                      return <div key={index} className="p-2 h-24" />
                    }

                    const sessions = getSessionsForDate(day)
                    const isToday = day.toDateString() === today.toDateString()
                    const isPast = day < today

                    return (
                      <div
                        key={day.toISOString()}
                        className={`p-2 h-24 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                          isToday ? "bg-blue-50 border-blue-200" : "border-gray-200"
                        }`}
                        onClick={() => sessions.length > 0 && setSelectedSession(sessions[0])}
                      >
                        <div
                          className={`text-sm font-medium mb-1 ${
                            isToday ? "text-blue-600" : isPast ? "text-muted-foreground" : "text-foreground"
                          }`}
                        >
                          {day.getDate()}
                        </div>
                        <div className="space-y-1">
                          {sessions.slice(0, 2).map((session) => (
                            <div
                              key={session.id}
                              className={`flex items-center gap-1 text-xs p-1 rounded ${
                                session.completed ? "bg-green-100 text-green-800" : "bg-white border"
                              }`}
                            >
                              {getSessionIcon(session.type)}
                              <span className="truncate">{session.duration}m</span>
                            </div>
                          ))}
                          {sessions.length > 2 && (
                            <div className="text-xs text-muted-foreground">+{sessions.length - 2} more</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Session Details */}
            {selectedSession && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getSessionIcon(selectedSession.type)}
                    {selectedSession.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Duration</div>
                      <div className="font-semibold">{selectedSession.duration} minutes</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Intensity</div>
                      <Badge className={getIntensityColor(selectedSession.intensity)}>
                        {selectedSession.intensity}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Type</div>
                      <div className="font-semibold capitalize">{selectedSession.type}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Status</div>
                      <div
                        className={`font-semibold ${selectedSession.completed ? "text-green-600" : "text-orange-600"}`}
                      >
                        {selectedSession.completed ? "Completed" : "Scheduled"}
                      </div>
                    </div>
                  </div>
                  {selectedSession.notes && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Notes</div>
                      <p className="text-sm bg-gray-50 p-3 rounded-lg">{selectedSession.notes}</p>
                    </div>
                  )}
                  <div className="flex gap-2 mt-4">
                    {!selectedSession.completed && (
                      <Button size="sm" className="bg-gradient-to-r from-blue-600 to-orange-600">
                        Mark Complete
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Edit Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
