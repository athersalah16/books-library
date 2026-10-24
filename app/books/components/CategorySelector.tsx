import React from 'react'

function CategorySelector({ selectedCategory, setSelectedCategory, categories }: { selectedCategory: string; setSelectedCategory: (value: string) => void; categories: string[] }) {
  return (
     <div className="w-full md:max-w-xs py-6">
            <label
              htmlFor="category-filter"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Category
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
  )
}

export default CategorySelector
