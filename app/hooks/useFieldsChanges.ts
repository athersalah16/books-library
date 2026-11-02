import { BookFormValues } from "../types/book";
function useFieldsChanges(
  setFormValues: React.Dispatch<React.SetStateAction<BookFormValues>>,
) {
  const handleFieldChange = (field: keyof BookFormValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));
  };
  const handleCategoryChange = (category: string) => {
    setFormValues((current) => ({ ...current, category }));
  };
  return {handleCategoryChange,handleFieldChange};
}

export default useFieldsChanges;
