import app from "../app";
import bcrypt from 'bcryptjs';
import mongoose from "mongoose";
import supertest from "supertest";

import getEcvsData from "./data/ecvs";
import EcvModel from "../models/ecv";
import UserModel from "../models/user";
import { UserType } from "../types";

const api = supertest(app);

const ECVS_API = "/api/ecvs";
const LOGIN_API = "/api/login"

describe('Database returns JSON content', () => {

  test('users are returned as json', async () => {
    await api
      .get(ECVS_API)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

describe('ecvs in database', () => {

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

    expect(response.body[0]).toHaveProperty("user");
    expect(response.body[1]).toHaveProperty("user");
  });

  test('ecvs are identified with an id', async () => {
    const response = await api
      .get(ECVS_API)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body[0]).toBeDefined();
    expect(response.body[1]).toBeDefined();
    expect(response.body[0]).toHaveProperty("id")
    expect(response.body[1]).toHaveProperty("id")
  })
});

describe('ecv creation', () => {
  let token: string;

  beforeEach(async () => {
    await UserModel.deleteMany({});

    const passwordHash = await bcrypt.hash('todellasalainen', 10)

    const user = new UserModel({
      usertype: UserType.NormalUser,
      firstName: "Ecvs",
      lastName: "Testi",
      email: "ecvs@testi.fi",
      password: passwordHash,
      phoneNumber: "123-123-1234",
      address: "Testirinne 2",
      ecvs: [],
      applications: []
    });

    await user.save();

    const response = await api
      .post(LOGIN_API)
      .send({
        email: "ecvs@testi.fi",
        password: "todellasalainen"
      });

    token = response.body.token;
  });

  test('succeeds if valid ecvs and token', async () => {
    await api
      .post(ECVS_API)
      .send({
        profile: "olen hyvä koodaaja"
      })
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  });

  test('fails if valid ecvs and invalid token', async () => {
    const response = await api
      .post(ECVS_API)
      .send({
        profile: "olen hyvä koodaaja"
      })
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain("token missing or invalid");
  });
});

afterAll(() => {mongoose.connection.close()});