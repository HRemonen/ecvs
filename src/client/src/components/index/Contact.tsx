const Contact = () => (
  <div id="contact" className="snap-center w-full h-screen flex items-center bg-gray-900 text-white justify-center">
    <div className="grid grid-flow-row grid-cols-12 grid-rows-1 gap-8">
      <div className="col-span-10 col-start-2">
        <h2 className="font-thin text-4xl">Get in touch with us</h2>
        <i className="flex w-1/2 font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem nunc, 
          bibendum eget porta nec, interdum non odio. Duis turpis sem, laoreet sit amet molestie et, 
          vehicula quis eros. Cras quis accumsan libero. Etiam egestas lorem quis fermentum finibus. 
          Nunc rutrum orci vel justo finibus auctor. Sed efficitur felis non lacus gravida elementum. 
        </i>

        <div className="flex mt-8">
          <div className="w-1/2">
            <h4>Contact us</h4>
            <p className="font-thin">Send us an email on <a className="underline" href="mailto:info@ecves.com">info@ecves.com</a></p>
          </div>
          <div className="w-1/2">
            <h4>Visit our office</h4>
            <p className="font-thin">Helsinki</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;