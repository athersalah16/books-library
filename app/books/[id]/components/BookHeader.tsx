import React from "react";

function BookHeader({ title }: { title: string }) {
  return (
    <header className="mb-6 border-b border-border pb-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brass">
            Book details
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            {title || "Untitled book"}
          </h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Library</span>
          <span>/</span>
          <span className="font-medium text-foreground">Overview</span>
        </div>
      </div>
    </header>
  );
}

export default BookHeader;
