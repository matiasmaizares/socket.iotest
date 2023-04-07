import { Router } from 'express'

export const webRouter = Router()

webRouter.get('/productos', (req, res) => {
  res.send('hola')
})
webRouter.get('/', (req, res) => {
  res.send('hola')
})

webRouter.get('/ventas', (req, res) => {
  res.send()
})

webRouter.get('/handlebars', async (req, res, next) => {
  try {
    res.render('home.handlebars')
  } catch (error) {
    console.log(error)
    return next(error.message)
  }
})
