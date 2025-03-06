import mongoose from 'mongoose'

export const connectDatabase = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.MONGO_DB_URL)
    
    console.log('Connected to MongoDB!')
  } catch (error) {
    console.error(error)
  }
}
