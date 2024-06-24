import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpException } from '@/exceptions/HttpException.js';
import { PrismaClient, User } from '@prisma/client';
import { JWT_SECRET, EXPIRY_TIME, NODE_ENV } from '@/config/index.js';
import { logger } from '@/utils/logger.js';
import { TokenData } from '@/types/auth.js';

const { sign } = jwt;

export const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const prisma = new PrismaClient();
  try {
    const { org_id, user_id } = req.body as User
    const MISSING_FIELDS: string = "Some fields are missing"
    
    const UNAUTHORIZED_MESSAGE = 'Incorrect user id or org id';

    if (!org_id || !user_id) {
      throw new HttpException(StatusCodes.BAD_REQUEST, MISSING_FIELDS);
    }

    // Check if user with given number exists
    const user = await prisma.user.findFirst({
      where: { org_id, user_id },
      include: {roles: true}
    });

    if (!user) throw new HttpException(StatusCodes.UNAUTHORIZED, UNAUTHORIZED_MESSAGE);
    // Using bcrypt algo, check if the given password when encrypted matches with the saved password hash
    // const isPasswordMatching: boolean = await compare(password, user.password);
    // if (!isPasswordMatching)
    //   throw new HttpException(StatusCodes.UNAUTHORIZED, UNAUTHORIZED_MESSAGE);

    // Create JWT token
    const tokenData: TokenData = { userId: Number(user.user_id), role: user.roles.role_name };
    const expiresIn = parseInt(EXPIRY_TIME);
    const token = sign(tokenData, JWT_SECRET, { expiresIn });
    
    await prisma.$disconnect();

    res.status(StatusCodes.OK).json({ data: user, token, message: 'Success' });
  } catch (error) {
    await prisma.$disconnect();
    logger.error(error.message);
    next(new HttpException(error.status, error.status ? error.message : 'Failed to login'));
  }
};
