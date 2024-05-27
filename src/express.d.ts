declare namespace Express {
  interface Request {
    user?: {
      id: number;
      role: 'USER' | 'SELLER';
    };
    file?: Multer.File;
  }
}