import express from 'express'
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getAllHotel,
  getHotel,
  updateHotel,
} from '../controllers/hotel.js'
import Hotel from '../models/Hotel.js'
import { createError } from '../utils/error.js'
import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

// create
router.post('/', verifyAdmin, createHotel)
// update
router.put('/:id', verifyAdmin, updateHotel)
//  delete
router.delete('/:id', verifyAdmin, deleteHotel)
//   get
router.get('/find/:id', getHotel)
//  all hotels
router.get('/', getAllHotel)
router.get('/countByCity', countByCity)
router.get('/countByType', countByType)

export default router
