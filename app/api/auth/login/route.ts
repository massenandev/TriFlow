import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // This would connect to your Node.js backend
    console.log("[v0] Login attempt:", { email })

    // Mock response - replace with actual backend call
    const mockUser = {
      id: "1",
      email,
      name: "John Doe",
      token: "mock-jwt-token",
    }

    return NextResponse.json({
      success: true,
      user: mockUser,
      message: "Login successful",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Login failed" }, { status: 400 })
  }
}
