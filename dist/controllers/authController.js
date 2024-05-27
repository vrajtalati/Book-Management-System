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
exports.loginSeller = exports.loginUser = exports.registerSeller = exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        yield prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(400).json({ error: 'User registration failed' });
    }
});
exports.registerUser = registerUser;
const registerSeller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        yield prisma.seller.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        res.status(201).json({ message: 'Seller registered successfully' });
    }
    catch (error) {
        res.status(400).json({ error: 'Seller registration failed' });
    }
});
exports.registerSeller = registerSeller;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const validPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: 'USER' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});
exports.loginUser = loginUser;
const loginSeller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const seller = yield prisma.seller.findUnique({ where: { email } });
        if (!seller) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const validPassword = yield bcryptjs_1.default.compare(password, seller.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: seller.id, role: 'SELLER' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Login Succesfull",
            token: token
        });
        // res.json({ token });
    }
    catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});
exports.loginSeller = loginSeller;
