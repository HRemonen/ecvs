import { Ecv } from "../types";
import EcvModel from "../models/ecv";
import mongoose from "mongoose";

export type NewReturnEvc = Ecv & { _id: mongoose.Types.ObjectId }

const getEcvs = async (): Promise<Ecv[]> => {
  const ecvs = await EcvModel
    .find({})
    .populate('user', {firstName: 1, lastName: 1, email: 1, phoneNumber: 1, address: 1})
  return ecvs;
};

const createEcv = async (newEcv: any): Promise<NewReturnEvc> => {
  const ecv = new EcvModel({
    user: newEcv.user,
    expertise: newEcv.expertise ?? [],
    skills: newEcv.skills ?? [],
    education: newEcv.education ?? [],
    experience: newEcv.experience ?? [],
    qualifications: newEcv.qualifications ?? [],
    hobbies: newEcv.hobbies ?? [],
    languages: newEcv.languages ?? [],
    references: newEcv.references ?? [],
    socials: newEcv.socials ?? [],
    profile: newEcv.profile ?? ""
  });

  const createdEcv = await ecv.save();

  return createdEcv;
}

export default { getEcvs, createEcv };