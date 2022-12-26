import { faker } from '@faker-js/faker';
import mongoose from "mongoose";
import config from '../../utils/config';

import PostingModel from '../../models/posting';

async function seedData () {
  for (let i = 0; i < 100; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    const post = {
      hiringManager: {
          name: firstName + " " + lastName,
          email: faker.internet.email(firstName, lastName),
          phoneNumber: faker.phone.number('+### ## ### ####')
      },
      company: {
          name: faker.company.name(),
          location: faker.address.city()
      },
      title: faker.name.jobTitle(),
      type: faker.name.jobType(),
      info: faker.lorem.text(),
      endDate: faker.date.future(3)
    };
    PostingModel.create(post)
  }
}

void mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
    seedData()
    console.log('Finished populating postings')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message);
  });




