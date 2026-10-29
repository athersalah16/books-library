"use client";
import { useBooksContext } from "@/app/context/BooksContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

function CategorySelector({
  mode,
  value,
  onValueChange,
}: {
  mode?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  const context = useBooksContext();
  const selectedCategory = value ?? context.selectedCategory;
  const setSelectedCategory = onValueChange ?? context.setSelectedCategory;
  const categories: string[] = [
    "القرآن الكريم وعلومه",
    "التفسير",
    "الحديث",
    "السنة النبوية",
    "الفقه",
    "العقيدة",
    "الشريعة الإسلامية",
    "التزكية",
    "السيرة النبوية",
    "أصول الفقه",
    "اللغة العربية",
    "تطوير الذات",
    "علم النفس",
    "التاريخ",
    "الفكر والثقافة",
    "الإنتاجية وإدارة الوقت",
    "التربية والأسرة",
    "العلوم والمعارف العامة",
    "أخرى",
  ];
  const handleClick = (category: string) => {
    setSelectedCategory(category);
  };
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
        { mode === "add" && selectedCategory
          ? selectedCategory
          : mode === "add"
            ? "Select the Category"
            : "Filter By Category"}

        <ChevronDown size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`max-w-lg`}>
        <DropdownMenuGroup>
          {categories.map((category, index) => (
            <DropdownMenuItem
              onClick={() => handleClick(category)}
              key={index + 1}
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
