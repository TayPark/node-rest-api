import httpStatus from 'http-status'
import createError from 'http-errors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userCache from '../../caches/user.cache'
import userRepo from '../../repositories/user.repository'
import response from '../../utils/response'

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await userCache.findByEmail(email)

    if (!user) {
      return next(createError(404, 'Can\'t find user...'))
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return next(createError(404, 'Check password...'))
    }

    const payload = { 
      email: user.email,
      uuid: user.uuid
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TTL
    })

    return response(res, { token })
  } catch (e) {
    next(e)
  }
}

const tokenTest = async (req, res, next) => {
  try {
    return response(res, req.user)
  } catch (e) {
    next(e)
  }
}

export { login, tokenTest };