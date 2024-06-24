import { TokenData } from '@/types/auth.js';
import { PrismaClient } from '@prisma/client';

export const validateTokenData = async (tokenData: TokenData) => {
  const { userId } = tokenData;
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({ where: { user_id: userId } });
  await prisma.$disconnect();
  return user;
};
