import { useState } from "react";

import { useAppSelector } from "../../hooks/dispatchHooks";

import PostingCard from "./PostingCard";
import Paginate from "./Paginate";

import { Posting } from "@backend/types";

const RenderPostings: React.FC<{postings: Array<Posting & {id: string}>}> = ({ postings }) => {
  const auth = useAppSelector(state => state.authentication);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  if (useAppSelector(state => state.filter) && currentPage !== 1) setCurrentPage(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postings.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div>
        <Paginate postsPerPage={postsPerPage} totalPosts={postings.length} paginate={paginate} />
      </div>
      <div>
        <ul>
          { currentPosts.map(p => (
            <PostingCard key={p.id} user={auth.user.id} posting={p} />
          ))}
        </ul>
      </div>
    </>
  )
};

export default RenderPostings;