import Illustration from '../../assets/illustration.png';

const About = () => (
  <div className="snap-start bg-amber-300 w-full h-screen flex items-center justify-center text-4xl">
    <div>
      <img 
        className="object-cover h-[480px] w-[480px] rounded-3xl mt-[-400px] ml-[480px]" 
        src={Illustration} alt="Profile picture of the user"
      />
    </div>
    <div>

    </div>
  </div>
);

export default About;