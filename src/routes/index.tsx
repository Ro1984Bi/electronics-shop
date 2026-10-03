import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, ShoppingBag, Zap } from 'lucide-react'
import { ProductCard } from '../components/ProductCard'
import { SearchBox } from '../components/SearchBox'
import { getFeaturedProducts } from '../server/products'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  loader: () => getFeaturedProducts(),
  component: Home,
})

function Home() {
  const products = Route.useLoaderData()
  const [searchResults, setSearchResults] = useState<
    Awaited<ReturnType<typeof getFeaturedProducts>>
  >([])

  return (
    <main>
      <section className="mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
        {/* Content */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-sm text-zinc-400">
            <Zap size={15} />
            <span>Modern electronics store</span>
          </div>

          <h1 className="max-w-2xl text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Technology that
            <span className="block text-zinc-400">moves with you.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
            Discover carefully selected electronics, accessories, and everyday
            tech designed to make your life easier.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/products"
              className="inline-flex items-center rounded-lg border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
            >
              Shop products
              <ArrowRight size={16} />
            </a>

            <a
              href="/products"
              className="inline-flex items-center rounded-lg border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
            >
              View products
            </a>
          </div>
        </div>

        {/* Visual */}
        <div className="relative hidden lg:block">
          <div className="absolute -inset-6 rounded-3xl bg-white/5 blur-3xl" />

          <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
            <div className="flex aspect-square items-center justify-center rounded-2xl bg-zinc-950">
              <div className="text-center">
                <div className="mx-auto flex size-24 items-center justify-center rounded-2xl bg-white text-zinc-950 shadow-xl">
                  <ShoppingBag size={42} />
                </div>

                <p className="mt-6 text-lg font-semibold text-white">
                  Electronics Shop
                </p>

                <p className="mt-2 text-sm text-zinc-500">
                  Your tech, your way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">
            Find our exclusive products
          </p>

          <div className="relative">
            <SearchBox onResults={setSearchResults} />
          </div>
        </div>
        {searchResults.length > 0 && (
          <div className="mx-auto mt-8 max-w-7xl px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description ?? ''}
                  price={product.price}
                  image={product.image ?? ''}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description ?? ''}
            price={product.price}
            image={product.image ?? ''}
          />
        ))}
      </div>
    </main>
  )
}
