import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen w-full flex-1 items-center justify-center bg-white px-6 py-20 text-[#202923]">
      <section className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <div className="mb-8 flex size-20 items-center justify-center rounded-2xl bg-[#F1F0EB]">
          <svg
            aria-hidden="true"
            className="size-10 text-[#193B36]"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 7v14m0-14C10.6 5.6 7.7 5 4 5v13c3.7 0 6.6.6 8 2m0-13c1.4-1.4 4.3-2 8-2v13c-3.7 0-6.6.6-8 2"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
            />
          </svg>
        </div>

        <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-[#B78B52]">
          404 · PAGE NOT FOUND
        </p>
        <h1 className="font-serif text-4xl leading-tight text-[#193B36] sm:text-5xl">
          This page is off the shelf.
        </h1>
        <p className="mt-5 max-w-md text-base leading-7 text-[#747C75]">
          We couldn&apos;t find the page you were looking for. It may have moved,
          or the link might be out of date.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#193B36] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#202923] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B78B52]"
            href="/books"
          >
            Browse all books
          </Link>
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#E3E1DA] bg-white px-5 py-3 text-sm font-medium text-[#193B36] transition-colors hover:bg-[#F1F0EB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B78B52]"
            href="/"
          >
            Return home
          </Link>
        </div>
      </section>
    </main>
  );
}
