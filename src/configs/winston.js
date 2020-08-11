import fs from 'fs'
import winston from 'winston'

const logDir = __dirname + '/../logs'

// if logDir doesn't exist, mkdir
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

// logs for normal
const infoTransport = new winston.transports.File({
  filename: 'info.log',
  dirname: logDir,
  level: 'info'
})

// logs for error
const errorTransport = new winston.transports.File({
  filename: 'error.log',
  dirname: logDir,
  level: 'error'
})

const logger = winston.createLogger({
  transports: [infoTransport, errorTransport]
})

const stream = {
  write: message => {
    logger.info(message)
  }
}

export { logger, stream }