
import { Suspense } from "react";
import BookPage from "./BookPage";

type Props = {
  params: Promise<{ id: string }>;
};

 function Page({ params }: Props) {
  return (
    <Suspense fallback={<div>Loading book...</div>}>
      {params.then(({ id }) => (
        <BookPage bookId={id} />
      ))}
    </Suspense>
  );
}
export default Page