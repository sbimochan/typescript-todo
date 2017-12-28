import * as client from 'knex';
import * as bookshelfJs from 'bookshelf';

import config from './config';

/**
 * Database connection.
 */
const knex = client(config.database);
const bookshelf = bookshelfJs(knex);

bookshelf.plugin([
  'virtuals',
  'pagination',
  'visibility',
  'bookshelf-camelcase'
]);

export default bookshelf;
