import { HttpException } from "@/exceptions/HttpException.js";
import { logger } from "@/utils/logger.js";
import { PrismaClient,User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt';
import { jsonify } from "@/services/jsonify.js";
import jwt from 'jsonwebtoken';
import { JWT_SECRET, EXPIRY_TIME, NODE_ENV } from '@/config/index.js';
import { compare } from 'bcrypt';
import { TokenData } from '@/types/auth.js';

//all get 
export const getAllUsersForOrgId = async (req: Request, res: Response, next: NextFunction) => {
    const prisma = new PrismaClient();
    try {
        const org_id = parseInt(req.params.org_id, 10); // Parse org_id as an integer with base 10
        if (isNaN(org_id)) {
            throw new HttpException(StatusCodes.BAD_REQUEST, "Invalid organization ID");
        }

        const NOT_FOUND = "Organization not found";

        // Retrieve users for the specified organization ID
        const users = await prisma.user.findMany({
            where: { org_id: org_id }, // Use the extracted org_id in the where condition
        });

        // Check if any users were found
        if (!users || users.length === 0) {
            throw new HttpException(StatusCodes.NOT_FOUND, NOT_FOUND);
        }

        // Convert BigInt values into strings
        const stringifiedUsers = users.map(user => ({
            ...user,
            user_id: user.user_id.toString(), // Convert user_id to string
            org_id: user.org_id.toString(), // Convert org_id to string
            role_id: user.role_id.toString() // Convert role_id to string
        }));

        res.status(StatusCodes.OK).json({ data: stringifiedUsers, message: "Retrieved users successfully" });
    } catch (error) {
        logger.error(error.message);
        next(new HttpException(error.status || StatusCodes.INTERNAL_SERVER_ERROR, error.message || 'Failed to get users'));
    } finally {
        await prisma.$disconnect();
    }
};

//save
const SALT_ROUNDS = 10;
export const saveUser = async (req: Request, res: Response, next: NextFunction) => {
    const prisma = new PrismaClient();
    const { user_name, role_id, password, org_id } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Save the new user with the hashed password
        const newUser = await prisma.user.create({
            data: {
                user_name,
                password: hashedPassword,
                org_id: BigInt(org_id),
                role_id: BigInt(role_id),
            }
        });

        await prisma.$disconnect();

        res.status(StatusCodes.CREATED).json({ data: jsonify(newUser), message: "User created successfully" });
    } catch (error) {
        await prisma.$disconnect();
        logger.error(error.message);
        next(new HttpException(error.status || StatusCodes.INTERNAL_SERVER_ERROR, error.message || 'Failed to create user'));
    }
};

//login
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const prisma = new PrismaClient();
    const { user_name, password } = req.body;

    try {
        // Find the user by user_name
        const user = await prisma.user.findFirst({
            where: { user_name }
        });

        if (!user) {
            throw new HttpException(StatusCodes.UNAUTHORIZED, 'Invalid username or password');
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new HttpException(StatusCodes.UNAUTHORIZED, 'Invalid username or password');
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.user_id.toString() }, JWT_SECRET, { expiresIn: '1h' });

        await prisma.$disconnect();

        // Send the token as a response
        res.status(StatusCodes.OK).json({ token });
    } catch (error) {
        await prisma.$disconnect();
        logger.error(error.message);
        next(new HttpException(error.status || StatusCodes.INTERNAL_SERVER_ERROR, error.message || 'Failed to login'));
    }
};