import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function AddBtn() {
  return (
    <Button variant="default" size="lg" className="w-32 cursor-pointer py-5">
      <Plus size={16} /> Add Book
    </Button>
  );
}

export default AddBtn;
