import Hero from "./Hero";

const Index = () => {
  return (
    <div className="snap-y snap-mandatory h-screen w-screen">
      <Hero />

      <div className="bg-amber-200 w-screen h-screen flex items-center justify-center text-4xl">
        2
      </div>
      <div className="bg-teal-200 w-screen h-screen flex items-center justify-center text-4xl">
        3
      </div>
      <div className="bg-cyan-200 w-screen h-screen flex items-center justify-center text-4xl">
        4
      </div>
    </div>
  );
};

export default Index;