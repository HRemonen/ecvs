import { HydratedDocument } from "mongoose";
import { Posting } from "../types";
import { ValidatedPosting } from "../utils/postingsValidator";
import PostingModel from "../models/posting";

const getPostings = async (): Promise<Posting[]> => {
  const postings = await PostingModel
    .find({})
    .populate('hiringManager')
  return postings;
};

const createPosting = async (manager: string, newPosting: ValidatedPosting): Promise<Posting> => {
  const posting: HydratedDocument<Posting> = new PostingModel({
    hiringManager: manager,
    company: newPosting.company,
    title: newPosting.title,
    info: newPosting.info ?? "",
    endDate: newPosting.info ?? "",
    applicants: []
  });

  const createdPosting = posting.save();

  return createdPosting;
};

export default { getPostings, createPosting }