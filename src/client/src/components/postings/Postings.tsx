import { useAppSelector } from "../../hooks/dispatchHooks";
import Navbar from "../index/Navbar";
import PostingCard from "./PostingCard";
import SearchBar from "./SearchBar";

const Postings = () => {
  const postings = useAppSelector(state => state.postings);
  console.log(postings)
  return (
    <>
      <Navbar />
      <SearchBar />
      <div className="justify-center">
        <ul>
          { postings.map(p => (
            <PostingCard key={p.id} posting={p} />
          ))}
        </ul>
      </div>
    </>
  )
};

export default Postings;