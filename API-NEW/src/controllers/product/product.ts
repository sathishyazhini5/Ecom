import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpException } from '@/exceptions/HttpException.js';
import { logger } from '@/utils/logger.js';
import { jsonify } from '@/services/jsonify.js';

const prisma = new PrismaClient();

interface SaveProductInput {
  product_name: string;
  product_desc?: string;
  product_type_id?: number;
  category_id?: number;
  sub_category_id?: number;
  manuf_price?: number;
  retail_price?: number;
  product_unique_no?: number;
  org_id: number;
  reward_points?: number;
  img_urls?: string[]; // Array of image URLs
}

export const saveProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { 
      product_name, 
      product_desc, 
      product_type_id, 
      category_id, 
      sub_category_id, 
      manuf_price, 
      retail_price, 
      product_unique_no, 
      org_id, 
      reward_points 
    } = req.body;

    // Convert necessary fields to the correct types
    const productData: SaveProductInput = {
      product_name,
      product_desc,
      product_type_id: product_type_id ? parseInt(product_type_id) : undefined,
      category_id: category_id ? parseInt(category_id) : undefined,
      sub_category_id: sub_category_id ? parseInt(sub_category_id) : undefined,
      manuf_price: manuf_price ? parseFloat(manuf_price) : undefined,
      retail_price: retail_price ? parseFloat(retail_price) : undefined,
      product_unique_no: product_unique_no ? parseInt(product_unique_no) : undefined,
      org_id: parseInt(org_id), // org_id is required, so directly parsing it
      reward_points: reward_points ? parseInt(reward_points) : undefined,
      img_urls: (req.files as Express.Multer.File[]).map(file => `/uploads/${file.filename}`),
    };

    // Save product using Prisma
    const product = await prisma.product.create({
      data: productData,
    });

    res.status(StatusCodes.CREATED).json({ data: jsonify(product), message: 'Product created successfully' });
  } catch (error) {
    logger.error(`Error creating product: ${error.message}`, { stack: error.stack });
    next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, `Failed to create product: ${error.message}`));
  } finally {
    await prisma.$disconnect();
  }
};

// Function to get products
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await prisma.product.findMany();

    res.status(StatusCodes.OK).json({ data: jsonify(products), message: 'Products retrieved successfully' });
  } catch (error) {
    logger.error(`Error retrieving products: ${error.message}`, { stack: error.stack });
    next(new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, `Failed to retrieve products: ${error.message}`));
  } finally {
    await prisma.$disconnect();
  }
};
