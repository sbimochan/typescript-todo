import * as cors from 'cors';
import * as express from 'express';

import routes from './routes';

const app = express();

app.use(cors());

// API Routes
app.use('/', routes);
