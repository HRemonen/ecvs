import { Ecv } from "@backend/types";

const EcvField: React.FC<{field: string; content: string | string[]}> = ({ field, content }) => {
  if (field === "user" || field === "id") return null;

  return (
    <li>
      <h1 className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow">
        <span className="flex-1 ml-3 whitespace-nowrap">{ field }</span>
        <span className="flex-1 ml-3 whitespace-nowrap">{ content }</span>
      </h1>
    </li>
  )
};

const EcvCard: React.FC<{ecv: Ecv & {id: string}}> = ({ ecv }) => {
  return (
    <div className="w-full max-w-sm p-4 bg-white border rounded-lg shadow-md sm:p-6">
        <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl">
            Ecv # { ecv.id }
        </h5>
        <ul className="my-4 space-y-3">
          { Object.entries(ecv).map(([key, value]) => {
              <h1>{}</h1>
              return <EcvField key={key} field={key} content={value}/>
            }
          )}
        </ul>
    </div>
  )
};

export default EcvCard;