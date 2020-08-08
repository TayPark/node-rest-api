import request from "supertest";
import randomsString from "random-string";
import { uuid } from "../../../utils/uuid";
import { models } from "../../../models";
import randomString from "random-string";

const app = require("../../../app");

let user;

beforeAll(async () => {
  await models.User.create({
    email: randomsString() + "@test.com",
    password: randomString(),
  });

  user = await models.User.create({
    email: randomsString() + "@test.com",
    password: randomString(),
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

  test("Get by UUID. | 200", async () => {
    let res = await request(app).get(`/v1/users/${user.uuid}`);

    expect(res.body.email).toBe(user.email);
  });

  test("Get by WRONG UUID. | 404", async () => {
    let res = await request(app).get(`/v1/users/${uuid()}`);

    expect(res.statusCode).toBe(404);
  });
});
