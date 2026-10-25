export interface Book {
  user_id: string;
  title: string;
  category: string;
  author: string;
  location: string;
  shelf_number: string;
  language: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export type BookFormValues = {
  title: string;
  category: string;
  author: string;
  shelf_number: string;
  location: string;
  language: string;
};
export type BookFormDialogProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  mode: "create" | "edit";
  initialBook?: Book | null;
  onSave: (values: BookFormValues) => Promise<void> | void;
};

export type BooksFields = {
  name: keyof BookFormValues;
  label: string;
  placeholder: string;
};
