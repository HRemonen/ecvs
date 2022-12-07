import mongoose from "mongoose";
import { Ecv } from "../types";

const ecvSchema = new mongoose.Schema<Ecv>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  expertise: [String],
  skills: [String],
  education: [Object],
  experience: [Object],
  qualifications: [String],
  hobbies: [String],
  languages: [String],
  references: [String],
  socials: [String],
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