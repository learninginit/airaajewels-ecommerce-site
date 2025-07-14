import { type NextRequest, NextResponse } from "next/server"

// A quick sanity-check so /api/razorpay opens in the browser
export async function GET() {
  return NextResponse.json({ ok: true, message: "Razorpay endpoint is live" })
}

// Mock Razorpay integration - In production, use actual Razorpay SDK
export async function POST(request: NextRequest) {
  try {
    const { amount, currency = "INR", productId, type } = await request.json()

    // In production, initialize Razorpay with your keys
    // const razorpay = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID,
    //   key_secret: process.env.RAZORPAY_KEY_SECRET,
    // })

    // Mock order creation
    const order = {
      id: `order_${Date.now()}`,
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: `receipt_${productId}_${Date.now()}`,
      status: "created",
    }

    return NextResponse.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID ?? "rzp_test_key",
    })
  } catch (error) {
    console.error("Razorpay order creation failed:", error)
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 })
  }
}
