import { HttpException } from "@/exceptions/HttpException.js";
import { jsonify } from "@/services/jsonify.js";
import { logger } from "@/utils/logger.js";
import { Organization, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const saveOrganization = async (req: Request, res: Response, next: NextFunction) => {
    const prisma = new PrismaClient();

    try {

        const {org_name, pan_no, gst_no, org_type_id, logo_path, website, email_id, home_url} = req.body as Organization
        const data: Organization = req.body
        const MISSING_FIELDS: string = "Some fields are missing"
        const METHOD_FAILED: string = "Unable to create organization"
        
        if (!org_name || !org_type_id || !email_id) throw new HttpException(StatusCodes.BAD_REQUEST, MISSING_FIELDS)

        const orgResponse = await prisma.organization.create({
            data
        })

        if (!orgResponse) throw new HttpException(StatusCodes.NOT_IMPLEMENTED, METHOD_FAILED)

        await prisma.$disconnect();

        const updatedData = jsonify(orgResponse)

        res.status(StatusCodes.OK).json({data: updatedData, message: "Successfully created organization"})
        
    } catch (error) {

        await prisma.$disconnect();
        logger.error(error.message);
        next(new HttpException(error.status, error.status ? error.message : "Failed to create organization"))

        
    }
}

export const getAllOrganization = async (req: Request, res: Response, next: NextFunction) => {
    const prisma = new PrismaClient();

    try {

        const METHOD_FAILED = "Unable to get organizations"

        const orgResponse = await prisma.organization.findMany()

        if (!orgResponse) throw new HttpException(StatusCodes.NOT_FOUND, METHOD_FAILED)

        await prisma.$disconnect();

        const updatedData = jsonify(orgResponse)

        res.status(StatusCodes.OK).json({data: updatedData, message: "Organizations retrieved successfully"})
        
    } catch (error) {

        await prisma.$disconnect();
        logger.error(error.message);
        next(new HttpException(error.status, error.status ? error.message : "Failed to get organization"))
        
    }
}