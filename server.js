import express from 'express'
import cors from 'cors'
import path from 'path'
import timeout from 'connect-timeout'
import { createServer } from 'http'

import { routes } from './routes/routes.js'
import { haltOnTimedout } from './middlewares/timeout.js'

export const setupServer = () => {
  const app = express()

  // Настройки сервера
  app.use(timeout('30s'))
  app.use(haltOnTimedout)
  app.use(express.json({ limit: '50mb' }))
  app.use(cors())

  // Роуты приложения
  app.use('/api', routes)

  app.use(express.static('./client/dist'))

  app.use('/api/*', (req, res) => {
    res.status(404).json({ message: 'Invalid API url' })
  })

  app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'client', 'dist', 'index.html'))
  })

  const PORT = process.env.PORT || 3000

  const server = createServer(app)

  // Запуск сервера
  server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}!`)
  })

  // Обрабатываем ошибку при запуске сервера
  server.on('error', (error) => {
    console.error('Server failed to start!', error)
    process.exit(1)
  })

  return server
}
