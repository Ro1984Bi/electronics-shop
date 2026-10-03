import { useState } from 'react'
import { Search } from 'lucide-react'
import { searchProducts } from '../server/products'

interface SearchBoxProps {
  onResults: (results: Awaited<ReturnType<typeof searchProducts>>) => void
  placeholder?: string
}

export function SearchBox({
  onResults,
  placeholder = 'Search products...',
}: SearchBoxProps) {
  const [query, setQuery] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [hasResults, setHasResults] = useState(false)

  const handleChange = async (value: string) => {
    setQuery(value)

    if (!value.trim()) {
      setHasSearched(false)
      setHasResults(false)
      onResults([])
      return
    }

    const results = await searchProducts({
      data: {
        query: value,
      },
    })
    setHasSearched(true)
    setHasResults(results.length > 0)

    onResults(results)
  }

  return (
    <div className="relative">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
      />

      <input
        type="search"
        value={query}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-zinc-600"
      />

      {hasSearched && !hasResults && (
        <p className="mt-2 text-sm text-zinc-500">Product not found</p>
      )}
    </div>
  )
}
