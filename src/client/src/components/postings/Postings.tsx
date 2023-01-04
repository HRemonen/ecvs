import { useAppSelector } from "../../hooks/dispatchHooks";

import SearchBar from "./SearchBar";
import RenderPostings from "./RenderPostings";
import Navbar from "../index/Navbar";

const Postings = () => {
  const postings = useAppSelector(state => {
    if (state.filter) {
      return state.postings.filter(posting => (
        posting.title.toLowerCase().includes(state.filter.toLowerCase())
      ))
    }
    return state.postings});
    
  return (
    <>
      <Navbar />
      <SearchBar />
      <RenderPostings postings={postings} />
    </>
  )
};

export default Postings;