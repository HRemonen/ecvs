import postingService from "../../services/postingService";

const getTestPostings = async () => {
  const post1 = await postingService.createPosting({
    "hiringManager": {
        "name": "Henri Remonen",
        "email": "henri.remonen@ecves.fi",
        "phoneNumber": "123123123"
    },
    "company": {
        "name": "Ecves",
        "location": "Helsinki"
    },
    "title": "Frontend developer",
    "info": "Hiring FE developer with 30 years of exeperience and no children",
    "endDate": new Date(2025, 1, 1)
  });
  const post2 = await postingService.createPosting({
    "hiringManager": {
        "name": "Kalevi Kallela",
        "email": "kalevi.kallela@ecves.fi",
        "phoneNumber": "0504345060"
    },
    "company": {
        "name": "Ecves",
        "location": "Turku"
    },
    "title": "Agile coach",
    "info": "Hiring Agile coach, responsibilities includes cleaning the wc and daycare duties",
    "endDate": new Date(2025, 1, 1)
  });

  return [post1, post2];
};

export default getTestPostings;