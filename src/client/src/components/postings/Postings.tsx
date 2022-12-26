import { useAppSelector } from "../../hooks/dispatchHooks";

import Navbar from "../index/Navbar";
import RenderPostings from "./RenderPostings";
import SearchBar from "./SearchBar";

const Postings = () => {
  const postings = useAppSelector(state => state.postings);
  console.log(postings)
  return (
    <>
      <Navbar />
      <SearchBar />
      <RenderPostings postings={postings} />
    </>
  )
};

export default Postings;