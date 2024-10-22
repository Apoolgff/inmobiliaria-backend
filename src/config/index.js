const { connect } = require('mongoose')
const dotenv = require('dotenv')



exports.configObject = {
  PORT: process.env.PORT || 8080,
  mongo_uri: process.env.MONGO_URI,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  cookie_secret_key: process.env.COOKIE_SECRET_KEY,
  persistence: process.env.PERSISTENCE,
}

exports.connectDB = async () => {
    await connect("mongodb+srv://LotesDeMar:Lotesdemar123456789@clusterinmobiliaria.oxvxu.mongodb.net/?retryWrites=true&w=majority&appName=ClusterInmobiliaria")
    console.log('Base de datos conectada')
  }


