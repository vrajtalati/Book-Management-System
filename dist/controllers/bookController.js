"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBook = exports.getBooks = exports.uploadBooks = void 0;
const client_1 = require("@prisma/client");
const csvParse_1 = require("../utils/csvParse");
const fs_1 = __importDefault(require("fs"));
const prisma = new client_1.PrismaClient();
const uploadBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const sellerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const filePath = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
    if (!sellerId) {
        return res.status(403).json({ error: 'Seller ID not found' });
    }
    try {
        const books = yield (0, csvParse_1.parseCSV)(filePath);
        for (const book of books) {
            yield prisma.book.create({
                data: Object.assign(Object.assign({}, book), { sellerId })
            });
        }
        fs_1.default.unlinkSync(filePath);
        res.status(201).json({ message: 'Books uploaded successfully' });
    }
    catch (error) {
        res.status(400).json({ error: 'Error uploading books' });
    }
});
exports.uploadBooks = uploadBooks;
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield prisma.book.findMany();
        const uniqueBooks = books.reduce((acc, book) => {
            const key = `${book.title}-${book.author}`;
            if (!acc[key]) {
                acc[key] = book;
            }
            return acc;
        }, {});
        res.json(Object.values(uniqueBooks));
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve books' });
    }
});
exports.getBooks = getBooks;
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const book = yield prisma.book.findUnique({ where: { id: Number(id) } });
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve book' });
    }
});
exports.getBook = getBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { id } = req.params;
    const sellerId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
    try {
        const book = yield prisma.book.findUnique({ where: { id: Number(id) } });
        if (!book || book.sellerId !== sellerId) {
            return res.status(403).json({ error: 'Access denied' });
        }
        const updatedBook = yield prisma.book.update({
            where: { id: Number(id) },
            data: req.body
        });
        res.json(updatedBook);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update book' });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { id } = req.params;
    const sellerId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.id;
    try {
        const book = yield prisma.book.findUnique({ where: { id: Number(id) } });
        if (!book || book.sellerId !== sellerId) {
            return res.status(403).json({ error: 'Access denied' });
        }
        yield prisma.book.delete({ where: { id: Number(id) } });
        res.json({ message: 'Book deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete book' });
    }
});
exports.deleteBook = deleteBook;
