import { HydratedDocument, Types } from "mongoose";
import { Ecv } from "../types";
import EcvModel from "../models/ecv";
import usersService from "./usersService";
import { ValidatedEcv } from "../utils/ecvsValidator";

const getEcv = async (id: string): Promise<Ecv & { _id: Types.ObjectId }> => {
  const ecv = await EcvModel.findById(id);
  if (!ecv) {
    throw new Error("ecv not found");
  }
  return ecv;
};

const getEcvs = async (): Promise<Ecv[]> => {
  const ecvs = await EcvModel
    .find({})
    .populate('user', {firstName: 1, lastName: 1, email: 1, phoneNumber: 1, address: 1});

  return ecvs;
};

const createEcv = async (user: string, newEcv: ValidatedEcv): Promise<Ecv & { _id: Types.ObjectId }> => {
  const ecv: HydratedDocument<Ecv> = new EcvModel({
    user: user,
    createdOn: new Date(),
    skills: newEcv.skills ?? [],
    education: newEcv.education ?? [],
    experience: newEcv.experience ?? [],
    hobbies: newEcv.hobbies ?? [],
    languages: newEcv.languages ?? [],
    profile: newEcv.profile ?? "",
    applied: []
  });

  const loggedUser = await usersService.getUser(user);

  const createdEcv = await ecv.save();

  loggedUser.ecvs.push(createdEcv._id);

  await loggedUser.save();

  return createdEcv;
};

const updateEcv = async (evcId: string, ecvToUpdate: ValidatedEcv): Promise<Ecv & { _id: Types.ObjectId }> => {
  const updatedEcv = await EcvModel.findByIdAndUpdate(
    evcId, ecvToUpdate, { new: true, context: 'query' }
  );
  if (!updatedEcv) {
    throw new Error("ecv not found");
  }

  return updatedEcv;
};

const deleteEcv = async (user: string, ecvToDelete: string): Promise<Types.ObjectId[]> => {
  await EcvModel.findByIdAndRemove(ecvToDelete);

  const loggedUser = await usersService.getUser(user);

  loggedUser.ecvs = loggedUser?.ecvs.filter(ecv => ecv.toString() !== ecvToDelete);
  
  await loggedUser.save();

  return loggedUser.ecvs;
};

export default { getEcv, getEcvs, createEcv, updateEcv, deleteEcv };