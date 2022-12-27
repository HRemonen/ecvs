import { useParams, Link } from "react-router-dom";

import { useAppSelector } from "../../hooks/dispatchHooks";

import Profile from '../../assets/default_profile.svg';

const Posting = () => {
  const id = useParams().id;
  const auth = useAppSelector(state => state.authentication);
  const posting = useAppSelector(state => state.postings.find(p => p.id === id));

  if (!posting) return null;

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="grid grid-cols-2">
        <h1 className="text-4xl font-semibold text-gray-800 leading-tight">{ posting.title }</h1>
        <Link className="inline-flex mt-6 md:mt-0 justify-end" to="/postings">
          <span className="h-12 flex items-center justify-center uppercase font-semibold px-8 border border-black hover:bg-black hover:text-white transition duration-500 ease-in-out">Back to postings</span>
          <span className="h-12 w-12 flex-shrink-0 flex items-center justify-center border border-l-0 border-black hover:bg-black hover:text-white transition duration-500 ease-in-out">
            <svg 
              className="h-3 w-3 svg-inline--fa fa-chevron-right fa-w-8 fa-9x" 
              aria-hidden="true" focusable="false" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 256 512">
              <path fill="currentColor" d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z" />
            </svg>
          </span>
        </Link>
      </div>
      <div className="mb-4 md:mb-0 w-full mx-auto relative">
        <div className="px-4 lg:px-0">
          {posting.endDate &&
            <p className="py-2 text-blue-400 inline-flex items-center justify-center mb-2">
              Ends on { new Date(posting.endDate).toDateString() }
            </p>
          }
        </div>
        <img 
          src="https://images.unsplash.com/photo-1587614387466-0a72ca909e16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80" 
          className="w-full h-72 object-cover lg:rounded"
        />
      </div>
      <div className="mt-8">
        <p className="font-semibold">
          { posting.company.name }
        </p>
        <p>
          { posting.company.location }
        </p>
      </div>
      <div className="mt-8">
        { posting.info }
      </div>
      <div className="w-full md:w-2/4 m-auto mt-12 max-w-screen-sm">
        <div className="p-4 border-t border-b md:border md:rounded">
          <p className="mb-2">More info</p>
          <div className="flex py-2">
            <img src={Profile}
              className="h-10 w-10 rounded-full mr-2 object-cover" />
            <div>
              <p className="font-semibold text-gray-700 text-sm"> { posting.hiringManager.name } </p>
              <p className="font-semibold text-gray-600 text-xs"> { posting.hiringManager.email } </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Posting;