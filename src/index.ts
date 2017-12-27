import * as cors from 'cors';
import * as express from 'express';

import config from './config/config';

import routes from './routes';

const app = express();

app.use(cors());

// API Routes
app.use('/api', routes);

app.listen(config.app.port, () =>
  console.log(`Listening on port ${config.app.baseUrl}`)
);

export default app;
