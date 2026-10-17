import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type AddBtnProps = {
  onClick?: () => void;
};

function AddBtn({ onClick }: AddBtnProps) {
  return (
    <Button
      type="button"
      variant="default"
      size="lg"
      className="w-32 cursor-pointer py-5"
      onClick={onClick}
    >
      <Plus size={16} /> Add Book
    </Button>
  );
}

export default AddBtn;
