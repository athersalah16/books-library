import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
function CategorySelector({ selectedCategory, setSelectedCategory, categories }: { selectedCategory: string; setSelectedCategory: (value: string) => void; categories: string[] }) {
  return (
    <div className="w-full md:max-w-xs py-6">

      <DropdownMenu >
        <DropdownMenuTrigger
          render={<Button variant="default" size="lg" className="w-40" />}
        >
        Filter By Category   <ChevronDown size={16}/>

        </DropdownMenuTrigger>
        <DropdownMenuContent className={`max-w-lg`}>
          <DropdownMenuGroup>
            {categories.map((category, index) => (<DropdownMenuItem key={index + 1}>
              {category}
            </DropdownMenuItem>))}


          </DropdownMenuGroup>

        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default CategorySelector
