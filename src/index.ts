import express, { Express, Request, Response } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoute from './routes/users.route';
import authRoute from './routes/auth.route';
import errorHandler, { pagesFolder } from './middleware/handleErrors.middleware';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, () => {
  console.log('connected to mongo db');
});

app.use(cors());
app.use(morgan('common'));
app.use(express.json());

app.use('/users', userRoute);
app.use('/auth', authRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('hello interexy!');
});

app.get('*', (req: Request, res: Response) => {
  console.log(req.headers);
  res.sendFile(__dirname + '/pages/errorPage.html');
  res.sendFile(pagesFolder + '404Page.html');
});

app.use('*', errorHandler);
app.listen(port, () => {
  console.log(`Backend Server is running at port ${port}`);
});
