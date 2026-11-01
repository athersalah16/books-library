"use client";
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
import { useState } from "react";
import AddBtnAI from "./AddBtnAI";

function AddBtn() {
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const handleClick = () => {
    router.push("/books/new");
  };
  return (
    <>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="default" size="lg" className="w-40" />}
        >
          <Plus size={16} /> Add Book
        </DropdownMenuTrigger>
        <DropdownMenuContent className={`max-w-lg`}>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleClick}>
              Add Book Manually
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenDialog(true)}>
              Add Book With AI
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {openDialog && <AddBtnAI open={openDialog} onOpenChange={setOpenDialog} />}
    </>
  );
}

export default AddBtn;
