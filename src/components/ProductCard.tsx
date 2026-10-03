import { Link } from '@tanstack/react-router'

interface ProductCardProps {
  id: number
  name: string
  description: string
  price: number
  image: string
}

interface ProductCardProps {
  id: number
  name: string
  description: string
  price: number
  image: string
}
export function ProductCard({
  id,
  name,
  description,
  price,
  image,
}: ProductCardProps) {
  return (
    <Link
      to="/product/$productId"
      params={{ productId: String(id) }}
      className="block"
    >
      <article className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 transition hover:border-zinc-700">
        <div className="aspect-square overflow-hidden bg-zinc-950">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold text-white">{name}</h3>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-400">
            {description}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-lg font-bold text-white">
              ${price.toFixed(2)}
            </span>

            <span className="text-sm text-zinc-500">View product →</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
