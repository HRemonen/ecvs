import { useAppSelector } from "./hooks/dispatchHooks";
const Postings = () => {
  const postings = useAppSelector(state => state.postings);
};

export default Postings;