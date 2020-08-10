import httpStatus from 'http-status'
import createError from 'http-errors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userRepo from '../../repositories/user.repository'

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await userRepo.findByEmail(email)

    if (!user) {
      return next(createError(httpStatus.NOT_FOUND, 'Can\'t find user...'))
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return next(createError(httpStatus.NOT_FOUND, 'Check password...'))
    }

    const payload = { message: 'Access granted '}

    const secret = 'secret'

    const ttl = 60 * 60 * 1000

    const token = jwt.sign(payload, secret, {
      expiresIn: ttl
    })

    return res.json({ data: { token } })
  } catch (e) {
    next(e)
  }
}

export {
  login
}