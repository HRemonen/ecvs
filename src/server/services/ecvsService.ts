import { Ecv } from "../types";
import { HydratedDocument, Types } from "mongoose";
import { ValidatedEcv } from "../utils/ecvsValidator";
import EcvModel from "../models/ecv";
import UserModel from "../models/user";

const getLoggedUser = async (userId: string) => {
  const loggedUser = await UserModel.findById(userId);
  if (!loggedUser) {
    throw new Error("user not found");
  }
  return loggedUser;
};

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

  const loggedUser = await getLoggedUser(newEcv.user);

  const createdEcv = await ecv.save();

  loggedUser.ecvs.push(createdEcv._id);

  await loggedUser.save();

  return createdEcv;
};

const updateEcv = async (evcId: string, ecvToUpdate: ValidatedEcv) => {
  const updatedEcv = await EcvModel.findByIdAndUpdate(
    evcId, ecvToUpdate, { new: true, context: 'query' }
  );

  return updatedEcv;
};

const deleteEcv = async (ecvToDelete: string, user: string) => {
  await EcvModel.findByIdAndRemove(ecvToDelete);

  const loggedUser = await getLoggedUser(user)

  loggedUser.ecvs = loggedUser?.ecvs.filter(ecv => ecv.toString() !== ecvToDelete);

  return loggedUser.ecvs;
};

export default { getEcvs, createEcv, updateEcv, deleteEcv };