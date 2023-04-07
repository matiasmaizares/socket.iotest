import express from 'express'
import { apiRouter } from './routers/apiRouter.js'
import { webRouter } from './routers/webRouter.js'
import { engine } from 'express-handlebars'
import __dirname from './utils.js'
import { Server as socketIOServer } from 'socket.io'
import cors from 'cors'

const app = express()
app.use(cors({ origin: '*' }))
const PORT = 8080
const httpServer = app.listen(PORT, () => {
  console.log(`escuchando en el puerto ${PORT}`)
})
const io = new socketIOServer(httpServer)

app.engine('handlebars', engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use('/', webRouter)
app.use('/api', apiRouter)
app.use('/public', express.static(__dirname + '/public'))

io.on('connection', async (clientSocket) => {
  console.log(`New connection: ${clientSocket.id}`)
})

app
