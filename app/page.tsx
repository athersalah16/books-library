"use client";

import BookFormDialog from "@/app/books/components/BookFormDialog";
import Summary from "./components/Summary";
import { useBooksContext } from "./context/BooksContext";
import Header from "./components/common/Header";
import DisplayBooks from "./books/components/DisplayBooks";
import Link from "next/link";
import NoBooksFound from "./components/common/NoBooksFound";

export default function Home() {
  const { unTrashedBooks,  isOpen, setIsOpen } = useBooksContext();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  

  return (
    <div className="flex min-h-dvh w-full flex-col gap-6 bg-background px-4 py-4 ">
      <Header
        title="Dashboard"
        description="Your collection at a glance."
        handleClick={handleClick}
      />

      {unTrashedBooks.length === 0 ? (
           <NoBooksFound/>
      ) : (
        <>
   
          <Summary />
          <div className="flex flex-col gap-4  font-bold ">
            <div className="flex justify-between">
              <div className="text-xl">Recent Books</div>
              <Link
                className=" text-sidebar-accent-foreground  hover:underline duration-300"
                href={"/books"}
              >
                View All
              </Link>
            </div>
            <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-4 ">
              {unTrashedBooks.slice(-4).map((book, index) => (
                <DisplayBooks data={book} key={index + 1} />
              ))}
            </div>
          </div>
        </>
      )}
      <BookFormDialog
        key={isOpen ? "dashboard-create-open" : "dashboard-create-closed"}
        open={isOpen}
        onOpenChange={setIsOpen}
        mode="create"
      />
    </div>
  );
}
