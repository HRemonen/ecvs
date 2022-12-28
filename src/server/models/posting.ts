import mongoose from "mongoose";

import { Posting } from "../types";

const postingSchema = new mongoose.Schema<Posting>({
  hiringManager: {type: Object, required: true},
  company: {type: Object, required: true},
  title: {type: String, required: true},
  type: {type: String, required: true},
  info: String,
  postDate: Date,
  endDate: Date,
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ecv'
    }
  ]
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
