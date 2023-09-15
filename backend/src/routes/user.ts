import express from 'express';
import { User } from '../models/user';
import crypto from 'crypto';

const router = express.Router();

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { username, password, name, role, additional_data } = req.body;
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    const user = new User({
      username,
      password: hashedPassword,
      name,
      role,
      additional_data,
    });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated successfully', user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
