'use strict'

import {
  uuid
} from '../utils/uuid'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uuid: {
      allowNull: false,
      unique: true,
      type: 'BINARY(32)',
      defaultValue: () => Buffer.from(uuid(), 'hex'),
      get: function () {
        return Buffer.from(this.getDataValue('uuid')).toString('hex')
      }
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    tableName: 'users',
    timestamps: true
  })

  User.associate = (models) => {
    // associations
  }

  // hooks

  return User
}