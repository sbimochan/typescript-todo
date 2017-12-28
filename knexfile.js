require('babel-register');
require('dotenv').config();

module.exports = {
  development: {
    client: process.env.DB_CLIENT || 'mssql',
    connection: {
      charset: 'utf8',
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST || '127.0.0.1'
    },
    migrations: {
      tableName: 'migrations',
      directory: './src/migrations',
      stub: './src/stubs/migration.stub'
    },
    seeds: {
      directory: './src/seeds',
      stub: './src/stubs/seed.stub'
    }
  }
};
