import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";
import path from 'path';
import {authenticateToken} from "../middleware/authenticateToken.js";

const prisma = new PrismaClient();

export const register = async (req, res) => {
  const { email, password, phone, name } = req.body;

  let image = null;

  if (req.files && req.files.image) {
    const file = req.files.image;

    const uploadPath = path.join(__dirname, 'uploads', file.name);

    try {
      await file.mv(uploadPath);
      image = file.name; 
    } catch (err) {
      return res.status(500).json({ error: 'Failed to upload image.' });
    }
  }

  try {
    
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        phone,
        image,
        name,
      },
    });
    console.log(newUser)
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to register user.' });
  }
};

  export const login = async (req, res) => { 
    const { email, password } = req.body;
  
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const user_id = user.id
      const token = jwt.sign({ userId: user.id, email: user.email }, 'ianbom123', { expiresIn: '1h' }); //payload
      await prisma.user.update({
        where: { id: user.id },
        data: { token },
      });
  
      res.json({ message: 'Login successful', token,  user_id});
      console.log('Tess', user_id, token)
    } catch (error) {
      res.status(500).json({ error: 'Failed to login' });
    }
  }

  export const updateProfile = async (req, res) => {
    const { name, phone } = req.body;
  
    try {
      let imagePath = null; // Default to null if no image is provided
  
      // If a file was uploaded, update the imagePath with the file path
      if (req.file) {
        imagePath = `/uploads/${req.file.filename}`; // Path relative to server root
      } else if (req.body.image) {
        // If an image path is already provided in the request body, use it
        imagePath = req.body.image;
      }
  
      const user = await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: {
          name,
          phone,
          image: imagePath,
        },
      });
      
      console.log('Updated user:', user);
      res.status(200).json(user);
    } catch (error) {
      console.error('Failed to update user:', error.message);
      res.status(400).json({ msg: error.message });
    }
  };
  
  
  
  export const profile = async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: { id: true, email: true, name: true, phone: true, image: true },
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  