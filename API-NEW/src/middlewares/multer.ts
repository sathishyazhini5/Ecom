import multer from 'multer';
import path from 'path';
import { Request } from 'express';

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/')); // Adjust path as needed
  },
  filename: (req: Request, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + ext); // Generate unique filename
  }
});

// File filter configuration (optional: restrict file types)
const fileFilter = (req: Request, file: { mimetype: string }, cb: (error: Error | null, acceptFile: boolean) => void) => {
  // Allow only images
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed.'), false);
  }
};

// Initialize multer instance
const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // Limit files to 5MB each (adjust as needed)
});

export { upload };
