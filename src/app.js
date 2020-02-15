import 'dotenv/config';

import express from 'express';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import cors from 'cors';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';

import sentryConfig from './config/sentry';
import routes from './routes';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middleware();
    this.routes();
    this.exceptionHandler();
  }

  middleware() {
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());

    if (process.env.NODE_ENV !== 'development') {
      this.server.use(
        new RateLimit({
          windowMs: 6000,
          max: 2,
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
