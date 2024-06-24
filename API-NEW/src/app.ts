import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { LOG_FORMAT, NODE_ENV, PORT } from './config/index.js';
import { logger, stream } from './utils/logger.js';
import { productRouter } from './routes/productroute.js';
import { errorMiddleware } from './middlewares/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();

app.use(morgan(LOG_FORMAT, { stream }));

// Apply CORS middleware
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(hpp());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Healthcheck route
app.get('/healthcheck', (req: Request, res: Response) => {
  res.send('Online');
});

// Serve static files from the uploads directory with proper CORS headers
const uploadsPath = path.join(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsPath, {
  setHeaders: (res, path, stat) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.set('Access-Control-Allow-Credentials', 'true');
  }
}));

// Log the contents of the uploads directory
fs.readdir(uploadsPath, (err, files) => {
  if (err) {
    console.error('Unable to scan directory:', err);
  } else {
    console.log('Files in uploads directory:', files);
  }
});

// Log file serving details for debugging
app.use('/uploads', (req: Request, res: Response, next: NextFunction) => {
  const filePath = path.join(uploadsPath, req.path);
  logger.info(`Serving file: ${filePath}`);
  if (!fs.existsSync(filePath)) {
    logger.error(`File not found: ${filePath}`);
    res.status(404).send('File not found');
    return;
  }
  next();
});

// Load routers
const apiPath = '/api';
app.use(apiPath, productRouter);

// Configure error handling
app.use(errorMiddleware);

// Log incoming requests and their headers
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  logger.info('Request headers:', req.headers);
  next();
});

// Log responses
app.use((req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send.bind(res);
  res.send = (body: any) => {
    logger.info(`Response status: ${res.statusCode}`);
    logger.info('Response headers:', res.getHeaders());
    originalSend(body);
    return res; // Ensure we return res to match the expected type
  };
  next();
});

app.listen(PORT, () => {
  logger.info(`======= ENV: ${NODE_ENV} =======`);
  logger.info(`🚀 App listening on the port ${PORT}`);
});
