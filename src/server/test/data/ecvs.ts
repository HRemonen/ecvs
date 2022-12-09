import { Ecv } from "../../types";

const testEcvs: Array<Ecv> = [
  {
    user: "",
    expertise: ["Koodaus", "kaljan juonti", "soutaminen"],
    skills: ["TypeScriptaus", "Häkkäys"],
    education: [],
    experience: [],
    qualifications: ["Koodauskilpa 2020"],
    hobbies: ["Sohvaurheilu"],
    references: [],
    socials: ["ig: @kaljakasasohvalla", "fb: sohvamies66"],
    profile: "Reipas mutta laiska meis!"
  },
  {
    user: "",
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
  },
];

export default testEcvs;