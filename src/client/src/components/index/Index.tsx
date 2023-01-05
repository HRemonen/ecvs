import About from "./About";
import Contact from "./Contact";
import Hero from "./Hero";
import Navbar from "./Navbar";

const Index = () => {
  return (
    <>
      <div className="snap-y snap-mandatory h-screen w-full overflow-scroll">
        <div className="snap-start w-full h-screen">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Contact />
      </div>
    </>
  );
};

export default Index;