"use client"

import { ShoppingCartIcon as CartIcon } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useCartStore } from "@/lib/store"

/**
 * A tiny cart button for the header/nav bar.
 * It shows a badge with item count and links to /cart.
 */
export default function ShoppingCart({
  className,
}: {
  className?: string
}) {
  const { items } = useCartStore()
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <Link
      href="/cart"
      aria-label="Shopping cart"
      className={cn(
        "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-md border hover:bg-muted",
        className,
      )}
    >
      <CartIcon className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-amber-500 px-1 text-xs font-semibold text-white">
          {count}
        </span>
      )}
    </Link>
  )
}
