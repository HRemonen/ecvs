import Illustration from '../../assets/illustration.png';

const About = () => (
  <div className="snap-start bg-gray-300 w-full h-screen flex items-center justify-center">
    <div className=''>
      <h1 className='font-thin text-4xl'>Whats going on.</h1>
      <div className='text-lg font-thin max-w-[400px]'>
        <p>
          We are dedicated to connecting job seekers with exciting opportunities 
          and helping employers find the perfect candidates for their open positions.
        </p>
        <p className='mt-4'>
          Our business model is centered on the idea that users can create electronic resumes, 
          or ecv&lsquo;s, and use them to apply for jobs. We believe that this modern approach streamlines 
          the application process and makes it easier for both job seekers and employers to connect.
        </p>
        <p className='mt-4'>
          Our platform is user-friendly and easy to navigate. Job seekers can search for openings by location, 
          industry, and job title, and can apply with just a few clicks. Employers can post job openings, search through resumes, 
          and communicate with potential candidates all in one place.
        </p>
      </div>
    </div>
    <img 
      className="object-cover h-[480px] w-[480px] rounded-3xl mt-[-400px] ml-[100px] shadow-xl border-2 border-gray-800 hover:shadow-2xl hover:blur-sm" 
      src={Illustration} alt="Profile picture of the user"
    />
  </div>
);

export default About;