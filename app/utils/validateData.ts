export const validateData = (formValues: any) => {
  if (
    !formValues.title.trim() ||
    !formValues.author.trim() ||
    !formValues.location.trim() ||
    !formValues.language.trim() ||
    !formValues.shelf_number.trim()
  ) {
    return false;
  }
  return true;
};
