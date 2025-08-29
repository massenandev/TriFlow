import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    // This would connect to your Node.js backend
    console.log("[v0] Fetching achievements:", userId)

    // Mock achievements data
    const mockAchievements = [
      {
        id: "1",
        title: "First Century",
        description: "Completed 100km bike ride",
        date: "2024-01-10",
        type: "bike",
        userId: userId,
      },
      {
        id: "2",
        title: "Swimming Milestone",
        description: "Swam 2km without stopping",
        date: "2024-01-05",
        type: "swim",
        userId: userId,
      },
    ]

    return NextResponse.json({
      success: true,
      achievements: mockAchievements,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch achievements" }, { status: 400 })
  }
}
