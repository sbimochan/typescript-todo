import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as responseTime from 'response-time';

import routes from './routes';
import config from './config/config';
import * as errorHandler from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(responseTime());
app.use(bodyParser.json());

// API Routes
app.use('/api', routes);

// Error Middlewares
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.notFoundError);

app.listen(config.app.port, config.app.host, () => {
  console.log(`Listening on http://${config.app.host}:${config.app.port}/api`);
});

export default app;
