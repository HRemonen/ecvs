import { HydratedDocument, Types } from "mongoose";
import { Posting } from "../types";
import { ValidatedPosting } from "../utils/postingsValidator";
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

export default { getPosting, getPostings, createPosting }