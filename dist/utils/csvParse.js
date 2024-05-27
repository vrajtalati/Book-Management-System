"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCSV = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parse_1 = require("csv-parse");
const parseCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const books = [];
        fs_1.default.createReadStream(filePath)
            .pipe((0, csv_parse_1.parse)({ columns: true }))
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
exports.parseCSV = parseCSV;
