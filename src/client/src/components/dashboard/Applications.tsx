import { User } from "@backend/types";
import { useAppSelector } from "../../hooks/dispatchHooks";
import PostingCard from "../postings/PostingCard";

const Applications: React.FC<{user: User & {id: string}}> = ({ user }) => {
  const postings = useAppSelector(state => {
      return state.postings.filter(posting => 
        user.applications.includes(posting.id as never))})
  
  console.log(postings)
  return (
    <>
      <div>
        <ul>
          { postings.map(p => (
            <PostingCard key={p.id} user={user.id} posting={p} />
          ))}
        </ul>
      </div>
    </>
  )
}

export default Applications;