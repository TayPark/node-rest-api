'use strict'

import moment from 'moment'
import { uuid } from '../utils/uuid'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'test@test.com',
          password: 'test1234',
          createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD hh:mm:ss'),
          uuid: uuid()
        },
        {
          email: 'test1@test.com',
          password: 'test1234',
          createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD hh:mm:ss'),
          uuid: uuid()
        },
        {
          email: 'test2@test.com',
          password: 'test1234',
          createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD hh:mm:ss'),
          uuid: uuid()
        }
      ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}