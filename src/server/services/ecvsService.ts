import { HydratedDocument, Types } from "mongoose";
import { Ecv } from "../types";
import EcvModel from "../models/ecv";
import usersService from "./usersService";
import { ValidatedEcv } from "../utils/ecvsValidator";

const getEcv = async (id: string): Promise<Ecv & { _id: Types.ObjectId } | null> => {
  const ecv = await EcvModel.findById(id);

  return ecv;
};

const getEcvs = async (): Promise<Ecv[]> => {
  const ecvs = await EcvModel
    .find({})
    .populate('user', {firstName: 1, lastName: 1, email: 1, phoneNumber: 1, address: 1});

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

  const loggedUser = await usersService.getUser(newEcv.user);

  const createdEcv = await ecv.save();

  loggedUser.ecvs.push(createdEcv._id);

  await loggedUser.save();

  return createdEcv;
};

const updateEcv = async (evcId: string, ecvToUpdate: ValidatedEcv): Promise<Ecv & { _id: Types.ObjectId } | null> => {
  const updatedEcv = await EcvModel.findByIdAndUpdate(
    evcId, ecvToUpdate, { new: true, context: 'query' }
  );

  return updatedEcv;
};

const deleteEcv = async (ecvToDelete: string, user: string): Promise<Types.ObjectId[]> => {
  await EcvModel.findByIdAndRemove(ecvToDelete);

  const loggedUser = await usersService.getUser(user);

  loggedUser.ecvs = loggedUser?.ecvs.filter(ecv => ecv.toString() !== ecvToDelete);

  return loggedUser.ecvs;
};

export default { getEcv, getEcvs, createEcv, updateEcv, deleteEcv };