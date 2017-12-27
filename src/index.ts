import * as cors from 'cors';
import * as express from 'express';

import routes from './routes';

const app = express();

app.use(cors());

// API Routes
app.use('/', routes);

app.listen(8000, () => console.log(`Listening on port http://localhost:${8000}`))

export default app;
