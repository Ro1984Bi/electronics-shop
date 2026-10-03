import { createFileRoute } from '@tanstack/react-router'
import { getProductById } from '../../server/products'
import { useState } from 'react'
import { useCartStore } from '../../store/cartStore'
import { toast } from 'sonner'

export const Route = createFileRoute('/product/$productId')({
  loader: ({ params }) =>
    getProductById({
      data: {
        id: Number(params.productId),
      },
    }),
  component: ProductDetailPage,
})

function ProductDetailPage() {
  const product = Route.useLoaderData()
  const [quantity, setQuantity] = useState(1)

  const totalPrice = product.price * quantity
  const remainingStock = product.stock - quantity
  const addToCart = useCartStore((state) => state.addToCart)

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-3xl font-bold text-white">Product not found</h1>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
          <img
            src={product.image ?? ''}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            {product.name}
          </h1>

          <p className="mt-6 leading-7 text-zinc-400">{product.description}</p>

          <p className="mt-8 text-3xl font-bold text-white">
            ${product.price.toFixed(2)}
          </p>

          <p className="mt-3 text-sm text-zinc-500">
            {remainingStock} in stock
          </p>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              disabled={quantity === 1}
              className="flex size-10 items-center justify-center rounded-lg border border-zinc-800 text-lg text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            >
              −
            </button>

            <span className="flex min-w-10 justify-center text-lg font-semibold text-white">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() =>
                setQuantity((current) => Math.min(product.stock, current + 1))
              }
              disabled={quantity >= product.stock}
              className="flex size-10 items-center justify-center rounded-lg border border-zinc-800 text-lg text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            >
              +
            </button>
          </div>

          <p className="mt-6 text-2xl font-bold text-white">
            ${totalPrice.toFixed(2)}
          </p>

          <button
            type="button"
            onClick={() => {
              addToCart(
                {
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image ?? '',
                  stock: product.stock,
                },
                quantity,
              )

              toast.success(`${quantity} ${product.name} added to cart`)
            }}
            className="mt-6 w-full rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 cursor-pointer"
          >
            Add to cart
          </button>
        </div>
      </div>
    </main>
  )
}
