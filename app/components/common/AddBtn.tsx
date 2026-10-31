'use client'
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

function AddBtn() {
  const router = useRouter()
  const handleClick = () => {
    router.push('/books/new')
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="default" size="lg" className="w-40" />}
      >
        <Plus size={16} /> Add Book
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`max-w-lg`}>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleClick}>Add Book Manually</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => console.log("Add Book With AI clicked")}
          >
            Add Book With AI
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AddBtn;
