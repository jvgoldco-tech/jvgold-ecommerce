require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const rateLimit = require('express-rate-limit');

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

// Rate Limiting para Autenticación
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // Límite de 10 peticiones por IP en la ventana
  message: { message: 'Demasiados intentos. Por favor, inténtelo de nuevo más tarde.' }
});

// Routes
const authRoutes = require('./routes/auth.routes');
const uploadRoutes = require('./routes/upload.routes');
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/upload', uploadRoutes);

// Test Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'JV GOLD & CO LLC API is running secure.' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running securely on http://localhost:${PORT}`);
});
