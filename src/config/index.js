const { connect } = require('mongoose')
const dotenv = require('dotenv')

const { program } = require("../utils/commander")

const { mode } = program.opts()

dotenv.config({
  path: mode == 'production' ? './.env.production' : './.env.development'
})

exports.configObject = {
  PORT: process.env.PORT || 8080,
  mongo_uri: process.env.MONGO_URI,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  cookie_secret_key: process.env.COOKIE_SECRET_KEY,
  persistence: process.env.PERSISTENCE,
  gmail_user_app: process.env.GMAIL_USER_APP,
  gmail_pass_app: process.env.GMAIL_PASS_APP
}

exports.connectDB = async () => {
    await connect(process.env.MONGO_URI)
    console.log('Base de datos conectada')
  }


exports.mode = mode;