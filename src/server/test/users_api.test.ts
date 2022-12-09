import app from "../app";
import mongoose from "mongoose";
import supertest from "supertest";

import { User } from "../types";
import UserModel from "../models/user";
import getTestUsers from "./data/users";


const api = supertest(app);

let testUsers: Array<User>;
const USER_API = "/api/users"

describe('Database returns JSON content', () => {

  test('users are returned as json', async () => {
    await api
      .get(USER_API)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

describe('Users', () => {

  beforeEach(async () => {
    await UserModel.deleteMany({});
  
    const data = await getTestUsers();
    
    return (testUsers = data)
  });

  test('test users are created correctly to the test database', async () => {
    const response = await api.get(USER_API);

    expect(response.body).toHaveLength(2);
    expect(response.body[0].firstName).toEqual(testUsers[0].firstName);
    expect(response.body[0].lastName).toEqual(testUsers[0].lastName);
    expect(response.body[0].address).toEqual(testUsers[0].address);

    expect(response.body[1].firstName).toEqual(testUsers[1].firstName);
    expect(response.body[1].lastName).toEqual(testUsers[1].lastName);
    expect(response.body[1].address).toEqual(testUsers[1].address);
  });

  test('a valid user can be created to the database', async () => {
    const newUser = {
      firstName: "Testi",
      lastName: "Testi",
      email: "testi@testi.fi",
      password: "salainen",
    };

    await api
      .post(USER_API)
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get(USER_API);

    const names = response.body.map((r: User) => r.firstName);

    expect(response.body).toHaveLength(testUsers.length + 1);
    expect(names).toContain(newUser.firstName);
  });

  test('non valid user cannot be created to the database', async () => {
    const badUser = {
      firstName: "Testi",
      lastName: "Testi",
      // missing email field
      password: "salainen",
    };

    await api
      .post(USER_API)
      .send(badUser)
      .expect(400)

      const response = await api.get(USER_API);

      expect(response.body).toHaveLength(testUsers.length);
  });

  test('user with already existing email cannot be created to the database', async () => {
    const newUser = {
      firstName: "Nakki",
      lastName: "Nakkila",
      email: "k.kalvirinne@gmail.com",
      password: "salainen",
    };

    await api
      .post(USER_API)
      .send(newUser)
      .expect(400)

    const response = await api.get(USER_API);
      
    expect(response.body).toHaveLength(testUsers.length);
  });
});

afterAll(() => {mongoose.connection.close()});