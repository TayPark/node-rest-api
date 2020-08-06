const get = async (req, res, next) => {
  try {
    return res.json({
      message: "get from user!"
    })
  } catch (e) {
    next(e)
  }
}

export {
  get
}