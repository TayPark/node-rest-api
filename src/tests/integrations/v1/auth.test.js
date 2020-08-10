require('dotenv').config()

import request from 'supertest'
import randomString from 'random-string'
import models from '../../../models'
import jwt from 'jsonwebtoken'
import userRepo from '../../../repositories/user.repository'

const app = require('../../../app')

afterAll( () => models.sequelize.close() )

describe('Login test', () => {
  let userData
  let token

  beforeAll( async () => {
    userData = {
      email: randomString() + '@test.com',
      password: randomString()
    }

    await userRepo.store(userData)
  })

  test('Actual login test | 200', async () => {
    let res = await request(app).post('/v1/auth/login').send({
      email: userData.email,
      password: userData.password
    })

    expect(res.statusCode).toBe(200)
    expect(res.body.data.token).toBeTruthy()

    const payload = jwt.verify(res.body.data.token, process.env.JWT_SECRET)
    expect(userData.email).toBe(payload.email)
  
    const user = await userRepo.find(payload.uuid)
    expect(userData.email).toBe(user.email)

    console.log(payload)
  })

  test('Non user login | 404', async () => {
    let res = await request(app).post('/v1/auth/login').send({
      email: 'joker@email.com',
      password: 'hahaha'
    })

    console.log(res.body.data.token)

    expect(res.statusCode).toBe(404)
    expect(res.body.data.message).toBe('Can\'t find user...')
  })

  test('Wrong password login | 404', async () => {
    let res = await request(app).post('/v1/auth/login').send({
      email: userData.email,
      password: 'wrongPassword~~'
    })

    expect(res.statusCode).toBe(404)
    expect(res.body.data.message).toBe('Check password...')
  })

  test('Token auth | 200', async () => {
    let res = await request(app).get('/v1/auth/token').set('Authorization', `Bearer ${token}`)

    expect(res.body.data.email).toBe(userData.email)

    console.log(res.body.data)
  })
})