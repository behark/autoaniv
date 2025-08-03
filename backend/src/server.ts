import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import 'express-async-errors';

import { connectDB } from './config/database';
import { errorHandler, notFound } from './middleware/errorMiddleware';
import { setupUploads } from './config/uploads';

// Import routes
import vehicleRoutes from './routes/vehicles';
import brandRoutes from './routes/brands';
import contactRoutes from './routes/contact';
import authRoutes from './routes/auth';
import statsRoutes from './routes/stats';
import seoRoutes from './routes/seo';
import uploadRoutes from './routes/uploads';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Setup uploads directory
setupUploads();

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'http://localhost:3000',
    process.env.ADMIN_URL || 'http://localhost:3001'
  ],
  credentials: true
}));
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AutoAni API',
      version: '1.0.0',
      description: 'AutoAni automotive dealership API',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://api.autoani.com' 
          : `http://localhost:${PORT}`,
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/uploads', uploadRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📖 API Documentation: http://localhost:${PORT}/api-docs`);
  });
}

export default app;
