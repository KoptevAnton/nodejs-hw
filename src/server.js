import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import env from './utils/env.js';
import contactsRouter from './routers/contacts.js';

const setupServer = () => {
  const app = express();
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.use(contactsRouter);

  app.use((req, res, next) => {
    res.status(404).json({
      status: 404,
      message: 'Not found',
      error: `This resource ${req.url} not found`,
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      status: 500,
      message: 'Something went wrong',
      error: err.message,
    });
  });

  const port = Number(env('PORT', 3000));

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

export default setupServer;
