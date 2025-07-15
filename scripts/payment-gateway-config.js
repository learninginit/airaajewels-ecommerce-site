// Razorpay Payment Gateway Configuration
// Complete setup for production-ready payment processing

const RAZORPAY_CONFIG = {
  // Production Configuration
  production: {
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET, // Assuming key_secret is also an environment variable
  },
}
