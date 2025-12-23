import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import rateLimit from "express-rate-limit";
import { dbConnect } from './config/db.config.js';
import administerRouter from './routes/administer.route.js';
import employeeRouter from './routes/employee.route.js';

dbConnect();
const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

app.use(cookieParser())
app.use(bodyParser.json());

app.get('/',(req, res)=>{
    res.send("Hello word");
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many request, Please try again after 15 minutes",
});

app.use(limiter);

app.use('/api/auth',administerRouter);
app.use('/api/employee',employeeRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});
