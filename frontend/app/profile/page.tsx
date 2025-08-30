"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Waves,
  Bike,
  Zap,
  Camera,
  Edit,
  Save,
  X,
  Trophy,
  Target,
  Calendar,
  Clock,
  TrendingUp,
  Award,
  MapPin,
  Mail,
  Phone,
} from "lucide-react"

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  location: string
  bio: string
  profileImage: string
  joinDate: string
  goals: {
    targetRace: string
    targetDate: string
    targetTime: string
  }
  stats: {
    totalSessions: number
    totalHours: number
    completionRate: number
    currentStreak: number
  }
  achievements: Array<{
    id: string
    title: string
    description: string
    date: string
    type: "swim" | "bike" | "run" | "general"
  }>
  personalBests: {
    swim: { distance: string; time: string; date: string }
    bike: { distance: string; time: string; date: string }
    run: { distance: string; time: string; date: string }
  }
}

const mockProfile: UserProfile = {
  id: "user-123",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  bio: "Passionate triathlete training for my first Ironman. Love the challenge of balancing three disciplines and pushing my limits every day.",
  profileImage: "/athlete-profile.png",
  joinDate: "2024-01-01",
  goals: {
    targetRace: "Olympic Triathlon",
    targetDate: "2024-06-15",
    targetTime: "2:30:00",
  },
  stats: {
    totalSessions: 156,
    totalHours: 234,
    completionRate: 87,
    currentStreak: 12,
  },
  achievements: [
    {
      id: "1",
      title: "First Century",
      description: "Completed 100km bike ride",
      date: "2024-01-10",
      type: "bike",
    },
    {
      id: "2",
      title: "Swimming Milestone",
      description: "Swam 2km without stopping",
      date: "2024-01-05",
      type: "swim",
    },
    {
      id: "3",
      title: "Consistency Champion",
      description: "10 day training streak",
      date: "2024-01-12",
      type: "general",
    },
  ],
  personalBests: {
    swim: { distance: "1500m", time: "28:45", date: "2024-01-08" },
    bike: { distance: "40km", time: "1:15:30", date: "2024-01-11" },
    run: { distance: "10km", time: "45:20", date: "2024-01-09" },
  },
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<UserProfile>(mockProfile)

  const handleSave = async () => {
    // This would connect to your Node.js backend
    console.log("[v0] Saving profile:", editedProfile)
    setProfile(editedProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const updateEditedProfile = (field: string, value: any) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateNestedField = (parent: string, field: string, value: any) => {
    setEditedProfile((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof UserProfile],
        [field]: value,
      },
    }))
  }

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case "swim":
        return <Waves className="h-4 w-4 text-blue-500" />
      case "bike":
        return <Bike className="h-4 w-4 text-orange-500" />
      case "run":
        return <Zap className="h-4 w-4 text-yellow-500" />
      default:
        return <Trophy className="h-4 w-4 text-purple-500" />
    }
  }

  const daysUntilRace = Math.ceil(
    (new Date(profile.goals.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )

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
              {isEditing ? (
                <>
                  <Button onClick={handleSave} size="sm" className="bg-gradient-to-r from-blue-600 to-orange-600">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm">
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <Avatar className="h-24 w-24 mx-auto">
                      <AvatarImage src={profile.profileImage || "/placeholder.svg"} />
                      <AvatarFallback className="text-lg">
                        {profile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="mt-4">
                    {isEditing ? (
                      <Input
                        value={editedProfile.name}
                        onChange={(e) => updateEditedProfile("name", e.target.value)}
                        className="text-center font-semibold text-lg"
                      />
                    ) : (
                      <h2 className="text-xl font-semibold">{profile.name}</h2>
                    )}
                  </div>

                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {isEditing ? (
                        <Input
                          value={editedProfile.email}
                          onChange={(e) => updateEditedProfile("email", e.target.value)}
                          className="text-sm"
                        />
                      ) : (
                        <span>{profile.email}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {isEditing ? (
                        <Input
                          value={editedProfile.phone}
                          onChange={(e) => updateEditedProfile("phone", e.target.value)}
                          className="text-sm"
                        />
                      ) : (
                        <span>{profile.phone}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {isEditing ? (
                        <Input
                          value={editedProfile.location}
                          onChange={(e) => updateEditedProfile("location", e.target.value)}
                          className="text-sm"
                        />
                      ) : (
                        <span>{profile.location}</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    {isEditing ? (
                      <Textarea
                        value={editedProfile.bio}
                        onChange={(e) => updateEditedProfile("bio", e.target.value)}
                        placeholder="Tell us about yourself..."
                        rows={3}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{profile.bio}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Training Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{profile.stats.totalSessions}</div>
                    <div className="text-xs text-muted-foreground">Total Sessions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{profile.stats.totalHours}h</div>
                    <div className="text-xs text-muted-foreground">Total Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{profile.stats.completionRate}%</div>
                    <div className="text-xs text-muted-foreground">Completion Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{profile.stats.currentStreak}</div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Goal Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Current Goal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="targetRace">Target Race</Label>
                      <Input
                        id="targetRace"
                        value={editedProfile.goals.targetRace}
                        onChange={(e) => updateNestedField("goals", "targetRace", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="targetDate">Target Date</Label>
                      <Input
                        id="targetDate"
                        type="date"
                        value={editedProfile.goals.targetDate}
                        onChange={(e) => updateNestedField("goals", "targetDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="targetTime">Target Time</Label>
                      <Input
                        id="targetTime"
                        value={editedProfile.goals.targetTime}
                        onChange={(e) => updateNestedField("goals", "targetTime", e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <div className="font-semibold">{profile.goals.targetRace}</div>
                      <div className="text-sm text-muted-foreground">Target: {profile.goals.targetTime}</div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(profile.goals.targetDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4" />
                      <span className="font-semibold text-orange-600">{daysUntilRace} days to go</span>
                    </div>
                    <Progress value={Math.max(0, 100 - (daysUntilRace / 180) * 100)} className="h-2" />
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="progress" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="records">Personal Bests</TabsTrigger>
              </TabsList>

              <TabsContent value="progress" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Training Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Weekly Progress */}
                      <div>
                        <h4 className="font-semibold mb-3">This Week</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <Waves className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-blue-600">3.5h</div>
                            <div className="text-sm text-muted-foreground">Swimming</div>
                            <Progress value={70} className="mt-2 h-2" />
                          </div>
                          <div className="text-center p-4 bg-orange-50 rounded-lg">
                            <Bike className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-orange-600">6.0h</div>
                            <div className="text-sm text-muted-foreground">Cycling</div>
                            <Progress value={85} className="mt-2 h-2" />
                          </div>
                          <div className="text-center p-4 bg-yellow-50 rounded-lg">
                            <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-yellow-600">4.2h</div>
                            <div className="text-sm text-muted-foreground">Running</div>
                            <Progress value={60} className="mt-2 h-2" />
                          </div>
                        </div>
                      </div>

                      {/* Monthly Trends */}
                      <div>
                        <h4 className="font-semibold mb-3">Monthly Trends</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-center text-muted-foreground">
                            Training volume chart would be displayed here
                            <br />
                            (Connected to your Node.js backend analytics)
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {profile.achievements.map((achievement) => (
                        <div key={achievement.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0 p-2 bg-white rounded-full">
                            {getAchievementIcon(achievement.type)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            <div className="text-xs text-muted-foreground mt-1">
                              {new Date(achievement.date).toLocaleDateString()}
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-orange-100">
                            New
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="records" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5" />
                      Personal Best Records
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-blue-50 rounded-lg">
                        <Waves className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                        <h4 className="font-semibold text-blue-700">Swimming</h4>
                        <div className="mt-2">
                          <div className="text-2xl font-bold">{profile.personalBests.swim.time}</div>
                          <div className="text-sm text-muted-foreground">{profile.personalBests.swim.distance}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(profile.personalBests.swim.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="text-center p-6 bg-orange-50 rounded-lg">
                        <Bike className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                        <h4 className="font-semibold text-orange-700">Cycling</h4>
                        <div className="mt-2">
                          <div className="text-2xl font-bold">{profile.personalBests.bike.time}</div>
                          <div className="text-sm text-muted-foreground">{profile.personalBests.bike.distance}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(profile.personalBests.bike.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="text-center p-6 bg-yellow-50 rounded-lg">
                        <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                        <h4 className="font-semibold text-yellow-700">Running</h4>
                        <div className="mt-2">
                          <div className="text-2xl font-bold">{profile.personalBests.run.time}</div>
                          <div className="text-sm text-muted-foreground">{profile.personalBests.run.distance}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(profile.personalBests.run.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
