import app from "../app";
import supertest from "supertest";

import PostingModel from "../models/posting";
import getTestPostings from "./data/postings";

const api = supertest(app);

const POSTING_API = "/api/postings";

describe('Database returns JSON content', () => {
  test('postings are returned as json', async () => {
    await api
      .get(POSTING_API)
      .expect(200)
      .expect('Content-type', /application\/json/);
  });
});

describe('postings in the database', () => {
  beforeEach(async () => {
    await PostingModel.deleteMany({});
  
    await getTestPostings();
  });

  test('test postings are created correctly to the test databse', async () => {
    const response = await api.get(POSTING_API);

    expect(response.body).toHaveLength(2);
  });

  test('postings are identified with an id', async () => {
    const response = await api
      .get(POSTING_API)
      .expect(200)
      .expect('Content-type', /application\/json/);

    expect(response.body[0]).toBeDefined();
    expect(response.body[1]).toBeDefined();
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[1]).toHaveProperty("id");
  });

  test('single posting is returned correctly', async () => {
    const postingToFind = await PostingModel.findOne({});

    const response = await api
      .get(`${POSTING_API}/${postingToFind?.id}`)
      .expect(200)
      .expect('Content-type', /application\/json/);

    expect(response.body.id).toEqual(postingToFind?.id);
  });
});

describe('posting API', () => {
  beforeEach(async () => {
    await PostingModel.deleteMany({});
  
    await getTestPostings();
  });

  test('creation succeeds if valid fields are provided', async () => {
    const post = {
      hiringManager: {
          name: "Henri Remonen",
          email: "henri.remonen@ecves.fi",
          phoneNumber: "123123123"
      },
      company: {
          name: "Ecves",
          location: "Helsinki"
      },
      type: "Tech",
      title: "Frontend developer",
      info: "Hiring FE developer with 30 years of exeperience and no children",
      endDate: "2025-01-01"
    };
  
    const response = await api
      .post(POSTING_API)
      .send(post)
      .expect(201)
      .expect('Content-type', /application\/json/);

    expect(response.body).toBeDefined();
    expect(response.body.id).toBeDefined();
  });

  test('creation fails if invalid fields are provided', async () => {
    const post = {
      "hiringManager": "Testiman Testailija",
      "company": {
          "name": "Ecves",
          "location": "Helsinki"
      },
      "title": "Frontend developer",
      "info": "Hiring FE developer with 30 years of exeperience and no children",
    };

    const response = await api
      .post(POSTING_API)
      .send(post)
      .expect(400)
      .expect('Content-type', /application\/json/);

    expect(response.body.issues[0].message).toContain("Expected object, received string");
  });

  test('finding post with valid id returns the post', async () => {
    const post = await PostingModel.findOne({});

    const response = await api
      .get(`${POSTING_API}/${post?.id}`)
      .expect(200)
      .expect('Content-type', /application\/json/);

    expect(response.body).toBeDefined()
    expect(response.body).toEqual(
      expect.objectContaining({
        id: post?.id,
        hiringManager: post?.hiringManager,
        title: post?.title,
        info: post?.info,
      })
    );
  });

  test('finding post with invalid id fails with correct status code', async () => {
    const response = await api
      .get(`${POSTING_API}/${123123123123}`)
      .expect(401)
      .expect('Content-type', /application\/json/);

    expect(response.body.error).toContain("malformatted id")
  });
})