import * as client from 'knex';

import config from './config';

/**
 * Database connection.
 */
const knex = client(config.database);

export default knex;
