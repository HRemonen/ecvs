import { useAppSelector } from "../../hooks/dispatchHooks";
import Navbar from "../index/Navbar";

const Postings = () => {
  const postings = useAppSelector(state => state.postings);
  console.log(postings)
  return (
    <>
      <Navbar />
    </>
  )
};

export default Postings;