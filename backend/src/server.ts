// Server entry point 
import express from 'express';
import { connectDB } from './utils/database';
import { setupExpress } from './config';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';

const app = express();
const PORT = 3000;

// Configuración de Express y Passport
setupExpress(app);

// Conexión a MongoDB
connectDB();

// Rutas
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
