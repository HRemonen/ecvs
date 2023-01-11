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

  test('ecvs are returned as json', async () => {
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
  });

  test('valid single ecv is returned correctly', async () => {
    const initialEcv = await EcvModel.findOne({});
    await api
      .get(ECVS_API + `/${initialEcv?.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('invalid ecv results in malformatted id error', async () => {
    const response = await api
      .get(ECVS_API + "/123123")
      .expect(401)
      .expect('Content-Type', /application\/json/);
    
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe("malformatted id");
  });
});

describe('ecv API', () => {
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

  test('creation succeeds if valid ecvs and token', async () => {
    await api
      .post(ECVS_API)
      .send({
        profile: "olen hyvä koodaaja"
      })
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  });

  test('creation fails if valid ecvs and invalid token', async () => {
    const response = await api
      .post(ECVS_API)
      .send({
        profile: "olen hyvä koodaaja"
      })
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain("token missing or invalid");
  });

  test('updating succeeds by authorized user', async () => {
    const initialEcv = await api
      .post(ECVS_API)
      .send({
        profile: "olen hyvä koodaaja"
      })
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const editedEcv = await api
      .put(ECVS_API + `/${initialEcv.body.id}`)
      .set('Authorization', `bearer ${token}`)
      .send({
        profile: "en ole hyvä koodaaja"
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(editedEcv.body.profile).toContain("en ole hyvä koodaaja");
  });

  test('updating fails by unauthorized user', async () => {
    const initialEcv = await EcvModel.findOne({});
    const editedEcv = {
      ...initialEcv,
      profile: "new profile"
    };

    await api
      .put(ECVS_API + `/${initialEcv?.id}`)
      .send(editedEcv)
      .expect(401)

  });

  test('changing name succeeds by authorized user', async () => {
    const initialEcv = await api
      .post(ECVS_API)
      .send({
        profile: "olen hyvä koodaaja"
      })
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .put(ECVS_API + `/${initialEcv.body.id}`)
      .set('Authorization', `bearer ${token}`)
      .send({
        name: "First CV"
      })
      .expect(201)

    expect(response.body.name).toBe('First CV')
  });

  test('deletion succeeds by authorized user', async () => {
    const initialEcv = await api
      .post(ECVS_API)
      .send({
        profile: "olen hyvä koodaaja"
      })
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    await api
      .delete(ECVS_API + `/${initialEcv.body.id}`)
      .set('Authorization', `bearer ${token}`)
      .send()
      .expect(204)
  });

  test('deletion fails by unauthorized user', async () => {
    const initialEcv = await EcvModel.findOne({});
    const editedEcv = {
      ...initialEcv,
      profile: "new profile"
    };

    await api
      .delete(ECVS_API + `/${initialEcv?.id}`)
      .send(editedEcv)
      .expect(401)
  });
});

afterAll(() => {mongoose.connection.close()});