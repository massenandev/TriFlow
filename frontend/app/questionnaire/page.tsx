"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Waves, Bike, Zap } from "lucide-react"

interface QuestionnaireData {
  // Personal Info
  age: string
  weight: string
  height: string
  gender: string

  // Experience Level
  experienceLevel: string
  previousRaces: string[]
  currentTrainingHours: string

  // Goals
  primaryGoal: string
  targetRace: string
  raceDate: string
  targetTime: string

  // Current Fitness
  swimLevel: string
  bikeLevel: string
  runLevel: string
  weeklySwimHours: string
  weeklyBikeHours: string
  weeklyRunHours: string

  // Preferences
  trainingDays: string[]
  preferredTrainingTime: string
  equipment: string[]
  limitations: string

  // Motivation
  motivation: string
  previousInjuries: string
}

const initialData: QuestionnaireData = {
  age: "",
  weight: "",
  height: "",
  gender: "",
  experienceLevel: "",
  previousRaces: [],
  currentTrainingHours: "",
  primaryGoal: "",
  targetRace: "",
  raceDate: "",
  targetTime: "",
  swimLevel: "",
  bikeLevel: "",
  runLevel: "",
  weeklySwimHours: "",
  weeklyBikeHours: "",
  weeklyRunHours: "",
  trainingDays: [],
  preferredTrainingTime: "",
  equipment: [],
  limitations: "",
  motivation: "",
  previousInjuries: "",
}

export default function QuestionnairePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<QuestionnaireData>(initialData)

  const totalSteps = 6
  const progress = ((currentStep + 1) / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    console.log("[v0] Questionnaire data:", data)
    // This would send data to your Node.js backend for AI processing
  }

  const updateData = (field: keyof QuestionnaireData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const updateArrayData = (field: keyof QuestionnaireData, value: string, checked: boolean) => {
    setData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter((item) => item !== value),
    }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Let's get to know you</h2>
              <p className="text-muted-foreground">Basic information to personalize your training</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={data.age}
                  onChange={(e) => updateData("age", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={data.gender} onValueChange={(value) => updateData("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter your weight"
                  value={data.weight}
                  onChange={(e) => updateData("weight", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Enter your height"
                  value={data.height}
                  onChange={(e) => updateData("height", e.target.value)}
                />
              </div>
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Your triathlon experience</h2>
              <p className="text-muted-foreground">Help us understand your current level</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label>What's your experience level?</Label>
                <RadioGroup
                  value={data.experienceLevel}
                  onValueChange={(value) => updateData("experienceLevel", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner">Beginner (0-1 years)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate (1-3 years)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced">Advanced (3+ years)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="elite" id="elite" />
                    <Label htmlFor="elite">Elite/Professional</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Previous race distances completed (check all that apply)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["Sprint", "Olympic", "Half Ironman", "Full Ironman", "Ultra Distance"].map((race) => (
                    <div key={race} className="flex items-center space-x-2">
                      <Checkbox
                        id={race}
                        checked={data.previousRaces.includes(race)}
                        onCheckedChange={(checked) => updateArrayData("previousRaces", race, checked as boolean)}
                      />
                      <Label htmlFor={race}>{race}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentHours">Current weekly training hours</Label>
                <Select
                  value={data.currentTrainingHours}
                  onValueChange={(value) => updateData("currentTrainingHours", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select hours per week" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-3">0-3 hours</SelectItem>
                    <SelectItem value="4-6">4-6 hours</SelectItem>
                    <SelectItem value="7-10">7-10 hours</SelectItem>
                    <SelectItem value="11-15">11-15 hours</SelectItem>
                    <SelectItem value="16+">16+ hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Your goals</h2>
              <p className="text-muted-foreground">What do you want to achieve?</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Primary goal</Label>
                <RadioGroup value={data.primaryGoal} onValueChange={(value) => updateData("primaryGoal", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="complete-first-tri" id="complete-first-tri" />
                    <Label htmlFor="complete-first-tri">Complete my first triathlon</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="improve-time" id="improve-time" />
                    <Label htmlFor="improve-time">Improve my race time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="longer-distance" id="longer-distance" />
                    <Label htmlFor="longer-distance">Complete a longer distance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="general-fitness" id="general-fitness" />
                    <Label htmlFor="general-fitness">General fitness and health</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="targetRace">Target race distance</Label>
                  <Select value={data.targetRace} onValueChange={(value) => updateData("targetRace", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sprint">Sprint (750m/20km/5km)</SelectItem>
                      <SelectItem value="olympic">Olympic (1.5km/40km/10km)</SelectItem>
                      <SelectItem value="half-ironman">Half Ironman (1.9km/90km/21km)</SelectItem>
                      <SelectItem value="full-ironman">Full Ironman (3.8km/180km/42km)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="raceDate">Target race date</Label>
                  <Input
                    id="raceDate"
                    type="date"
                    value={data.raceDate}
                    onChange={(e) => updateData("raceDate", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetTime">Target finish time (optional)</Label>
                <Input
                  id="targetTime"
                  placeholder="e.g., 2:30:00"
                  value={data.targetTime}
                  onChange={(e) => updateData("targetTime", e.target.value)}
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Current fitness levels</h2>
              <p className="text-muted-foreground">Rate your ability in each discipline</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="text-center pb-3">
                    <Waves className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <CardTitle className="text-lg">Swimming</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={data.swimLevel} onValueChange={(value) => updateData("swimLevel", value)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="beginner" id="swim-beginner" />
                        <Label htmlFor="swim-beginner" className="text-sm">
                          Beginner
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="intermediate" id="swim-intermediate" />
                        <Label htmlFor="swim-intermediate" className="text-sm">
                          Intermediate
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="advanced" id="swim-advanced" />
                        <Label htmlFor="swim-advanced" className="text-sm">
                          Advanced
                        </Label>
                      </div>
                    </RadioGroup>
                    <div className="mt-3">
                      <Label htmlFor="swimHours" className="text-sm">
                        Weekly hours
                      </Label>
                      <Input
                        id="swimHours"
                        type="number"
                        placeholder="0"
                        value={data.weeklySwimHours}
                        onChange={(e) => updateData("weeklySwimHours", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="text-center pb-3">
                    <Bike className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                    <CardTitle className="text-lg">Cycling</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={data.bikeLevel} onValueChange={(value) => updateData("bikeLevel", value)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="beginner" id="bike-beginner" />
                        <Label htmlFor="bike-beginner" className="text-sm">
                          Beginner
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="intermediate" id="bike-intermediate" />
                        <Label htmlFor="bike-intermediate" className="text-sm">
                          Intermediate
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="advanced" id="bike-advanced" />
                        <Label htmlFor="bike-advanced" className="text-sm">
                          Advanced
                        </Label>
                      </div>
                    </RadioGroup>
                    <div className="mt-3">
                      <Label htmlFor="bikeHours" className="text-sm">
                        Weekly hours
                      </Label>
                      <Input
                        id="bikeHours"
                        type="number"
                        placeholder="0"
                        value={data.weeklyBikeHours}
                        onChange={(e) => updateData("weeklyBikeHours", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="text-center pb-3">
                    <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                    <CardTitle className="text-lg">Running</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={data.runLevel} onValueChange={(value) => updateData("runLevel", value)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="beginner" id="run-beginner" />
                        <Label htmlFor="run-beginner" className="text-sm">
                          Beginner
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="intermediate" id="run-intermediate" />
                        <Label htmlFor="run-intermediate" className="text-sm">
                          Intermediate
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="advanced" id="run-advanced" />
                        <Label htmlFor="run-advanced" className="text-sm">
                          Advanced
                        </Label>
                      </div>
                    </RadioGroup>
                    <div className="mt-3">
                      <Label htmlFor="runHours" className="text-sm">
                        Weekly hours
                      </Label>
                      <Input
                        id="runHours"
                        type="number"
                        placeholder="0"
                        value={data.weeklyRunHours}
                        onChange={(e) => updateData("weeklyRunHours", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Training preferences</h2>
              <p className="text-muted-foreground">When and how do you prefer to train?</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Available training days (check all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        id={day}
                        checked={data.trainingDays.includes(day)}
                        onCheckedChange={(checked) => updateArrayData("trainingDays", day, checked as boolean)}
                      />
                      <Label htmlFor={day}>{day}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Preferred training time</Label>
                <Select
                  value={data.preferredTrainingTime}
                  onValueChange={(value) => updateData("preferredTrainingTime", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="early-morning">Early morning (5-7 AM)</SelectItem>
                    <SelectItem value="morning">Morning (7-10 AM)</SelectItem>
                    <SelectItem value="midday">Midday (10 AM-2 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (2-6 PM)</SelectItem>
                    <SelectItem value="evening">Evening (6-9 PM)</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Available equipment (check all that apply)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Pool access",
                    "Open water access",
                    "Road bike",
                    "Triathlon bike",
                    "Indoor trainer",
                    "Gym membership",
                    "Running track",
                    "Heart rate monitor",
                    "Power meter",
                  ].map((equipment) => (
                    <div key={equipment} className="flex items-center space-x-2">
                      <Checkbox
                        id={equipment}
                        checked={data.equipment.includes(equipment)}
                        onCheckedChange={(checked) => updateArrayData("equipment", equipment, checked as boolean)}
                      />
                      <Label htmlFor={equipment}>{equipment}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Final details</h2>
              <p className="text-muted-foreground">Help us create the perfect plan for you</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="motivation">What motivates you to train? (optional)</Label>
                <Textarea
                  id="motivation"
                  placeholder="Share what drives you to pursue triathlon training..."
                  value={data.motivation}
                  onChange={(e) => updateData("motivation", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="limitations">Any physical limitations or previous injuries? (optional)</Label>
                <Textarea
                  id="limitations"
                  placeholder="Let us know about any injuries or limitations we should consider..."
                  value={data.limitations}
                  onChange={(e) => updateData("limitations", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="previousInjuries">Previous injuries (optional)</Label>
                <Textarea
                  id="previousInjuries"
                  placeholder="Describe any past injuries that might affect your training..."
                  value={data.previousInjuries}
                  onChange={(e) => updateData("previousInjuries", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Waves className="h-6 w-6 text-blue-500" />
              <Bike className="h-6 w-6 text-orange-500" />
              <Zap className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">TriFlow Assessment</h1>
          <p className="text-muted-foreground">Help us create your personalized training plan</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Content */}
        <Card className="mb-8">
          <CardContent className="p-8">{renderStep()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {currentStep === totalSteps - 1 ? (
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 flex items-center gap-2"
            >
              Generate My Plan
              <Zap className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
