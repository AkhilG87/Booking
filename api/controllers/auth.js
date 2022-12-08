import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { createError } from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync(req.body.password, salt)
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    })

    await newUser.save()
    res.status(200).send('user has been created')
  } catch (err) {
    next(err)
  }
}
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) return next(createError(404, 'user not find'))
    // console.log(req.body.password,user);
    const isCorrect = await bcrypt.compare(req.body.password, user.password)
    if (!isCorrect) return next(createError(404, 'wrong password'))

    const token = jwt.sign(
      { id: user.id, isAdmin: user.admin },
      process.env.JWT,
    )
    const { password, isAdmin, ...otherDetails } = user._doc

    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .send({ ...otherDetails })
  } catch (err) {
    next(err)
  }
}
