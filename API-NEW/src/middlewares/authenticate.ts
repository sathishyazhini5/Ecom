import { HttpException } from '@/exceptions/HttpException.js';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JWT_SECRET } from '@/config/index.js';
import jwt from 'jsonwebtoken';
import { TokenData } from '@/types/auth.js';
import { logger } from '@/utils/logger.js';
import { validateTokenData } from '@/services/auth.js';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokenString =
      req.cookies.auth ||
      (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
    if (tokenString) {
      const tokenData = jwt.verify(tokenString, JWT_SECRET) as TokenData;
      if (tokenData.role !== 'admin')
        throw new HttpException(StatusCodes.BAD_REQUEST, 'Request unauthorized');
      const user = await validateTokenData(tokenData);
      if (user) {
        // res.locals is used to save records to pass it next middleware
        // user and org are being passed so that the next middleware does not need to query
        res.locals.user = user;
        next();
      } else {
        logger.warn(`Authentication failed in authenticate middleware.
          Cannot find user with user id ${tokenData.userId}`);
        next(new HttpException(StatusCodes.UNAUTHORIZED, 'Invalid token.'));
      }
    } else {
      next(new HttpException(StatusCodes.UNAUTHORIZED, 'Invalid token'));
    }
  } catch (error) {
    logger.error(error.message);
    next(new HttpException(StatusCodes.UNAUTHORIZED, 'Invalid token'));
  }
};
