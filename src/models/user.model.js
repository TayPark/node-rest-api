'use strict'

import bcrypt from 'bcrypt'
import {
  uuid
} from '../utils/uuid'
import userCache from '../caches/user.cache'

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
  User.beforeSave(async (user, options) => {
    if (user.changed('password')) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
    }
  })

  // Save after creation
  User.afterSave((user, options) => userCache.store(user))

  // print

  User.prototype.toWeb = function () {
    const values = this.get()

    // remove private data
    delete values.id
    delete values.password

    return values
  }

  return User
}