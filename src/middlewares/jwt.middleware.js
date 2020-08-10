import jwt from 'jsonwebtoken'
import createError from 'http-errors';
import httpStatus from 'http-status';
import userRepo from '../repositories/user.repository'

export default async (req, res, next) => {
  try {
    req.user = null;

    if (req.headers.authorization) {
      let uuid;
      jwt.verify(
        req.headers.authorization.split(' ')[1],
        process.env.JWT_SECRET,
        (err, payload) => {
          if (err) {
            return next(createError(httpStatus.UNAUTHORIZED, 'Token is unavailable...'))
          }

          uuid = payload.uuid
        }
      )

      const user = await userRepo.find(uuid)

      if (!user) {
        return next(createError(httpStatus.NOT_FOUND, 'No user...'))
      }

      req.user = user;
    }
    next()
  } catch (e) {
    next(e)
  }
}