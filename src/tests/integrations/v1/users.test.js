import request from "supertest";
import randomString from "random-string";
import { uuid } from "../../../utils/uuid";
import models from '../../../models'

const app = require("../../../app");

let user;

beforeAll(async () => {
  await models.User.create({
    email: randomString() + "@test.com",
    password: randomString(),
    uuid: uuid()
  });

  user = await models.User.create({
    email: randomString() + "@test.com",
    password: randomString(),
    uuid: uuid()
  });
});

afterAll(() => {
  models.sequelize.close();
});

describe("GET: /v1/users", () => {
  // test cases below...

  test("All users. | 200", async () => {
    let res = await request(app).get("/v1/users");

    expect(res.body.length).toBeGreaterThan(1);
  });

  // Validation checking: existing user.uuid
  test("Get by UUID. | 200", async () => {
    let res = await request(app).get(`/v1/users/${user.uuid}`);

    expect(res.body.email).toBe(user.email);
  });

  // Validation checking: non-existing user.uuid
  test("Got by WRONG UUID. | 404", async () => {
    let res = await request(app).get(`/v1/users/${uuid()}`);

    expect(res.statusCode).toBe(404);
  });
});
