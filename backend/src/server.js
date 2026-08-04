require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false
}));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Servir la carpeta de imágenes subidas de forma estática
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
const authRoutes = require('./routes/auth.routes');
const uploadRoutes = require('./routes/upload.routes');
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

// Test Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Jewelry Prime API is running secure.' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running securely on http://localhost:${PORT}`);
});
