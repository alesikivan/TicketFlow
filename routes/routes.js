import express from 'express'

import { ticketsRouter } from './routes/tickets/ticketsRouter.js'

export const routes = express.Router()

routes.use('/tickets', ticketsRouter)