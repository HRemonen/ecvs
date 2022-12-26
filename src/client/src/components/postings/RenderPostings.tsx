import { useState } from "react";

import PostingCard from "./PostingCard";

import { Posting } from "@backend/types";
import Paginate from "./Paginate";

const RenderPostings: React.FC<{postings: Array<Posting & {id: string}>}> = ({ postings }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postings.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
 };

  return (
    <>
    <div>
      <Paginate postsPerPage={postsPerPage} totalPosts={postings.length} paginate={paginate} />
    </div>
      <div>
        <ul>
          { currentPosts.map(p => (
            <PostingCard key={p.id} posting={p} />
          ))}
        </ul>
      </div>
    </>
  )
};

export default RenderPostings;