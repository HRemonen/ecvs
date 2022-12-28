import EcvModel from "../models/ecv";
import PostingModel from "../models/posting";
import UserModel from "../models/user";

const applyJob = async (userId: string, ecvId: string, postingId: string): Promise <void> => {
  const user = await UserModel.findById(userId);
  const ecv = await EcvModel.findById(ecvId);
  const posting = await PostingModel.findById(postingId);

  if (!user || !posting || !ecv) {
    throw new Error("Something went wront")
  }

  user.applications.push(posting.id);
  await user.save();
  posting.applicants.push(ecv.id);
  await posting.save();
};

export default { applyJob };