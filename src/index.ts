import express, { Express, Request, Response } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoute from './routes/users.route';
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, () => {
  console.log('connected to mongo db');
});

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/users', userRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('hello interexy!');
});

app.use('*', errorHandler);
app.listen(port, () => {
  console.log(`Backend Server is running at port ${port}`);
});
