import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Import your route handlers
import kpiRoutes from './routes/kpi.js';
import productRoutes from './routes/product.js';
import transactionRoutes from './routes/transaction.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());  // Body parser is included with express in newer versions
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'));
app.use(cors({
  origin: '*',  // Adjust this as necessary for your front-end app
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api/kpi', kpiRoutes);
app.use('/api/product', productRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/auth', authRoutes);

// Default root route to avoid 404 for '/'
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Connect to MongoDB
const PORT = process.env.PORT || 9000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((error) => {
  console.error('MongoDB connection failed:', error.message);
});

// Export the app for testing purposes
export default app;
