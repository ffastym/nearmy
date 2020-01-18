/**
 * @author Yuriy Matviyuk
 */
import mongoose from 'mongoose'

const dbRoute = process.env.NODE_ENV === 'production'
  ? 'mongodb://ffastym:Tt239allo@ds263368.mlab.com:63368/heroku_k9lpkk6r'
  : 'mongodb://localhost:27017/nearme' // 'mongodb://ffastym:Tt239allo@ds263368.mlab.com:63368/heroku_k9lpkk6r'

mongoose.connect(dbRoute, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const connectToDb = () => {
  const db = mongoose.connection

  db.once('open', () => console.log('connected to the database'))

  // checks if connection with the database is successful
  db.on('error', console.error.bind(console, 'MongoDB connection error:'))
}

export default connectToDb
