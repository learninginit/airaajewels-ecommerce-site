import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground text-lg">Last Updated: July 15, 2025</p>
      </div>

      <Card>
        <CardContent className="prose max-w-none dark:prose-invert">
          <p>
            Your privacy is important to us. This Privacy Policy explains how Airaa Jewels ("we", "us", or "our")
            collects, uses, discloses, and safeguards your information when you visit our website{" "}
            <a href="https://airaajewels.com">airaajewels.com</a> (the "Service"). Please read this Privacy Policy
            carefully. If you do not agree with the terms of this privacy policy, please do not access the Service.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect on the Service
            includes:
          </p>
          <h3>Personal Data</h3>
          <p>
            Personally identifiable information, such as your name, shipping address, email address, and telephone
            number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily
            give to us when you register with the Service or when you choose to participate in various activities
            related to the Service, such as online chat and message boards.
          </p>
          <h3>Derivative Data</h3>
          <p>
            Information our servers automatically collect when you access the Service, such as your IP address, your
            browser type, your operating system, your access times, and the pages you have viewed directly before and
            after accessing the Service.
          </p>
          <h3>Financial Data</h3>
          <p>
            Financial information, such as data related to your payment method (e.g., valid credit card number, card
            brand, expiration date) that we may collect when you purchase, order, return, exchange, or request
            information about our services from the Service.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized
            experience. Specifically, we may use information collected about you via the Service to:
          </p>
          <ul>
            <li>Create and manage your account.</li>
            <li>
              Process your transactions and send you related information, including purchase confirmations and invoices.
            </li>
            <li>Enable user-to-user communications.</li>
            <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Service.</li>
            <li>Generate a personal profile about you to make your visit to the Service more personalized.</li>
            <li>Increase the efficiency and operation of the Service.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Service.</li>
            <li>Notify you of updates to the Service.</li>
            <li>Offer new products, services, mobile applications, and/or recommendations to you.</li>
            <li>Perform other business activities as needed.</li>
          </ul>

          <h2>3. Disclosure of Your Information</h2>
          <p>
            We may share information we have collected about you in certain situations. Your information may be
            disclosed as follows:
          </p>
          <h3>By Law or to Protect Rights</h3>
          <p>
            If we believe the release of information about you is necessary to respond to legal process, to investigate
            or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we
            may share your information as permitted or required by any applicable law, rule, or regulation.
          </p>
          <h3>Third-Party Service Providers</h3>
          <p>
            We may share your information with third parties that perform services for us or on our behalf, including
            payment processing, data analysis, email delivery, hosting services, customer service, and marketing
            assistance.
          </p>
          <h3>Marketing Communications</h3>
          <p>
            With your consent, or with an opportunity for you to withdraw consent, we may share your information with
            third parties for marketing purposes, as permitted by law.
          </p>

          <h2>4. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information.
            While we have taken reasonable steps to secure the personal information you provide to us, please be aware
            that despite our efforts, no security measures are perfect or impenetrable, and no method of data
            transmission can be guaranteed against any interception or other type of misuse.
          </p>

          <h2>5. Policy for Children</h2>
          <p>
            We do not knowingly solicit information from or market to children under the age of 13. If you become aware
            of any data we have collected from children under age 13, please contact us using the contact information
            provided below.
          </p>

          <h2>6. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            Changes to this Privacy Policy are effective when they are posted on this page.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
            <br />
            By email: info@airaajewels.com
            <br />
            By phone: +91 98765 43210
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
