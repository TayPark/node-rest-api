import jwt from 'jsonwebtoken'
import createError from 'http-errors';
import userRepo from '../repositories/user.repository'
import userCache from '../caches/user.cache'

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
            return next(createError(401, 'Token is unavailable...'))
          }

          uuid = payload.uuid
        }
      )

      const user = await userCache.find(uuid)

      if (!user) {
        return next(createError(404, 'No user...'))
      }

      req.user = user;
    }
    next()
  } catch (e) {
    next(e)
  }
}