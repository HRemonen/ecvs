import UserModel from "../../models/user";
import ecvsService from "../../services/ecvsService";

const getTestEcvs = async () => {
  const user = await UserModel.findOne();

  const ecvs1 = await ecvsService.createEcv(user?.id, {
    skills: ["TypeScriptaus", "Häkkäys"],
    education: [],
    experience: [],
    profile: "Reipas mutta laiska meis!"
  });

  const ecvs2 = await ecvsService.createEcv(user?.id, {
    skills: ["TS", "JS", "Node.js", "Git", "COBOL", "Assembly", "TTK91"],
    education: [{
      school: "MIT",
      startDate: new Date(2019, 8, 1)
    }],
    experience: [],
    profile: "New grad looking to get hands dirty!"
  });

  return [ecvs1, ecvs2];
}


export default getTestEcvs;