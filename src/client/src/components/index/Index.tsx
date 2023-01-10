import About from "./About";
import Contact from "./Contact";
import Hero from "./Hero";
import ScrollToTop from "./ScrollToTop";

const Index = () => {
  return (
    <>
      <ScrollToTop />
      <div id="landing-page" className="snap-y snap-proximity h-screen w-full">
        <Hero />
        <About />
        <Contact />
      </div>
    </>
  );
};

export default Index;