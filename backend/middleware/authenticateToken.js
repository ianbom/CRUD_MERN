import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    console.log('Token:', token); // Tambahkan log untuk melihat token
  
    if (!token) {
      console.log('No token provided');
      return res.sendStatus(401);
    }
  
    jwt.verify(token, 'ianbom123', (err, decoded) => {
        if (err) return res.sendStatus(403);
      
        console.log('Decoded Token:', decoded); // Cek struktur payload
        req.user = { id: decoded.userId };
        next();
      });
  };
  