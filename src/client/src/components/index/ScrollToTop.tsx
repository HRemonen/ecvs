import { useState, useEffect } from "react";
import { BsFillArrowUpSquareFill } from "react-icons/bs";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) setShowButton(true); 
      else setShowButton(false);
    });
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth"});

  return (
    <>
      { showButton && <BsFillArrowUpSquareFill color="#c084fc" className="hidden md:block fixed z-50 bottom-[40px] right-[40px] cursor-pointer" size={40} onClick={scrollTop}/> }
    </>
  )
};

export default ScrollToTop;