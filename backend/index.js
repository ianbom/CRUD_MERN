import express from "express";
import cors from "cors"; 
import dotenv from "dotenv"; 
import ProductRoute from "./routes/ProductRoute.js";
import KategoriRoute from "./routes/KategoriRoute.js";
import BarangRoute from "./routes/BarangRoute.js";
import AuthRoute from "./routes/AuthRoutes.js";
import RoomRoute from "./routes/RoomRoutes.js"
import PsRoute from "./routes/PSRoute.js";
import TransactionRoute from "./routes/TransactionRoute.js";

dotenv.config(); 
const app = express(); 

app.use(cors());
app.use(express.json());
app.use(ProductRoute);
app.use(KategoriRoute);
app.use(BarangRoute);
app.use(AuthRoute);
app.use(RoomRoute); 
app.use(PsRoute)
app.use(TransactionRoute)
app.use('/uploads', express.static('uploads'));

//   const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
  
//     if (!token) return res.sendStatus(401);
  
//     jwt.verify(token, 'ianbom123', (err, user) => {
//       if (err) return res.sendStatus(403);
//       req.user = user;
//       next();
//     });
//   };
  
//   app.get('/protected-route', authenticateToken, (req, res) => {
//     res.json({ message: 'You are authenticated!' });
//   });


app.listen(process.env.APP_PORT, ()=> { 
    console.log('Server running in port 5000...')
}); 

