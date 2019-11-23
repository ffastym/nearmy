/**
 * @author Yuriy Matviyuk
 */
import bodyParser from 'body-parser'
import connectToDb from './db/connectToDb'
import cors from 'cors'
import enforce from 'express-sslify'
import express from 'express'
import io from './api/io'
import listenAxiosRequests from './api/axios/router'
import path from 'path'
import renderer from './middleware/renderer'
import url from '../src/router/url'

const app = express()
const PORT = 3001
const router = express.Router()

connectToDb()

Object.entries(url).forEach(path => {
  router.get(path, renderer)
})

app.use(cors())
app.use(bodyParser.json())
app.use(router)
app.use('/api', router)
app.use(express.static(path.resolve(__dirname, '..', 'build')))

if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({
    trustXForwardedHostHeader: true,
    trustProtoHeader: true
  }))
}

/**
 * Listen all axios API requests
 */
listenAxiosRequests(router)

io.listen(app.listen(process.env.PORT || PORT, console.log(`LISTENING ON PORT ${PORT}`)))
