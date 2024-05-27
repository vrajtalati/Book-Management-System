import express from 'express';
import { Request, Response } from 'express';
import authRoutes from './routes/authRoutes';
import bookRoutes from './routes/bookRoute';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.get("/",(req:Request,res:Response)=>{
  res.send("hello from server") 
})
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
