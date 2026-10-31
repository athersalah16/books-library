export const validateData = (data: any) => {
  if (
    !data.title.trim() ||
    !data.author.trim() ||
    !data.location.trim() ||
    !data.language.trim() ||
    !data.shelf_number||
    !data.category.trim()
  ) {
    return false;
  }
  return true;
};
