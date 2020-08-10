import request from 'supertest'
import randomString from 'random-string'
import models from '../../../models'
import userRepo from '../../../repositories/user.repository'
import Test from 'supertest/lib/test'

const app = require('../../../app')

afterAll( () => models.sequelize.close() )

describe('Login test', () => {
  let userData

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
})