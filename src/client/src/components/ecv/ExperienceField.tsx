import { Experience } from "@backend/types";

const ExperienceField: React.FC<{entry: Experience;}> = ({ entry }) => (
  <div key={entry.company} className="text-sm border-b-2 hover:border-gray-400">
    <h1 className="text-lg font-semibold">{entry.company}</h1>
    <p className="text-gray-400">{new Date(entry.startDate).toDateString()} - {new Date((entry.endDate) as Date).toDateString()}</p>
    <p >{ entry.position }</p>
    <p className="text-gray-600 mt-4">{entry.additionalInfo}</p>
  </div>
);

export default ExperienceField;

