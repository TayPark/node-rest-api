import httpStatus from 'http-status'

/* util for one way in-out http response */
export default (res, data = {}, code = httpStatus.OK) => {
  let result = {
    ok: 1
  }

  if (code > 399) {
    result.ok = 0
  }

  if (typeof data === 'object') {
    result = Object.assign({
      data
    }, result)
  }
  
  return res.status(code).json(result)
}