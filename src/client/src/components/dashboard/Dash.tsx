import { Link } from "react-router-dom";

const Dash = () => {
  return (
    <div className="md:max-w-[800px] w-4/5 ml-2 text-left flex flex-col">
      <h1 className="text-[#1d1853] md:text-4xl sm:text-3xl text-2xl font-bold py-2">
        Welcome back
      </h1>
      <div className="pt-4">
        <p>
          Here is the Ecves user dashboard where you can view your profile. <br />
          Click above links to navigate on the dashboard. 
        </p>
        <p className="pt-8">
          <strong>Ecvs tab:</strong> <br />
            On <i>Ecvs tab</i> you can view and delete your ecv&lsquo;s. <br />
            Double click on the <i>id #</i> of the ecv to rename the ecv as you like. <br />
            Ecv name will be shown when applying to job postings. If no name is given, ecvs are identified with their automatically generated id numbers.
        </p>
        <p className="pt-4">
          <strong>Applications tab:</strong> <br />
            On the <i>Applications tab</i> you can view job postings that you have applied to.
        </p>
        <p className="pt-8">
          Start by creating a new Ecv for yourself or maybe update your old ones!
        </p>
      </div>

      <p className="mt-2 flex text-blue-600"> 
        <Link id="new-ecv" className="inline-flex items-center font-medium hover:underline" to="/dashboard/ecvs/create">Create a new ecv</Link>
        <svg aria-hidden="true" className="ml-1 mt-[2px] w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path 
            fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd">
          </path>
        </svg>
      </p>
    </div>
  )
};

export default Dash;