import mongoose from "mongoose";
import { Ecv } from "../types";

const ecvSchema = new mongoose.Schema<Ecv>({
  createdOn: Date,
  name: { type: String, default: '' },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  experience: [Object],
  education: [Object],
  skills: [String],
  hobbies: [String],
  languages: [String],
  profile: String,
  applied: [String]
});

ecvSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const EcvModel = mongoose.model('Ecv', ecvSchema);

export default EcvModel;