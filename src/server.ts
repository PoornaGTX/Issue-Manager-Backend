import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import cors from 'cors';

import morgan from 'morgan';

import connectDB from './db/connect';

// routers
import authRouter from './routes/authRoutes';
import issueRouter from './routes/issueRoutes';
import userRouter from './routes/usersRoutes';

// middleware
import errorHandlerMiddleware from './middleware/error-handler';
import notFoundMiddleware from './middleware/not-found';
import authenticateUser from './middleware/auth';

const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome' });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/issue', authenticateUser, issueRouter);
app.use('/api/v1/user', authenticateUser, userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    if (process.env.MONGO_URL) {
      await connectDB(process.env.MONGO_URL);
      app.listen(port, () => {
        console.log(`Server is listing on port : ${port}`);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

start();

export default app;
