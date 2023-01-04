const Hero = () => (
  <div className="snap-start w-screen h-screen">
    <div className="pt-24 md:max-w-[800px] w-4/5 mx-auto text-center flex flex-col justify-center">
      <div className="">
        <p className="text-2xl font-bold pb-2">
          Your dream job is just a click away
        </p>
        <h1 className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-5xl font-extrabold text-transparent sm:text-5xl">
          From resumes to interviews, we&lsquo;ve got you covered
        </h1>
        <p className="pt-4">
          Our platform connects job seekers and employers in one easy-to-use web platform. 
          Post your CV and search for job postings, or post job openings and search for qualified candidates. 
          Our platform makes it easy to find your next career opportunity.
        </p>
      </div>
    </div>
  </div>

);

export default Hero;