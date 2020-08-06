import fs from 'fs'
import path from 'path'

const Sequelize = require('sequelize')
const config = require(__dirname + '../configs/sequelize.js')[process.env.NODE_ENV]
const basename = path.basename(__filename)