import { useState } from "react";

import ExperienceField from "./ExperienceField";
import EducationField from "./EducationField";

import type { Experience, Education } from "@backend/types";

const EcvFields: React.FC<{field: string; content: string | string[] | Experience[] | Education[]}> = ({ field, content }) => {
  const [visible, setVisible] = useState(false)

  if (field === "user" || field === "id") return null;

  const renderContent = () => {
    switch (field) {
      case "experience":
        return (
          <div id="experience-field-content" className="ml-6">
            { (content as Experience[]).map((entry: Experience) => (
              <ExperienceField key={entry.company} entry={entry} />
            ))}
          </div>
        );
      case "education":
        return (
          <div id="education-field-content" className="ml-6">
            { (content as Education[]).map((entry: Education) => (
              <EducationField key={entry.school} entry={entry} />
            ))}
          </div>
        );
      case "profile":
        return <p id="profile-field-content" className="flex-1 ml-3">{ (content) as string }</p>
      default:
        return <p id={`${field}-field-content`} className="flex-1 ml-3">{ (content as string[]).join(", ") }</p> 
    }
  };

  return (
    <div className="text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow">
      <h1 className="flex items-center p-3 text-xl font-bold">
        <p id={`${field}-field`} className="flex-1 whitespace-nowrap cursor-pointer" onClick={() => setVisible(!visible)}>{ field }</p>
      </h1>
      { visible && renderContent() }
    </div>
  )
};

export default EcvFields;