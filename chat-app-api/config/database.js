require('dotenv').config()

module.exports = 

{
  "development": {
    "username":  process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST ,
    "dialect": "postgres",
    "logging" : false
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST ,
    "dialect": "postgres",
    "logging" : false
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "host": process.env.DATABASE_URL,
    "dialect": "postgres",
    "logging" : false,
    "dialectOptions": {
      "ssl": { 
        "require": true,
        "rejectUnauthorized": false,
      },
    },
  }
}
