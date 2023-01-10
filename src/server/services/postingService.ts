import { HydratedDocument, Types } from "mongoose";
import { Posting } from "../types";
import { ValidatedPosting } from "../utils/postingsValidator";

import EcvModel from "../models/ecv";
import UserModel from "../models/user";
import PostingModel from "../models/posting";

const getPosting = async (id: string): Promise<Posting & { _id: Types.ObjectId }> => {
  const posting = await PostingModel.findById(id);
  if (!posting) {
    throw new Error("posting not found");
  }
  return posting;
}

const getPostings = async (): Promise<Posting[]> => {
  const postings = await PostingModel
    .find({})
  return postings;
};

const createPosting = async (newPosting: ValidatedPosting): Promise<Posting> => {
  const posting: HydratedDocument<Posting> = new PostingModel({
    hiringManager: newPosting.hiringManager,
    company: newPosting.company,
    title: newPosting.title,
    type: newPosting.type,
    postDate: new Date(),
    info: newPosting.info ?? "",
    endDate: newPosting.endDate ?? "",
    applicants: []
  });

  const createdPosting = posting.save();

  return createdPosting;
};

const applyPosting = async (userId: string, ecvId: string, postingId: string): Promise <void> => {
  const user = await UserModel.findById(userId);
  const ecv = await EcvModel.findById(ecvId);
  const posting = await PostingModel.findById(postingId);

  if (!user || !posting || !ecv) {
    throw new Error("Something went wront")
  }
  ecv.applied.push(posting.id);
  await ecv.save();
  user.applications.push(posting.id);
  await user.save();
  posting.applicants.push(ecv.id);
  await posting.save();
};

export default { getPosting, getPostings, createPosting, applyPosting }