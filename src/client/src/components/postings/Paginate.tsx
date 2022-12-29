const Paginate: React.FC<{postsPerPage: number, totalPosts: number, paginate: (pageNumber: number) => void, currentPage: number}> = 
  ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
 
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
     pageNumbers.push(i);
  }

  return (
    <div className=" ">
      <ul className="flex flex-wrap justify-center aling-center mt-12 gap-4">
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className={`text-center text-sm w-8 font-semibold p-2 border border-gray-400 rounded-lg cursor-pointer
              ${number === currentPage 
                ? "text-white bg-[#1d1853]" 
                : "text-[#1d1853] hover:bg-[#1d1853] hover:text-white"}
              `}
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};
 
export default Paginate;