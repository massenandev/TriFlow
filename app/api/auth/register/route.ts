import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // This would connect to your Node.js backend
    console.log("[v0] Registration attempt:", { email, name })

    // Mock response - replace with actual backend call
    const mockUser = {
      id: "2",
      email,
      name,
      token: "mock-jwt-token",
    }

    return NextResponse.json({
      success: true,
      user: mockUser,
      message: "Registration successful",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Registration failed" }, { status: 400 })
  }
}
