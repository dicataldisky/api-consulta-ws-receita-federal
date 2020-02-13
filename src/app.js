import 'dotenv/config';

import express from 'express';
import Youch from 'youch';
import cors from 'cors';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';

import routes from './routes';

class App {
  constructor() {
    this.server = express();

    this.middleware();
    this.routes();
    this.exceptionHandler();
  }

  middleware() {
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(express.json());

    if (process.env.NODE_ENV !== 'development') {
      this.server.use(
        new RateLimit({
          windowMs: 1000 * 60 * 15,
          max: 100,
        })
      );
    }
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJson();
        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
