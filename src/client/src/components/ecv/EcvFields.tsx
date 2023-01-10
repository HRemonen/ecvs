import ExperienceField from "./ExperienceField";
import EducationField from "./EducationField";

import type { Experience, Education } from "@backend/types";

const EcvFields: React.FC<{field: string; content: string | string[] | Experience[] | Education[]}> = ({ field, content }) => {
  if (["createdOn", "applied", "user", "name", "id"].find(el => el.includes(field)) || content.length === 0) return null;

  const renderContent = () => {
    switch (field) {
      case "experience":
        return (
          <div id="experience-field-content">
            { (content as Experience[]).map((entry: Experience) => (
              <ExperienceField key={entry.company} entry={entry} />
            ))}
          </div>
        );
      case "education":
        return (
          <div id="education-field-content">
            { (content as Education[]).map((entry: Education) => (
              <EducationField key={entry.school} entry={entry} />
            ))}
          </div>
        );
      case "profile":
        return <p className="ml-4 pb-2 text-sm border-b-2 hover:border-gray-400" id="profile-field-content">{ (content) as string }</p>
      default:
        return <p className="ml-4 pb-2 text-sm border-b-2 hover:border-gray-400" id={`${field}-field-content`}>{ (content as string[]).join(", ") }</p> 
    }
  };

  return (
    <div id={`${field}-field`}>
      <h1 className="py-2 items-center text-lg underline capitalize">
        { field }
      </h1>
      { renderContent() }
    </div>
  )
};

export default EcvFields;