import app from "../app";
import bcrypt from 'bcryptjs';
import mongoose from "mongoose";
import supertest from "supertest";

import { User, UserType } from "../types";
import UserModel from "../models/user";
import getTestUsers from "./data/users";


const api = supertest(app);

let testUsers: Array<User>;
const USER_API = "/api/users";

describe('Database returns JSON content', () => {

  test('users are returned as json', async () => {
    await api
      .get(USER_API)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

describe('users in database', () => {

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

  test('users are identified with an id', async () => {
    const response = await api
      .get(USER_API)
      .expect(200)
      .expect('Content-Type', /application\/json/);

      expect(response.body[0].id).toBeDefined();
  })

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
});

describe('user creations', () => {
  beforeEach(async () => {
    await UserModel.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10)

    const user = new UserModel({
      usertype: UserType.NormalUser,
      firstName: "Kalevi",
      lastName: "Kalvirinne",
      email: "k.kalvirinne@gmail.com",
      password: passwordHash,
      phoneNumber: "123-123-1234",
      address: "Kalevinrinne 60",
      ecvs: [],
      applications: []
    });

    await user.save();
  });

  test('fails if firstname is too short', async () => {
    const newUser = {
      firstName: "a",
      lastName: "Testi",
      email: "aasdf@abc.com",
      password: "salainen",
    };

    const response = await api
      .post(USER_API)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const issues = response.body.issues[0];

    expect(issues).toMatchObject({"message": "Firstname must be 2 or more characters long"});
  });

  test('fails if firstname is too long', async () => {
    const newUser = {
      firstName: "TestimiesTestimiesTestimies",
      lastName: "Testi",
      email: "aasdf@abc.com",
      password: "salainen",
    };

    const response = await api
      .post(USER_API)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const issues = response.body.issues[0];

    expect(issues).toMatchObject({"message": "Firstname must be 18 or less characters long"});
  });

  test('fails if lastname is too short', async () => {
    const newUser = {
      firstName: "Testi",
      lastName: "t",
      email: "aasdf@abc.com",
      password: "salainen",
    };

    const response = await api
      .post(USER_API)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const issues = response.body.issues[0];

    expect(issues).toMatchObject({"message": "Lastname must be 2 or more characters long"});
  });

  test('fails if lastname is too long', async () => {
    const newUser = {
      firstName: "Testi",
      lastName: "TestimiesTestimiesTestimies",
      email: "aasdf@abc.com",
      password: "salainen",
    };

    const response = await api
      .post(USER_API)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const issues = response.body.issues[0];

    expect(issues).toMatchObject({"message": "Lastname must be 18 or less characters long"});
  });

  test('fails with proper statuscode if email already in use', async () => {
    const newUser = {
      firstName: "test",
      lastName: "Testi",
      email: "k.kalvirinne@gmail.com",
      password: "salainen",
    };

    const response = await api
      .post(USER_API)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain("Email already in use by another user");
  });

  test('fails with proper statuscode if malformatted email', async () => {
    const newUser = {
      firstName: "test",
      lastName: "Testi",
      email: "kalvi(at)kalvi.fi",
      password: "salainen",
    };

    const response = await api
      .post(USER_API)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const issues = response.body.issues[0];

    expect(issues).toMatchObject({"message": "Invalid email"});
  });

  test('fails if password is too short', async () => {
    const newUser = {
      firstName: "Testi",
      lastName: "Testi",
      email: "testi@abc.com",
      password: "a",
    };

    const response = await api
      .post(USER_API)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const issues = response.body.issues[0];

    expect(issues).toMatchObject({"message": "Password must be 8 or more characters long"});
  });

});

afterAll(() => {mongoose.connection.close()});