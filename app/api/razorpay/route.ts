"use server"

import "server-only"
import { NextResponse } from "next/server"

interface CreateOrderBody {
  amount: number // amount in rupees sent from the client
}

/**
 * POST /api/razorpay
 * Body: { amount: number }  – amount in INR rupees
 * Returns: the newly-created Razorpay order plus { key } (the public key id)
 */
export async function POST(req: Request) {
  try {
    const { amount } = (await req.json()) as CreateOrderBody

    if (!amount || typeof amount !== "number") {
      return NextResponse.json({ error: "Invalid amount provided" }, { status: 400 })
    }

    const KEY_ID = process.env.RAZORPAY_KEY_ID
    const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET

    if (!KEY_ID || !KEY_SECRET) {
      return NextResponse.json({ error: "Razorpay environment variables not configured" }, { status: 500 })
    }

    // Razorpay expects amount in the **smallest currency unit** (paise)
    const orderPayload = {
      amount: amount * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    }

    const authHeader = "Basic " + Buffer.from(`${KEY_ID}:${KEY_SECRET}`).toString("base64")

    const razorRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(orderPayload),
      cache: "no-store",
    })

    if (!razorRes.ok) {
      const errText = await razorRes.text()
      return NextResponse.json({ error: "Failed to create Razorpay order", details: errText }, { status: 500 })
    }

    const order = await razorRes.json()

    // Return the order details plus the **public** key id for client-side checkout
    return NextResponse.json({ ...order, key: KEY_ID })
  } catch (err: any) {
    return NextResponse.json({ error: "Unexpected server error", message: err?.message }, { status: 500 })
  }
}
