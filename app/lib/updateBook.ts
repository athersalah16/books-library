'use server';

import { createConnection } from './createConnection';
import { Book, BookFormValues } from '../types/book';

export async function updateBook(bookId: string, values: BookFormValues): Promise<Book> {
  const supabase = await createConnection();

  const { data, error } = await supabase
    .from('books')
    .update(values)
    .eq('id', bookId)
    .select('*')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
