import mongoose from "mongoose";

import { CompanyUser, Ecv } from "../types";

interface Company {
  name: string;
  location: string;
}

interface Posting {
  hiringManager: CompanyUser,
  company: Company;
  title: string;
  info: string;
  endDate: Date;
  applicants: Array<Ecv>
}

const postingSchema = new mongoose.Schema<Posting>({
  hiringManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company: [Object],
  title: String,
  info: String,
  endDate: Date,
  applicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ecv'
  }]
});

postingSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const PostingModel = mongoose.model('Posting', postingSchema);

export default PostingModel;
