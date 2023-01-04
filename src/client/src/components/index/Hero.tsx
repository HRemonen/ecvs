import { useSpring, animated } from "@react-spring/web";

const NumberAnimation: React.FC<{n: number}> = ({ n }) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 10, friction: 10 }
  });
  return <animated.div>{ number.to((n) => n.toFixed(0))}</animated.div>
}

const Hero = () => (
  <div className="snap-start w-screen h-screen">
    <div className="pt-8 md:pt-64 md:max-w-[800px] w-4/5 mx-auto text-center flex flex-col justify-center">
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
    <div className="flex justify-between items-center pt-16 md:pt-96 md:mx-48 text-center md:text-5xl font-semibold">
      <div>
        <NumberAnimation n={3} />
        <p className="pt-8 font-light md:text-lg">Users on platform</p>
      </div>
      <div>
        <NumberAnimation n={21} />
        <p className="pt-8 font-light md:text-lg">Ecvs created</p>
      </div>
      <div>
        <NumberAnimation n={103} />
        <p className="pt-8 font-light md:text-lg">Job opportunities</p>
      </div>
    </div>
  </div>
);

export default Hero;