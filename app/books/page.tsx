import Title from "../components/common/Title";
import AddBtn from "../components/common/AddBtn";

function BooksPage() {
  return (
    <div className="flex min-h-dvh w-full flex-col gap-4 bg-background px-4 py-4">
      <div className=" w-full flex px-6 flex-row justify-between">
        <Title
          title="All Books"
          description="Browse your entire book collection."
        />
        <AddBtn />
      </div>
      
    </div>
  );
}

export default BooksPage;
