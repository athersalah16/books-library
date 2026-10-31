
import { Suspense } from "react";
import EditBookPage from "../components/EditBookPage";

type Props = {
  params: Promise<{ id: string }>;
};

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<div>Loading book...</div>}>
      {params.then(({ id }) => (
        <EditBookPage bookId={id} />
      ))}
    </Suspense>
  );
}

