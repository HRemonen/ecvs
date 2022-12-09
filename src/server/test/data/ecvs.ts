import UserModel from "../../models/user";
import ecvsService from "../../services/ecvsService";

const getTestEcvs = async () => {
  const user = await UserModel.findOne();

  const ecvs1 = ecvsService.createEcv({
    user: user?.id,
    expertise: ["Koodaus", "kaljan juonti", "soutaminen"],
    skills: ["TypeScriptaus", "Häkkäys"],
    education: [],
    experience: [],
    qualifications: ["Koodauskilpa 2020"],
    hobbies: ["Sohvaurheilu"],
    references: [],
    socials: ["ig: @kaljakasasohvalla", "fb: sohvamies66"],
    profile: "Reipas mutta laiska meis!"
  });

  const ecvs2 = ecvsService.createEcv({
    user: user?.id,
    expertise: ["TypeScript", "AWS", "Scrum", "Agile methods", "Fast API"],
    skills: ["TS", "JS", "Node.js", "Git", "COBOL", "Assembly", "TTK91"],
    education: [{
      school: "MIT",
      startDate: new Date(2019, 8, 1)
    }],
    experience: [],
    qualifications: ["Koodauskilpa 2020"],
    hobbies: ["Sohvaurheilu"],
    references: [],
    socials: ["github: koodausmake"],
    profile: "New grad looking to get hands dirty!"
  });

  return [ecvs1, ecvs2];
}


export default getTestEcvs;