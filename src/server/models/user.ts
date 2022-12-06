import mongoose from "mongoose";
import { User } from "../types";

const userSchema = new mongoose.Schema<User>({
  usertype: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  passwordHash: {type: String, required: true},
  birthdate: Date,
  address: String,
  ecvs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ecv'
    }
  ],
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application'
    }
  ]
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
});

const UserModel = mongoose.model('User', userSchema);


export default UserModel;