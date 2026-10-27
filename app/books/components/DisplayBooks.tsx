"use client";
import { Book } from "@/app/types/book";
import Image from "next/image";
import {  useState } from "react";
import { BookOpen } from "lucide-react";
import BookInformation from "./BookInformation";

type Props = { data: Book };

function DisplayBook({ data }: Props) {
  const { image_url, title, category, shelf_number, location } = data;
  const [open, setOpen] = useState(false);

  
  const handleClick = () => {
    setOpen((current) => !current);
  };
  return (
    <div
      onClick={handleClick}
      className="rounded-md bg-accent  overflow-hidden w-full h-full lg:max-w-2xl transition-all hover:scale-105 hover:-translate-y-1.5 duration-300 hover:cursor-pointer"
    >
      <div className="relative h-[80%] w-full rounded-md border-b border-b-white">
        {image_url ? (
          <Image
            src={image_url}
            alt={`Cover of ${title}`}
            width={400}
            height={600}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full min-h-40 flex-col items-center justify-center gap-3 bg-brass-soft text-primary">
            <BookOpen aria-hidden="true" className="size-10 text-brass" />
            <span className="text-sm font-medium">No cover available</span>
          </div>
        )}
      </div>
      <div className="p-4 text-center hover cursor-text" dir="rtl">
        <h2 className="text-xl text-sidebar-accent-foreground font-semibold ">
          {title}
        </h2>
        <div className="flex justify-between">
          <p className="text-accent-foreground text-start">{category}</p>
          <p className="text-accent-foreground text-start">
            {location}-{shelf_number}
          </p>
        </div>
      </div>
      {open && (
        <BookInformation data={data} open={open} onOpenChange={setOpen} />
      )}
    </div>
  );
}

export default DisplayBook;
