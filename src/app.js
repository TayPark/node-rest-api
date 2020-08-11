require('dotenv').config();

// modules
import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan';
import moment from 'moment'

// utils
import response from './utils/response'
import jwtMiddleware from './middlewares/jwt.middleware'
import { logger, stream } from './configs/winston'

// routers
import v1Router from './routes/v1'

const app = express()
let Sentry
// Sentry setting
if (process.env.NODE_ENV === 'test') {
  Sentry = require('@sentry/node')
  Sentry.init({ dsn: process.env.SENTRY_DSN })

  app.use(Sentry.Handlers.errorHandler())
}

app.use(morgan('combined', { stream }));
/* only log error responses, use on production */
// app.use(morgan('combined', {
//   skip: (req, res) => { return res.statusCode < 400 }
// }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(jwtMiddleware)

app.use('/v1', v1Router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// actual error handler
app.use((err, req, res, next) => {
  let apiError = err

  if(!err.status) apiError = createError(err)

  if (process.env.NODE_ENV === 'test') {
    const errObj = {
      req: {
        headers: req.headers,
        query: req.query,
        body: req.body,
        route: req.route
      },
      error: { 
        message: apiError.message, 
        stack: apiError.stack, 
        status: apiError.status
      },
      user: req.user
    }

    logger.error(`${moment().format('YYYY-MM-DD HH:mm:ss')}`, errObj)
  } else {
    // set locals, only providing error in development
    res.locals.message = apiError.message;
    res.locals.error = apiError
  }

  if (Sentry !== undefined) {
    Sentry.captureException(apiError)
  }

  // render error
  return response(res, {
    message: apiError.message
  }, apiError.status)
});


// to use /bin/www, use commonJS grammar
module.exports = app;
