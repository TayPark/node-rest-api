require('dotenv').config();

import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan';

import v1Router from './routes/v1'

const app = express()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/v1', v1Router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// actual error handler
app.use((err, req, res, next) => {
  let apiError = err

  if(!err.status) apiError = createError(err)

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? apiError : {}
  
  // render error
  return res.status(apiError.status).json({
    message: apiError.message
  })
});


// to use /bin/www, use commonJS grammar
module.exports = app;
