import Hero from "./Hero";
import Navbar from "./Navbar";

const Index = () => {
  return (
    <>
      <Navbar />
      <div className="snap-y snap-mandatory h-screen w-screen overflow-scroll">
        <Hero />

        <div className="snap-start bg-amber-200 w-screen h-screen flex items-center justify-center text-4xl">
          2
        </div>
        <div className="snap-start bg-gray-900 w-screen h-screen flex items-center justify-center text-4xl">
          3
        </div>
      </div>
    </>
  );
};

export default Index;