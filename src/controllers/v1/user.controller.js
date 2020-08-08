import httpStatus from 'http-status'
import createError from 'http-errors'
import {
  models
} from '../../models'

const get = async (req, res, next) => {
  try {
    if (req.params.uuid) {
      const user = await models.User.findOne({
        where: {
          uuid: Buffer.from(req.params.uuid, 'hex')
        }
      })

      if (!user) {
        throw (createError(httpStatus.NOT_FOUND, `Can\'t find user ${req.params.uuid}...`))
      }

      return res
        .status(httpStatus.OK)
        .json(user)
    } else {
      const users = await models.User.findAll()

      return res.json(users)
    }
  } catch (e) {
    next(e)
  }
}

export {
  get
}