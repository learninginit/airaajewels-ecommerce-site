import type { Metadata } from "next"
import ProductDetail from "@/components/product-detail"

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const productId = params.id

  // In a real app, you'd fetch the product data here
  const productName = "Diamond Elegance Necklace"

  return {
    title: `${productName} - ${productId} | Airaa Jewels`,
    description: `Shop ${productName} at Airaa Jewels. Premium quality jewelry available for purchase or rent. Product code: ${productId}`,
    keywords: `${productName}, ${productId}, jewelry, buy jewelry, rent jewelry, airaa jewels`,
    openGraph: {
      title: `${productName} - Airaa Jewels`,
      description: `Shop ${productName} at Airaa Jewels. Premium quality jewelry available for purchase or rent.`,
      images: ["/placeholder.svg?height=600&width=600"],
    },
  }
}

export default function ProductPage({ params }: Props) {
  return <ProductDetail productId={params.id} />
}
