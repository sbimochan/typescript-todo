/**
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('name');
    table.string('email').unique();
    /* table
      .timestamp('created_at')
      .notNull()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updated_at').notNull(); */
    table.timestamps(true, true);
  });
}

/**
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('users');
}
