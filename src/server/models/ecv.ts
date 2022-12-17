import mongoose from "mongoose";
import { Ecv } from "../types";

const ecvSchema = new mongoose.Schema<Ecv>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skills: [String],
  education: [Object],
  experience: [Object],
  languages: [String],
  profile: String
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