import { check } from 'express-validator'

import { errorHandler } from '../../../utils/errors.js'
import Ticket from '../../../db/models/ticket/Ticket.js'

export const createTicketValidation = [
  check('subject', 'Subject field cannot be empty.')
    .notEmpty()
    .withMessage('Subject is required.')
    .trim(),

  check('subject')
    .isString()
    .withMessage('Invalid subject format'),

  check('content', 'Content field cannot be empty.')
    .notEmpty()
    .withMessage('Content is required.'),

  check('content')
    .isString()
    .withMessage('Invalid content format'),

  (req, res, next) => errorHandler(req, res, next)
]

export const startTicketValidation = [
  check('id', 'Ticket ID is required')
    .notEmpty()
    .withMessage('Ticket ID is required'),

  check('id')
    .isMongoId()
    .withMessage('Invalid ticket ID format'),

  (req, res, next) => errorHandler(req, res, next),

  async (req, res, next) => {
    try {
      const { id } = req.params

      // Ищем тикет по ID
      const ticket = await Ticket.findById(id)

      if (!ticket) {
        return res.status(400).json({ message: 'Ticket not found' })
      }

      if (ticket.status !== 'new') {
        return res.status(400).json({ message: 'Current ticket does not have status equal to new' })
      }

      next()
    } catch (error) {
      console.error(error)
      return res.status(400).json({ message: 'Ticket validation error. Please check logs' })
    }
  }
]

export const completeTicketValidation = [
  check('id', 'Ticket ID is required')
    .notEmpty()
    .withMessage('Ticket ID is required'),

  check('id')
    .isMongoId()
    .withMessage('Invalid ticket ID format'),

  check('resolution', 'Resolution is required')
    .notEmpty()
    .withMessage('Resolution field cannot be empty.')
    .trim(),

  check('resolution')
    .isString()
    .withMessage('Invalid resolution format'),

  (req, res, next) => errorHandler(req, res, next),

  async (req, res, next) => {
    try {
      const { id } = req.params

      const ticket = await Ticket.findById(id)

      if (!ticket) {
        return res.status(400).json({ message: 'Ticket not found' })
      }

      if (ticket.status !== 'in-progress') {
        return res.status(400).json({ message: 'Ticket is not in progress, cannot be completed' })
      }

      next()
    } catch (error) {
      console.error(error)
      return res.status(400).json({ message: 'Ticket validation error. Please check logs' })
    }
  }
]

export const cancelTicketValidation = [
  check('id', 'Ticket ID is required')
    .notEmpty()
    .withMessage('Ticket ID is required'),

  check('id')
    .isMongoId()
    .withMessage('Invalid ticket ID format'),

  check('reason', 'Reason is required')
    .notEmpty()
    .withMessage('Reason field cannot be empty.')
    .trim(),

  check('reason')
    .isString()
    .withMessage('Invalid reason format'),

  (req, res, next) => errorHandler(req, res, next),

  async (req, res, next) => {
    try {
      const { id } = req.params

      const ticket = await Ticket.findById(id)

      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' })
      }

      if (ticket.status !== 'in-progress') {
        return res.status(400).json({ message: 'Ticket is not in progress, cannot be cancelled' })
      }

      next()
    } catch (error) {
      console.error(error)
      return res.status(400).json({ message: 'Ticket validation error. Please check logs' })
    }
  }
]
