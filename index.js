import dotenv from 'dotenv'
dotenv.config()

import { setupServer } from './server.js'
import { connectDatabase } from './database.js'

const executeServer = async () => {
  await connectDatabase()
  setupServer()
}

executeServer()
