import { createFileRoute } from '@tanstack/react-router'
import { useCartStore } from '../store/cartStore'

export const Route = createFileRoute('/cart')({
  component: CartPage,
})

function CartPage() {
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold text-white">Shopping Cart</h1>

      {items.length === 0 ? (
        <p className="mt-3 text-zinc-400">Your cart is empty.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="size-24 rounded-xl object-cover"
              />

              <div className="flex-1">
                <h2 className="font-semibold text-white">{item.name}</h2>

                <p className="mt-1 text-sm text-zinc-500">
                  ${item.price.toFixed(2)} each
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    disabled={item.quantity === 1}
                    className="flex size-8 items-center justify-center rounded-lg border border-zinc-800 text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                  >
                    −
                  </button>

                  <span className="min-w-6 text-center text-sm font-semibold text-white">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        Math.min(item.stock, item.quantity + 1),
                      )
                    }
                    disabled={item.quantity >= item.stock}
                    className="flex size-8 items-center justify-center rounded-lg border border-zinc-800 text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="mt-3 text-sm text-zinc-500 transition hover:text-red-400 cursor-pointer"
                >
                  Remove
                </button>
              </div>

              <div className="text-right">
                <p className="text-xs text-zinc-500">Subtotal</p>

                <p className="mt-1 text-lg font-bold text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                <div className="mt-8 flex justify-end border-t border-zinc-800 pt-6">
                  <div className="text-right">
                    <p className="text-sm text-zinc-500">Total</p>

                    <p className="mt-1 text-3xl font-bold text-white">
                      ${total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
