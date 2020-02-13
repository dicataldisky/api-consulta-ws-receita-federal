import { Router } from 'express';

import ReceitaFederalController from './app/controllers/ReceitaFederalController';

const routes = new Router();

routes.get('', (req, res) =>
  res.json({
    Version: '1.0.0.',
  })
);

routes.get('/rf/:document', ReceitaFederalController.index);

export default routes;
