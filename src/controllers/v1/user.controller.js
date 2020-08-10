import httpStatus from 'http-status'
import createError from 'http-errors'
import userRepo from '../../repositories/user.repository'

const get = async (req, res, next) => {
  try {
    if (req.params.uuid) {
      const user = await userRepo.find(req.params.uuid)

      if (!user) {
        throw (createError(httpStatus.NOT_FOUND, `Can\'t find user ${req.params.uuid}...`))
      }

      return res
        .status(httpStatus.OK)
        .json(user.toWeb())
    } else {
      const users = await userRepo.all()

      return res.status(200).json( users.map( user => user.toWeb() ) )
    }
  } catch (e) {
    next(e)
  }
}

export {
  get
}