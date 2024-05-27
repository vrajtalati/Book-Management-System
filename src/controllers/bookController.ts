// src/controllers/bookController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { parseCSV } from '../utils/csvParse';
import fs from 'fs';

const prisma = new PrismaClient();

export const uploadBooks = async (req: Request, res: Response) => {
  const sellerId = req.user?.id;
  const filePath:any = req.file?.path;
  

  if (!sellerId) {
    return res.status(403).json({ error: 'Seller ID not found' });
  }

  try {
    const books = await parseCSV(filePath);

    for (const book of books) {
      await prisma.book.create({
        data: {
          ...book,
          sellerId
        }
      });
    }

    fs.unlinkSync(filePath);

    res.status(201).json({ message: 'Books uploaded successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error uploading books' });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany();
    const uniqueBooks = books.reduce((acc, book) => {
      const key = `${book.title}-${book.author}`;
      if (!acc[key]) {
        acc[key] = book;
      }
      return acc;
    }, {} as Record<string, typeof books[0]>);

    res.json(Object.values(uniqueBooks));
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve books' });
  }
};

export const getBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const book = await prisma.book.findUnique({ where: { id: Number(id) } });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve book' });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const sellerId = req.user?.id;

  try {
    const book = await prisma.book.findUnique({ where: { id: Number(id) } });

    if (!book || book.sellerId !== sellerId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updatedBook = await prisma.book.update({
      where: { id: Number(id) },
      data: req.body
    });

    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update book' });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const sellerId = req.user?.id;

  try {
    const book = await prisma.book.findUnique({ where: { id: Number(id) } });

    if (!book || book.sellerId !== sellerId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await prisma.book.delete({ where: { id: Number(id) } });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
};


