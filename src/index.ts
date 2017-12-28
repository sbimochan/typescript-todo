import * as cors from 'cors';
import * as express from 'express';

import config from './config/config';

import routes from './routes';

import * as errorHandler from './middlewares/errorHandler';

const app = express();

app.use(cors());

// API Routes
app.use('/api', routes);

// Error Middlewares
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.notFoundError);

app.listen(config.app.port, () => {
  console.log(`Listening on port ${config.app.baseUrl}`);
});

export default app;
