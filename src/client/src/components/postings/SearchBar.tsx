import { SyntheticEvent, useState } from "react";

import { useAppDispatch } from "../../hooks/dispatchHooks";

import { newFilter } from "../../reducers/filterReducer";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState('');

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    
    dispatch(newFilter(searchInput));
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex justify-center">
        <div className="relative w-4/5">
          <input 
            type="search"
            value={searchInput}
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-300 focus:border-blue-500" 
            placeholder="Search job titles"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" 
            className="absolute top-0 right-0 p-2.5 text-sm font-medium  text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-5 py-2.5 text-center mb-2">
            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path 
                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
              </path>
            </svg>
          </button>
        </div>
      </div>
    </form>
  )
};

export default SearchBar;