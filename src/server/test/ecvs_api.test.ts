import app from "../app";
import mongoose from "mongoose";
import supertest from "supertest";

import getEcvsData from "./data/ecvs";
import EcvModel from "../models/ecv";

const api = supertest(app);

const ECVS_API = "/api/ecvs";

describe('Database returns JSON content', () => {

  test('users are returned as json', async () => {
    await api
      .get(ECVS_API)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

describe('users in database', () => {

  beforeEach(async () => {
    await EcvModel.deleteMany({});
  
    await getEcvsData();
  });

  test('test ecvs are created correctly to the test database', async () => {
    const response = await api.get(ECVS_API);

    expect(response.body).toHaveLength(2);
  });

  test('test ecvs have an user linked', async () => {
    const response = await api.get(ECVS_API);

    expect(response.body[0].user).toBeDefined();
    expect(response.body[1].user).toBeDefined();

    expect(response.body[0].user).toHaveProperty("id")
    expect(response.body[1].user).toHaveProperty("id")
  });

  test('ecvs are identified with an id', async () => {
    const response = await api
      .get(ECVS_API)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body[0].id).toBeDefined();
    expect(response.body[1].id).toBeDefined();
  })
});

afterAll(() => {mongoose.connection.close()});