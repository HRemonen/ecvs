import About from "./About";
import Contact from "./Contact";
import Hero from "./Hero";

const Index = () => {
  return (
    <>
      <div className="snap-y snap-mandatory h-screen w-full overflow-scroll">
        <Hero />
        <About />
        <Contact />
      </div>
    </>
  );
};

export default Index;