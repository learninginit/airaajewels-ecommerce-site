import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BellRingIcon as Ring, NetworkIcon as Necklace } from "lucide-react"
import Image from "next/image"

export default function SizeGuidePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Jewelry Size Guide</h1>
        <p className="text-muted-foreground text-lg">Find your perfect fit for rings, necklaces, and bracelets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <Ring className="h-8 w-8 text-amber-600 mb-2" />
            <CardTitle>Ring Size Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              To find your ring size, you can measure the inner diameter of an existing ring or use a string/paper strip
              to measure your finger circumference.
            </p>
            <h3 className="font-semibold text-lg">Method 1: Measure an Existing Ring</h3>
            <ol className="list-decimal list-inside text-muted-foreground space-y-1">
              <li>Take a ring that fits you well.</li>
              <li>Measure the inner diameter of the ring in millimeters (mm) using a ruler.</li>
              <li>Refer to the chart below to find your corresponding ring size.</li>
            </ol>
            <Image
              src="/placeholder.svg?height=200&width=400"
              alt="Ring measurement guide"
              width={400}
              height={200}
              className="rounded-md mx-auto"
            />
            <h3 className="font-semibold text-lg mt-4">Method 2: Measure Your Finger</h3>
            <ol className="list-decimal list-inside text-muted-foreground space-y-1">
              <li>Wrap a string or paper strip around the base of your finger.</li>
              <li>Mark the point where the ends meet.</li>
              <li>Measure the length of the string/paper in millimeters (mm). This is your finger circumference.</li>
              <li>Refer to the chart below to find your corresponding ring size.</li>
            </ol>
            <Image
              src="/placeholder.svg?height=200&width=400"
              alt="Finger measurement guide"
              width={400}
              height={200}
              className="rounded-md mx-auto"
            />
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Indian Size
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Diameter (mm)
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Circumference (mm)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4">8</td>
                    <td className="px-6 py-4">15.30</td>
                    <td className="px-6 py-4">48.1</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4">10</td>
                    <td className="px-6 py-4">15.90</td>
                    <td className="px-6 py-4">50.0</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4">12</td>
                    <td className="px-6 py-4">16.50</td>
                    <td className="px-6 py-4">51.8</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4">14</td>
                    <td className="px-6 py-4">17.20</td>
                    <td className="px-6 py-4">54.0</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4">16</td>
                    <td className="px-6 py-4">17.80</td>
                    <td className="px-6 py-4">56.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Necklace className="h-8 w-8 text-amber-600 mb-2" />
            <CardTitle>Necklace & Bracelet Size Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="font-semibold text-lg">Necklace Lengths</h3>
            <p className="text-muted-foreground">
              Necklace lengths are typically measured in inches or centimeters. The fit can vary based on your neck size
              and desired style.
            </p>
            <Image
              src="/placeholder.svg?height=200&width=400"
              alt="Necklace length guide"
              width={400}
              height={200}
              className="rounded-md mx-auto"
            />
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Length (Inches)
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Length (cm)
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Style
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4">16"</td>
                    <td className="px-6 py-4">40 cm</td>
                    <td className="px-6 py-4">Choker/Collar</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4">18"</td>
                    <td className="px-6 py-4">45 cm</td>
                    <td className="px-6 py-4">Princess</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4">20"</td>
                    <td className="px-6 py-4">50 cm</td>
                    <td className="px-6 py-4">Matinee</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4">24"</td>
                    <td className="px-6 py-4">60 cm</td>
                    <td className="px-6 py-4">Opera</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-semibold text-lg mt-4">Bracelet Sizes</h3>
            <p className="text-muted-foreground">
              To find your bracelet size, measure your wrist circumference just below the wrist bone. Add 1-2 cm for a
              comfortable fit.
            </p>
            <Image
              src="/placeholder.svg?height=200&width=400"
              alt="Bracelet measurement guide"
              width={400}
              height={200}
              className="rounded-md mx-auto"
            />
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Wrist Size (Inches)
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Bracelet Size (Inches)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4">6.0"</td>
                    <td className="px-6 py-4">6.5" - 7.0"</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4">6.5"</td>
                    <td className="px-6 py-4">7.0" - 7.5"</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4">7.0"</td>
                    <td className="px-6 py-4">7.5" - 8.0"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
