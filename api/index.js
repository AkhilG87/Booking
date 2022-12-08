import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import roomsRoute from './routes/rooms.js'
import hotelsRoute from './routes/hotels.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express()
dotenv.config()

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO)
    console.log('connected to db...')
  } catch (error) {
    throw error
  }
}
mongoose.connection.on('disconnected', () => {
  console.log('disconnected')
})
mongoose.connection.on('connected', () => {
  console.log('connected')
})

// error handling middlewae

// middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)

app.use((err, req, res, next) => {
  const errStatus = err.status || 500
  const errM = err.message || 'something went wrong'
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errM,
    satck: err.stack,
  })
})

app.listen(8800, (req, res) => {
  connect()
  console.log('running..')
})
