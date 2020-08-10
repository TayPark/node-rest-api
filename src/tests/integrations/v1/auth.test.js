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
  let jwtToken

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
    
    jwtToken = res.body.data.token
    
    expect(res.statusCode).toBe(200)
    expect(jwtToken).toBeTruthy()
    
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET)
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
    let res = await request(app).get('/v1/auth/tokenTest').set('Authorization', `Bearer ${jwtToken}`)
    
    expect(console.log(res.body.data))
    expect(res.body.data.email).toBe(userData.email)
  })
})