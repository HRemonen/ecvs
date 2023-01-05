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

        <div className="snap-start bg-amber-300 w-full h-screen flex items-center justify-center text-4xl">
          2
        </div>
        <Contact />
      </div>
    </>
  );
};

export default Index;