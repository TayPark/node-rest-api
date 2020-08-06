require('dotenv').config()

if(process.env.NODE_ENV !== 'production') {
  require('@babel/register')
}

const baseDBSetting = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  timezone: '+09:00',
  dialect: 'mysql',
  pool: {
    max: 100,
    min: 0,
    idel: 10000
  },
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    timestamps: true
  }
}

module.exports = {
  production: Object.assign({
    database: process.env.DB_NAME,
    logging: false
  }, baseDBSetting),
  
  development: Object.assign({
    database: process.env.DB_DEV,
    logging: true
  }, baseDBSetting),

  test: Object.assign({
    database: process.env.DB_TEST,
    logging: false
  }, baseDBSetting)
}