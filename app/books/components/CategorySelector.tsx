"use client";
import { categories } from "@/app/utils/categories";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

type Props = {
  mode?: "add" | "filter";
  value: string;
  onValueChange: (value: string) => void;
};

function CategorySelector({
  mode,
  value,
  onValueChange,
}: Props) {
  


  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="default"
            size="lg"
            className={`${mode === "add" ? "w-full" : "w-40"}`}
          />
        }
      >
        {value || "Select Category"}

        <ChevronDown size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-lg">
        <DropdownMenuGroup>
          {categories.map((category) => (
            <DropdownMenuItem
              onClick={() => onValueChange(category)}
              key={category}
            >
              {category}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CategorySelector;
