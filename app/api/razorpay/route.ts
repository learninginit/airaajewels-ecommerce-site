import { type NextRequest, NextResponse } from "next/server"
import Razorpay from "razorpay"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency = "INR", productId, type, couponCode, discount } = body

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        productId,
        type,
        couponCode: couponCode || "",
        discount: discount || 0,
      },
    })

    // Log transaction for monitoring
    console.log("Payment initiated:", {
      orderId: order.id,
      amount: amount,
      productId,
      type,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error("Razorpay order creation failed:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create payment order",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Razorpay API is working",
    timestamp: new Date().toISOString(),
  })
}
