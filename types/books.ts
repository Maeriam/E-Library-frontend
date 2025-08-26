// app/types/books.ts

export interface Book {
  id: string; // If backend sends _id, change this to _id: string
  title: string;
  author: string;
  publisher: string;
  category: string;
  cover_image?: string; // optional, just like in backend
  downloadable?: boolean;
}
