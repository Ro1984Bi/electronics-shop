import { Home, LogIn, LogOut, ShoppingBag, ShoppingCart } from 'lucide-react'
import { Route } from '../routes/__root'
import { Link } from '@tanstack/react-router'
import { useCartStore } from '../store/cartStore'

export function Header() {
  const routeContext = Route.useRouteContext()
  const cartCount = useCartStore((state) =>
  state.items.reduce(
    (total, item) => total + item.quantity,
    0,
  ),
)

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white transition hover:text-zinc-300"
        >
          <div className="flex size-9 items-center justify-center rounded-lg bg-white text-zinc-950">
            <ShoppingBag size={19} />
          </div>

          <span>Electronics Shop</span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            <Home size={17} />
            <span>Home</span>
          </Link>

          <Link
            to="/products"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            <ShoppingBag size={17} />
            <span>Products</span>
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            <ShoppingCart size={17} />
            <span>Cart {cartCount > 0 && `(${cartCount})`}</span>
          </Link>

          <div className="mx-2 h-6 w-px bg-zinc-800" />
          {routeContext.session ? (
            <>
              <span className="px-3 text-sm text-zinc-400">
                {routeContext.session.user?.email}
              </span>
              <a
                href="/api/auth/signout"
                className="flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
              >
                <LogOut size={17} />
                <span>Log out</span>
              </a>
            </>
          ) : (
            <Link
              to="/sign-in/$"
              className="flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
            >
              <LogIn size={17} />
              <span>Sign in</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
