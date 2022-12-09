import app from "../app";
import mongoose from "mongoose";
import supertest from "supertest";

import UserModel from "../models/user";
import getTestUsers from "./data/users";

const api = supertest(app);

beforeEach(async () => {
  await UserModel.deleteMany({});


})

test('ecvs are returned as json', async () => {
  await api
    .get('/api/ecvs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

afterAll(() => {mongoose.connection.close()});