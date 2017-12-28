/**
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('users')
    .del()
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('users').insert([
          {
            name: 'Sagar Chamling',
            email: 'sgr.raee@gmail.com'
          },
          {
            name: 'Safal Pandey',
            email: 'safal.pandey.sp@gmail.com'
          }
        ])
      ]);
    });
}