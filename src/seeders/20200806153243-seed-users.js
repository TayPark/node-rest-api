'use strict'

import moment from 'moment'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'test2@test.com',
          password: 'test1234',
          createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
        },
        {
          email: 'test3@test.com',
          password: 'test1234',
          createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
        },
        {
          email: 'test4@test.com',
          password: 'test1234',
          createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
        }
      ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}