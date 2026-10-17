export interface Book {
  id: string;
  title: string;
  category: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface BookFormValues {
  title: string;
  category: string;
  location: string;
}
 export type BookFormDialogProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  mode: "create" | "edit";
  initialBook?: Book | null;
  onSave: (values: BookFormValues) => Promise<void> | void;
};