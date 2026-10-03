import { createFileRoute, useRouter } from '@tanstack/react-router'
import { getProducts, createProduct } from '../server/products'
import { type FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { ProductCard } from '../components/ProductCard'

export const Route = createFileRoute('/products')({
  loader: () => getProducts(),
  component: ProductsPage,
})

function ProductsPage() {
  const { session } = Route.useRouteContext()
  const products = Route.useLoaderData()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const product = {
      name: String(formData.get('name') ?? '').trim(),
      description: String(formData.get('description') ?? '').trim(),
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
      image: String(formData.get('image') ?? '').trim(),
    }

    try {
      await createProduct({
        data: product,
      })

      toast.success('Product added successfully')

      form.reset()
      setIsModalOpen(false)
      await router.invalidate()
    } catch {
      toast.error('Failed to add product')
    }
  }

  return (
    <main className="min-h-screen p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Products</h1>

        {session && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
          >
            Add product
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Add product</h2>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 transition hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="mt-2 text-sm text-zinc-400">
              Add a new product to your store.
            </p>
            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="product-name"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Name
                </label>

                <input
                  name="name"
                  id="product-name"
                  type="text"
                  placeholder="Wireless Headphones"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
                />
              </div>

              <div>
                <label
                  htmlFor="product-description"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Description
                </label>

                <textarea
                  name="description"
                  id="product-description"
                  rows={4}
                  placeholder="Describe the product..."
                  className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="product-price"
                    className="mb-2 block text-sm font-medium text-zinc-300"
                  >
                    Price
                  </label>

                  <input
                    name="price"
                    id="product-price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="129.99"
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="product-stock"
                    className="mb-2 block text-sm font-medium text-zinc-300"
                  >
                    Stock
                  </label>

                  <input
                    name="stock"
                    id="product-stock"
                    type="number"
                    min="0"
                    placeholder="10"
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="product-image"
                    className="mb-2 block text-sm font-medium text-zinc-300"
                  >
                    Image URL
                  </label>

                  <input
                    name="image"
                    id="product-image"
                    type="url"
                    placeholder="https://example.com/product.jpg"
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-lg border border-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 cursor-pointer"
                  >
                    Add product
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {products.length === 0 ? (
        <p className="mt-6 text-zinc-400">No products available.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      )}
    </main>
  )
}
