import { Link } from "react-router-dom";

import { Posting } from "@backend/types";

const PostingCard: React.FC<{user:string; posting: Posting & {id: string}}> = ({ user, posting }) => {
  return (
    <div className="p-4">
      <div className="w-full md:flex">
        <div 
          className="h-48 md:h-auto md:w-48 flex-none bg-cover rounded-t md:rounded-t-none md:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: 'url(' + "https://www.w3schools.com/css/img_mountains.jpg " + ')'}}>
        </div>
        <div className="grow border-r border-b border-l border-gray-400 md:border-l-0 md:border-t md:border-gray-400 bg-white rounded-b md:rounded-b-none md:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            {!user 
              ? <p className="text-sm text-gray-600 flex items-center">
                  <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                  </svg>
                  Login to apply
                </p>
              : <Link
                  to={`/postings/${posting.id}`}
                  className="text-sm text-gray-600 flex items-center">
                  More info
                </Link>
            }
            <div className="text-gray-900 font-bold text-xl mb-2">{ posting.title }</div>
            <p className="text-gray-700 text-base">{ `${posting.info.substring(0, 80)}...` }</p>
          </div>
          <div className="flex items-center">
            <div className="text-sm">
              <p className="text-gray-900 leading-none">{ posting.company.name }</p>
              <p className="text-gray-600">{ posting.company.location }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PostingCard;