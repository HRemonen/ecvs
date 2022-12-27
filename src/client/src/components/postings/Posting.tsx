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
      <Link to="/postings"> Back to postings</Link>
      <div className="mb-4 md:mb-0 w-full mx-auto relative">
        <div className="px-4 lg:px-0">
          <h1 className="text-4xl font-semibold text-gray-800 leading-tight">{ posting.title }</h1>
          <p className="py-2 text-blue-400 inline-flex items-center justify-center mb-2">
            Ends on { posting?.endDate?.toString() }
          </p>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1587614387466-0a72ca909e16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80" 
          className="w-full h-72 object-cover lg:rounded"
        />
      </div>
      <div className="mt-8">
        <p className="pb-6 font-semibold">
          { posting.company.name },
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