import express from 'express'
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from '../controllers/user.js'
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

// router.get('/checkAuth', verifyToken, (req, res, next) => {
//   res.send('hello user you are authenticated')
// })
// router.get('/checkUser/:id', verifyUser, (req, res, next) => {
//   res.send('hello user you are logged in and can delete your acoount ')
// })
// router.get('/checkAdmin/:id', verifyAdmin, (req, res, next) => {
//   res.send('hello admin you are logged in and can delete all acoount ')
// })
// update
router.put('/:id', verifyUser, updateUser)
//  delete
router.delete('/:id', verifyUser, deleteUser)
//   get
router.get('/:id', verifyUser, getUser)
//  all Users
router.get('/', verifyAdmin, getAllUser)

export default router
