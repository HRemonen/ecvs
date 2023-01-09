import { useSpring, animated } from "@react-spring/web";
import { useAppSelector } from "../../hooks/dispatchHooks";
import Navbar from "./Navbar";

const NumberAnimation: React.FC<{n: number}> = ({ n }) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 10, friction: 10 }
  });
  return <animated.div>{ number.to((n) => n.toFixed(0))}</animated.div>
}

const Hero = () => {
  const users = useAppSelector(state => state.users);
  const ecvs = useAppSelector(state => state.ecvs);
  const postings = useAppSelector(state => state.postings);

  return (
    <div className="snap-center w-full h-screen">
      <Navbar />
      <div className="mt-[100px] md:mt-[200px] md:max-w-[800px] max-h-fit w-4/5 mx-auto text-center flex flex-col justify-center">
        <div className="">
          <p className="text-2xl font-bold pb-2">
            Your dream job is just a click away
          </p>
          <h1 className="pt-8 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-5xl font-extrabold text-transparent sm:text-5xl">
            From resumes to interviews, we&lsquo;ve got you covered
          </h1>
          <p className="hidden md:block pt-4">
            Our platform connects job seekers and employers in one easy-to-use web platform. 
            Post your CV and search for job postings, or post job openings and search for qualified candidates. 
            Our platform makes it easy to find your next career opportunity.
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-24 md:mt-[300px] md:mx-24 lg:mx-48 text-center md:text-6xl font-light">
        <div>
          <NumberAnimation n={users.length} />
          <p className="pt-8 font-thin md:text-lg">Users on platform</p>
        </div>
        <div>
          <NumberAnimation n={ecvs.length} />
          <p className="pt-8 font-thin md:text-lg">Ecvs created</p>
        </div>
        <div>
          <NumberAnimation n={postings.length} />
          <p className="pt-8 font-thin md:text-lg">Job opportunities</p>
        </div>
      </div>
    </div>
  )
};

export default Hero;