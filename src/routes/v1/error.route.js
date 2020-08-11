import express from 'express'

const router = express.Router()

router.route('/').get((req, res, next) => {
  next(new Error('Sentry Error 0310!'))
})

export default router