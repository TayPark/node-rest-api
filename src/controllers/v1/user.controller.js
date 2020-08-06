import {models} from '../../models'

const get = async (req, res, next) => {
  try {
    const users = await models.User.findAll()

    return res.status(200).json(users)
  } catch (e) {
    next(e)
  }
}

export {
  get
}