import { Suspense } from "react";
import AddBookPage from "./components/AddBookPage";
type Props = {
  searchParams: Promise<{ mode: string }>;
};

async function NewBookPage({ searchParams }:Props) {
  return (
    <Suspense fallback={<p className="px-4">Loading Add Book...</p>}>
      {searchParams.then(({mode}) => (
        <AddBookPage mode={mode || "add"} />
      ))}
    </Suspense>
  );
}

export default NewBookPage;
