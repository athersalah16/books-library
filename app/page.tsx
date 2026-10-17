import AddBtn from "./components/common/AddBtn";
import Title from "./components/common/Title";

export default function Home() {
  return (
    <div className="flex min-h-dvh w-full flex-col gap-4 bg-background px-4 py-4">
      <div className=" w-full flex px-6 flex-row justify-between">
        <Title
          title="Dashboard"
          description="Your collection at a glance. Sample data shown for illustration."
        />
        <AddBtn />
      </div>
    </div>
  );
}
