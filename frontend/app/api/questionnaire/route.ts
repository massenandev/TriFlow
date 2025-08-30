import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const questionnaireData = await request.json()

    // This would connect to your Node.js backend and Claude API
    console.log("[v0] Processing questionnaire:", questionnaireData)

    // Mock AI-generated training plan response
    const mockTrainingPlan = {
      id: "plan-123",
      userId: "user-456",
      planType: "personalized",
      duration: "12 weeks",
      weeklyHours: questionnaireData.currentTrainingHours,
      phases: [
        {
          name: "Base Building",
          weeks: 4,
          focus: "Aerobic development and technique",
        },
        {
          name: "Build Phase",
          weeks: 6,
          focus: "Intensity and race-specific training",
        },
        {
          name: "Peak & Taper",
          weeks: 2,
          focus: "Race preparation and recovery",
        },
      ],
      weeklySchedule: {
        monday: { type: "swim", duration: 60, intensity: "moderate" },
        tuesday: { type: "bike", duration: 90, intensity: "high" },
        wednesday: { type: "run", duration: 45, intensity: "easy" },
        thursday: { type: "swim", duration: 60, intensity: "high" },
        friday: { type: "rest", duration: 0, intensity: "recovery" },
        saturday: { type: "bike", duration: 120, intensity: "moderate" },
        sunday: { type: "run", duration: 75, intensity: "long" },
      },
    }

    return NextResponse.json({
      success: true,
      trainingPlan: mockTrainingPlan,
      message: "Training plan generated successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process questionnaire",
      },
      { status: 400 },
    )
  }
}
