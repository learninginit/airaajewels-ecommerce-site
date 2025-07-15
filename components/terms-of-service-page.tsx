import { Card, CardContent } from "@/components/ui/card"

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground text-lg">Last Updated: July 15, 2025</p>
      </div>

      <Card>
        <CardContent className="prose max-w-none dark:prose-invert">
          <p>
            Welcome to Airaa Jewels! These Terms of Service ("Terms") govern your access to and use of the Airaa Jewels
            website (the "Service"), operated by Airaa Jewels ("us", "we", or "our"). Please read these Terms carefully
            before using our Service.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of
            the terms, then you may not access the Service.
          </p>

          <h2>2. Privacy Policy</h2>
          <p>
            Your use of the Service is also governed by our Privacy Policy, which describes how we collect, use, and
            disclose your information. Please review our Privacy Policy at{" "}
            <a href="/privacy-policy">airaajewels.com/privacy-policy</a>.
          </p>

          <h2>3. Accounts</h2>
          <p>
            When you create an account with us, you must provide information that is accurate, complete, and current at
            all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of
            your account on our Service. You are responsible for safeguarding the password that you use to access the
            Service and for any activities or actions under your password.
          </p>

          <h2>4. Products and Services</h2>
          <p>
            All products and services listed on the Service are subject to availability. We reserve the right to limit
            the quantities of any products or services that we offer. All descriptions of products or product pricing
            are subject to change at anytime without notice, at the sole discretion of us.
          </p>

          <h2>5. Pricing and Payment</h2>
          <p>
            All prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless otherwise stated. We
            accept various payment methods as indicated on our checkout page. By placing an order, you agree to pay the
            full amount specified.
          </p>

          <h2>6. Shipping and Delivery</h2>
          <p>
            Our shipping and delivery policies are detailed on our <a href="/shipping-info">Shipping Information</a>{" "}
            page. We are not responsible for delays caused by shipping carriers or customs.
          </p>

          <h2>7. Returns and Refunds</h2>
          <p>
            Our return and refund policy is outlined on our <a href="/returns">Returns & Exchanges</a> page. Please
            review it carefully before making a purchase.
          </p>

          <h2>8. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property
            of Airaa Jewels and its licensors. The Service is protected by copyright, trademark, and other laws of both
            the India and foreign countries.
          </p>

          <h2>9. Links to Other Websites</h2>
          <p>
            Our Service may contain links to third-party web sites or services that are not owned or controlled by Airaa
            Jewels. We have no control over, and assume no responsibility for, the content, privacy policies, or
            practices of any third party web sites or services.
          </p>

          <h2>10. Termination</h2>
          <p>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason
            whatsoever, including without limitation if you breach the Terms.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of India, without regard to its
            conflict of law provisions.
          </p>

          <h2>12. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
            material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
          </p>

          <h2>13. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at info@airaajewels.com.</p>
        </CardContent>
      </Card>
    </div>
  )
}
