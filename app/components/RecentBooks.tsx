import { Link } from 'lucide-react';
import  { useMemo } from 'react'

function RecentBooks({ books, formatDate }: { books: any[], formatDate: (value: string) => string }) {
      const recentBooks = useMemo(
    () => [...books].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5),
    [books]
  );
  return (
       <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-4  w-full shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-foreground">Recently added</h2>
            <Link href="/books" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View all books
            </Link>
          </div>

          <div className="space-y-3">
            {recentBooks.length ? (
              recentBooks.map((book) => (
                <div
                  key={book.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/20 px-3 py-2"
                >
                  <div>
                    <p className="font-medium text-foreground">{book.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {book.category} • {book.location}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{formatDate(book.createdAt)}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No active books yet.</p>
            )}
          </div>
        </div>

     
      </div>
  )
}

export default RecentBooks
