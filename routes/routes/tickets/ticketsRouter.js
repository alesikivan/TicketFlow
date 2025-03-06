import { Router } from 'express'

import controller from '../../../controllers/ticketsController.js'
import { 
  cancelTicketValidation, 
  completeTicketValidation, 
  createTicketValidation, 
  startTicketValidation
} from './validation.js'

export const ticketsRouter = Router()

ticketsRouter.get(
  '/', 
  controller.getTickets)

ticketsRouter.post(
  '/', 
  createTicketValidation,
  controller.createTicket)

ticketsRouter.patch(
  '/:id/start', 
  startTicketValidation,
  controller.startTicket)

ticketsRouter.patch(
  '/:id/complete', 
  completeTicketValidation,
  controller.completeTicket)

ticketsRouter.patch(
  '/:id/cancel', 
  cancelTicketValidation,
  controller.cancelTicket)

ticketsRouter.patch(
  '/cancel-all-in-progress', 
  controller.cancelAllInProgress)

