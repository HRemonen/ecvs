import { Education } from "@backend/types";

const EducationField: React.FC<{entry: Education;}> = ({ entry }) => (
  <div key={entry.school} className="ml-4 pb-2 text-sm border-b-2 hover:border-gray-400">
    <h1 className="pt-2 text-md font-semibold">{entry.school}</h1>
    <p className="text-gray-400">{new Date(entry.startDate).toDateString()} - {new Date((entry.graduationDate) as Date).toDateString()}</p>
    <p className="text-gray-600 mt-4">{entry.additionalInfo}</p>
  </div>
);

export default EducationField;