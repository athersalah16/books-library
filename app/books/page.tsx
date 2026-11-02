"use client";

import { useState } from "react";
import BooksSearch from "./components/BooksSearch";
import CategorySelector from "./components/CategorySelector";
import { useBooksContext } from "../context/BooksContext";
import Header from "../components/common/Header";
import DisplayBooks from "./components/DisplayBooks";
import NoBooksFound from "../components/common/NoBooksFound";

function BooksPage() {
  const { unTrashedBooks } = useBooksContext();
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("جميع الكتب");
  const query = search.trim().toLowerCase();

  let filteredBooks = [...unTrashedBooks];
  if (filterCategory !== "جميع الكتب") {
    filteredBooks = filteredBooks.filter(
      (book) => book.category === filterCategory,
    );
  }
  if (query) {
    filteredBooks = filteredBooks.filter((book) => {
      return (
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
      );
    });
  }

  return (
    <div className="flex min-h-dvh w-full flex-col gap-6 bg-background px-4 py-4 sm:px-6">
      <Header
        title="All Books"
        description="Browse your entire book collection."
      />

      {unTrashedBooks.length === 0 ? (
        <NoBooksFound
          message=" Your library is looking a little empty. Add your first book to get
        started!"
        />
      ) : (
        <>
          <div className="flex flex-col lg:flex-row lg:justify-between gap-4 px-6 ">
            <BooksSearch search={search} setSearch={setSearch} />
            <CategorySelector
              mode="filter"
              value={filterCategory}
              onValueChange={setFilterCategory}
        
            />
          </div>

          {filteredBooks.length === 0 ? (
            <NoBooksFound message="No books found matching your search." />
          ) : (
            <div className="flex flex-col gap-4">
              {query && (
                <p className="text-muted-foreground text-sm px-6">
                  Showing results for:{" "}
                  <span className="font-semibold">{query}</span>
                </p>
              )}
              <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-4 ">
                {filteredBooks?.map((book, index) => (
                  <DisplayBooks data={book} key={index + 1} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default BooksPage;
