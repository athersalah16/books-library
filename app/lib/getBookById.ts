'use server';

import { createConnection } from './createConnection';
import { Book } from '../types/book';

export async function getBookById(bookId: string): Promise<Book> {
  const supabase = await createConnection();

  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', bookId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
