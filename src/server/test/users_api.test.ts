import app from "../app";
import mongoose from "mongoose";
import supertest from "supertest";

import { User } from "../types";
import UserModel from "../models/user";
import getTestUsers from "./data/users";


const api = supertest(app);

let testUsers: Array<User>;

describe('Database returns JSON content', () => {

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
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
    const response = await api.get('/api/users');

    expect(response.body).toHaveLength(2);
    expect(response.body[0].firstName).toEqual(testUsers[0].firstName);
    expect(response.body[0].lastName).toEqual(testUsers[0].lastName);
    expect(response.body[0].address).toEqual(testUsers[0].address);
    
    expect(response.body[1].firstName).toEqual(testUsers[1].firstName);
    expect(response.body[1].lastName).toEqual(testUsers[1].lastName);
    expect(response.body[1].address).toEqual(testUsers[1].address);
  });
});

afterAll(() => {mongoose.connection.close()});