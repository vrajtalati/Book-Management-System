
import { User, Seller } from '@prisma/client';

export type AuthenticatedUser = {
  id: number;
  role: 'USER' | 'SELLER';
} & (User | Seller);
