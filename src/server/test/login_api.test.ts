import app from "../app";
import supertest from "supertest";
import UserModel from "../models/user";

const api = supertest(app);

const USER_API = "/api/users";
const LOGIN_API = "/api/login";

describe('Login API', () => {
  beforeAll(async () => {
    await UserModel.deleteMany({});

    await api
      .post(USER_API)
      .send({
        firstName: "Testi",
        lastName: "Testi",
        email: "testi@testi.fi",
        password: "salainen",
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);
  })

  test('Registered user can log in', async () => {
    const response = await api
      .post(LOGIN_API)
      .send({ email: "testi@testi.fi", password: "salainen" })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe('testi@testi.fi');
  });

  test('Un-registered user can not log in', async () => {
    const response = await api
      .post(LOGIN_API)
      .send({ email: "notgood@testi.fi", password: "salainen" })
      .expect(401)
      .expect('Content-Type', /application\/json/);
    
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toContain("Wrong credentials, check input fields")
  });

  test('Malformatted user input is caught by the validators', async () => {
    const response = await api
      .post(LOGIN_API)
      .send({ email: 123123, password: "salainen" })
      .expect(400)
      .expect('Content-Type', /application\/json/);
    
    expect(response.body.issues).toBeDefined();
  });
})