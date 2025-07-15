import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Droplet, Box, Gem } from "lucide-react"

export default function JewelryCarePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Jewelry Care Guide</h1>
        <p className="text-muted-foreground text-lg">Preserve the brilliance of your precious pieces</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <Sparkles className="h-8 w-8 text-amber-600 mb-2" />
            <CardTitle>General Care Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Always remove jewelry before showering, swimming, or engaging in strenuous activities.</li>
              <li>Avoid direct contact with perfumes, lotions, hairsprays, and other chemicals.</li>
              <li>Put on jewelry after applying cosmetics and fragrances.</li>
              <li>Clean your jewelry regularly with a soft, lint-free cloth to remove oils and dirt.</li>
              <li>Inspect your jewelry periodically for loose stones or damaged clasps.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Droplet className="h-8 w-8 text-amber-600 mb-2" />
            <CardTitle>Cleaning Your Jewelry</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold text-lg mb-2">Gold & Platinum:</h3>
            <p className="text-muted-foreground mb-2">
              Mix a few drops of mild dish soap with warm water. Soak your jewelry for 15-20 minutes, then gently scrub
              with a soft brush. Rinse thoroughly and dry with a soft cloth.
            </p>
            <h3 className="font-semibold text-lg mb-2">Diamonds:</h3>
            <p className="text-muted-foreground mb-2">
              Diamonds can be cleaned similarly to gold. For extra sparkle, use a soft toothbrush to gently scrub the
              underside of the diamond.
            </p>
            <h3 className="font-semibold text-lg mb-2">Pearls & Soft Gemstones:</h3>
            <p className="text-muted-foreground">
              Wipe gently with a damp, soft cloth. Avoid harsh chemicals, ultrasonic cleaners, and excessive heat, as
              these can damage delicate stones.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Box className="h-8 w-8 text-amber-600 mb-2" />
            <CardTitle>Storing Your Jewelry</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Store jewelry in a clean, dry place away from direct sunlight and extreme temperatures.</li>
              <li>Keep pieces separate to prevent scratching and tangling. Use individual pouches or compartments.</li>
              <li>Store silver jewelry in anti-tarnish bags to slow down oxidation.</li>
              <li>For pearls, store them flat in a soft cloth or pouch to prevent stretching of the strand.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <Gem className="h-8 w-8 text-amber-600 mb-2" />
            <CardTitle>Professional Cleaning & Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We recommend having your fine jewelry professionally cleaned and inspected at least once a year. Our
              experts can check for loose prongs, worn settings, and provide a deep clean to restore its original
              luster.
            </p>
            <p className="text-muted-foreground">
              Regular professional maintenance can significantly extend the life and beauty of your cherished Airaa
              Jewels pieces. Contact us to schedule a service appointment.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
