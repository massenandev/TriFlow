import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    // This would connect to your Node.js backend
    console.log("[v0] Fetching profile:", userId)

    // Mock user profile data
    const mockProfile = {
      id: "user-123",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      bio: "Passionate triathlete training for my first Ironman.",
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
    }

    return NextResponse.json({
      success: true,
      profile: mockProfile,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch profile" }, { status: 400 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const profileData = await request.json()

    // This would connect to your Node.js backend
    console.log("[v0] Updating profile:", profileData)

    const updatedProfile = {
      ...profileData,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      profile: updatedProfile,
      message: "Profile updated successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update profile" }, { status: 400 })
  }
}
