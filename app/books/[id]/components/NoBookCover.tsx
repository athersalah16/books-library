import { BookOpen } from "lucide-react";

function NoBookCover() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-5 text-center text-muted-foreground">
      <BookOpen aria-hidden="true" className="size-10 text-brass" />
      <span className="text-sm">No cover available</span>
    </div>
  );
}

export default NoBookCover;
