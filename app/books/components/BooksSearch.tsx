'use client'
import { Input } from '@/components/ui/input';

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

function BooksSearch({ search, setSearch }: Props) {
 
  return (
     <div className="w-full md:max-w-sm py-2">
            <label
              htmlFor="book-search"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Search by title or author
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
