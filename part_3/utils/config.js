require('dotenv').config()

const PORT    = process.env.PORT
const MONGODB = process.env.MONGO_URI

module.exports = {
  MONGODB,
  PORT
}