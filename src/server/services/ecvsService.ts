import { Ecv } from "../types";
import EcvModel from "../models/ecv";
import { ObjectId } from "mongoose";

const getEcvs = async (): Promise<Ecv[]> => {
  const ecvs = await EcvModel
    .find({})
    .populate('user')
  return ecvs;
};

const createEcv = async (newEcv: Ecv): Promise<Ecv> => {
  const ecv = new EcvModel({
    user: newEcv.user as ObjectId,
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