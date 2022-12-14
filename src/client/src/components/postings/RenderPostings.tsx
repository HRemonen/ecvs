import { useState } from "react";
import { useAppSelector } from "../../hooks/dispatchHooks";

import PostingCard from "./PostingCard";
import Paginate from "./Paginate";

import { Posting } from "@backend/types";
import ScrollToTop from "../index/ScrollToTop";

const RenderPostings: React.FC<{postings: Array<Posting & {id: string}>}> = ({ postings }) => {
  const auth = useAppSelector(state => state.authentication);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  if (useAppSelector(state => state.filter) && currentPage !== 1) setCurrentPage(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postings.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0 });
  };

  if (postings.length === 0) {
    return (
      <div className="flex mt-24 w-screen">
        <h1 className="m-auto">No postings match search criteria...</h1>
      </div>
    )
  }

  return (
    <>
      <ScrollToTop />
      <div>
        <h1 className="mt-8 mx-auto text-center text-lg md:text-2xl font-thin">
          Showing { postings.length } postings matching your search parameters.
        </h1>
        <Paginate postsPerPage={postsPerPage} totalPosts={postings.length} paginate={paginate} currentPage={currentPage}/>
      </div>
      <div className="mx-auto mt-4 max-w-[800px]">
        <ul id="posting-list">
          { currentPosts.map(p => (
            <PostingCard key={p.id} user={auth.user.id} posting={p} />
          ))}
        </ul>
      </div>
      <div className="pb-8">
        <Paginate postsPerPage={postsPerPage} totalPosts={postings.length} paginate={paginate} currentPage={currentPage}/>
      </div>
    </>
  )
};

export default RenderPostings;