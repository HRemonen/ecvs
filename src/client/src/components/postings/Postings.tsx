import { useAppSelector } from "../../hooks/dispatchHooks";

import Navbar from "../index/Navbar";
import RenderPostings from "./RenderPostings";
import SearchBar from "./SearchBar";

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