import moment from 'moment'

import Ticket from "../db/models/ticket/Ticket.js"

class TicketsController {
  async createTicket(req, res) {
    try {
      const { subject, content } = req.body

      const ticket = new Ticket({ subject, content })
      await ticket.save()

      return res.status(200).json({ message: 'Ticket has been successfully created!' })
    } catch (err) {
      console.error(err)
      return res.status(400).json({ message: 'Error with ticket creating' })
    }
  }

  async startTicket(req, res) {
    try {
      const { id } = req.params

      await Ticket.updateOne(
        { _id: id },
        { $set: { status: 'in-progress', dateUpdate: Date.now() } }
      )

      return res.status(200).json({ message: 'Ticket has been successfully started' })
    } catch (err) {
      console.error(err)
      return res.status(400).json({ message: 'Error starting ticket' })
    }
  }

  async completeTicket(req, res) {
    try {
      const { id } = req.params
      const { resolution } = req.body

      await Ticket.updateOne(
        { _id: id },
        { $set: { status: 'completed', resolution, dateUpdate: Date.now() } }
      )

      return res.status(200).json({ message: 'Ticket has been successfully completed' })
    } catch (err) {
      console.error(err)
      return res.status(400).json({ message: 'Error completing ticket' })
    }
  }

  async cancelTicket(req, res) {
    try {
      const { id } = req.params
      const { reason } = req.body

      await Ticket.updateOne(
        { _id: id },
        { $set: { 
          status: 'cancelled', 
          cancellationReason: reason, 
          dateUpdate: Date.now() 
        } }
      )

      return res.status(200).json({ message: 'Ticket has been successfully cancelled' })
    } catch (err) {
      console.error(err)
      return res.status(400).json({ message: 'Error cancelling ticket' })
    }
  }

  async getTickets(req, res) {
    try {
      const { startDate, endDate } = req.query
      const filter = {}

      if (startDate) {
        const start = moment(startDate).isValid() ? moment(startDate).toDate() : null
        if (start) {
          filter.dateCreate = { $gte: start }
        }
      }

      if (endDate) {
        const end = moment(endDate).isValid() ? moment(endDate).toDate() : null
        if (end) {
          filter.dateCreate = { ...filter.dateCreate, $lte: end }
        }
      }

      const tickets = await Ticket.find(filter)
      return res.status(200).json(tickets)
    } catch (err) {
      console.error(err)
      return res.status(400).json({ message: 'Error getting tickets' })
    }
  }

  async cancelAllInProgress(req, res) {
    try {
      await Ticket.updateMany(
        { status: 'in-progress' },
        { $set: { 
          status: 'cancelled', 
          dateUpdate: Date.now() 
        } }
      )
      return res.status(200).json({ message: `Tickets have been successfully cancelled` })
    } catch (err) {
      console.error(err)
      return res.status(400).json({ message: 'Error cancelling tickets' })
    }
  }
}

export default new TicketsController()
