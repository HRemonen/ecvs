import { Ecv } from "../types";
import { HydratedDocument, Types } from "mongoose";
import { ValidatedEcv } from "../utils/ecvsValidator";
import EcvModel from "../models/ecv";

const getEcvs = async (): Promise<Ecv[]> => {
  const ecvs = await EcvModel
    .find({})
    .populate('user', {firstName: 1, lastName: 1, email: 1, phoneNumber: 1, address: 1})
  return ecvs;
};

const createEcv = async (newEcv: ValidatedEcv): Promise<Ecv & { _id: Types.ObjectId }> => {
  const ecv: HydratedDocument<Ecv> = new EcvModel({
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
};

export default { getEcvs, createEcv };