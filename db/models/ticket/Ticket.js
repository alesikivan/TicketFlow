import { Schema, model } from 'mongoose'

const TicketSchema = new Schema(
  {
    subject: { type: String, required: true },
    content: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['new', 'in-progress', 'completed', 'cancelled'], 
      default: 'new' 
    },
    resolution: { type: String, default: '' },
    cancellationReason: { type: String, default: '' },
    dateCreate: { type: Date, default: Date.now },
    dateUpdate: { type: Date, default: Date.now },
  }
)

export default model('Ticket', TicketSchema)
