import { Input } from '@/components/ui/input';
import React from 'react'

function BooksSearch({ search, setSearch }: { search: string; setSearch: (value: string) => void }) {
  return (
     <div className="w-full md:max-w-sm py-2">
            <label
              htmlFor="book-search"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Search by title
            </label>
            <Input
              id="book-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search books..."
            />
          </div>
  )
}

export default BooksSearch
