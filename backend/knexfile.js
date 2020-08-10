require('dotenv/config')

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },

  connection: {
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_ACCESS_KEY,
  },
  pool: {
    min: process.env.DATABASE_POOL_MIN,
    max: process.env.DATABASE_POOL_MAX,
  },
  migrations: {
    tableName: 'knex_migrations'
  }


};
