"use client";

import { useState } from "react";
import BooksSearch from "./components/BooksSearch";
import CategorySelector from "./components/CategorySelector";
import { useBooksContext } from "../context/BooksContext";
import Header from "../components/common/Header";
import DisplayBooks from "./components/DisplayBooks";

import NoBooksFound from "../components/common/NoBooksFound";

function BooksPage() {
  const { unTrashedBooks} = useBooksContext();
  const [search, setSearch] = useState("");
  


  return (
    <div className="flex min-h-dvh w-full flex-col gap-6 bg-background px-4 py-4 sm:px-6">
      <Header
        title="All Books"
        description="Browse your entire book collection."
      />
      {unTrashedBooks.length === 0 ? (
        <NoBooksFound />
      ) : (
        <>
          <div className="flex flex-col lg:flex-row lg:justify-between gap-4 px-6 ">
            <BooksSearch search={search} setSearch={setSearch} />

            <CategorySelector />
          </div>
          <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-4 ">
            {unTrashedBooks.map((book, index) => (
              <DisplayBooks data={book} key={index + 1} />
            ))}
          </div>
        </>
      )}

     
    </div>
  );
}

export default BooksPage;
