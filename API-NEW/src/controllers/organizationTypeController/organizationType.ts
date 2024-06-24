import { HttpException } from "@/exceptions/HttpException.js";
import { jsonify } from "@/services/jsonify.js";
import { logger } from "@/utils/logger.js";
import { OrgType, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const saveOrgType = async (req: Request, res: Response, next: NextFunction) => {
    const prisma = new PrismaClient();
    try {

        const {org_type, type_desc} = req.body as OrgType
        const FIELDS_MISSING: string = "Some fields are missing"
        const METHOD_FAILED: string = "Unable to create org type"

        if (!org_type || !type_desc) {
            throw new HttpException(StatusCodes.BAD_REQUEST, FIELDS_MISSING)
        }

        const orgTypeResponse = await prisma.orgType.create({
            data: {
                org_type,
                type_desc
            },
        })

        if (!orgTypeResponse) throw new HttpException(StatusCodes.NOT_IMPLEMENTED, METHOD_FAILED);

        await prisma.$disconnect()

        //To avoid "cannot serialize BIGINT problem"
        const updatedData = jsonify(orgTypeResponse)

        res.status(StatusCodes.OK).json({data: updatedData, message: "Successfully created org type"})
        
    } catch (error) {

        await prisma.$disconnect();
        logger.error(error.message);
        next(new HttpException(error.status, error.status ? error.message : 'Failed to create org type'));
        
    }
}

export const getOrgType = async (req: Request, res: Response, next: NextFunction) => {
    const prisma = new PrismaClient();
    try {

        const NOT_FOUND: string = "No org types found"

        const orgTypes = await prisma.orgType.findMany();

        if (!orgTypes) throw new HttpException(StatusCodes.NOT_FOUND, NOT_FOUND)

        await prisma.$disconnect()

        const updatedData = jsonify(orgTypes)

        res.status(StatusCodes.OK).json({data: updatedData, message: "Org types retrieved successfully"})
        
    } catch (error) {

        await prisma.$disconnect();
        logger.error(error.message)
        next(new HttpException(error.status, error.status ? error.message : "Failed to get org type"))
        
    }
}