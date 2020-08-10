import httpStatus from 'http-status'
import createError from 'http-errors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userRepo from '../../repositories/user.repository'
import response from '../../utils/response'

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