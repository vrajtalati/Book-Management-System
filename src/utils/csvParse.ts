
import fs from 'fs';
import { parse } from 'csv-parse';

interface Book {
  title: string;
  author: string;
  price: number;
}

export const parseCSV = (filePath: string): Promise<Book[]> => {
  return new Promise((resolve, reject) => {
    const books: Book[] = [];

    fs.createReadStream(filePath)
      .pipe(parse({ columns: true }))
      .on('data', (row) => {
        books.push({
          title: row.title,
          author: row.author,
          price: parseFloat(row.price)
        });
      })
      .on('end', () => {
        resolve(books);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};
