import { models } from "../../models";
import httpStatus from "http";
import createError from "http-errors";

const get = async (req, res, next) => {
  try {
    if (req.params.uuid) {
      const user = await models.User.findOne({
        where: {
          uuid: Buffer(req.params.uuid, "hex"),
        },
      });

      if (!user) {
        throw createError(httpStatus.NOT_FOUND, "Can't find user...");
      }

      return res.status(httpStatus.OK).json(user);
    } else {
      const users = await models.User.findAll();
      return res.json(users);
    }
  } catch (e) {
    next(e);
  }
};

export { get };
