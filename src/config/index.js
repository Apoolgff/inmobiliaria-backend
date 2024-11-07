const { connect } = require('mongoose')
require('dotenv').config();
//const dotenv = require('dotenv')



exports.configObject = {
  PORT: process.env.PORT || 8080,
  mongo_uri: process.env.MONGO_URI,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  cookie_secret_key: process.env.COOKIE_SECRET_KEY,
  persistence: process.env.PERSISTENCE,
  jwt_expiration_time: process.env.JWT_EXPIRATION_TIME,
  cookie_name: process.env.COOKIE_NAME,
  cookie_expiration_time: process.env.COOKIE_EXPIRATION_TIME,
}

exports.connectDB = async () => {
    await connect(process.env.MONGO_URI)
    console.log('Base de datos conectada')
  } 


