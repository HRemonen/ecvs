import Illustration from '../../assets/illustration.png';

const About = () => (
  <div className="snap-start bg-gray-300 w-full h-screen flex items-center justify-center">
    <div className=''>
      <h1 className='font-thin text-4xl'>How it started.</h1>
      <p className='text-lg font-thin max-w-[400px]'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem nunc, 
        bibendum eget porta nec, interdum non odio. Duis turpis sem, laoreet sit amet molestie et, 
        vehicula quis eros. Cras quis accumsan libero. Etiam egestas lorem quis fermentum finibus. 
        Nunc rutrum orci vel justo finibus auctor. Sed efficitur felis non lacus gravida elementum. 
        Curabitur mattis augue vel euismod ultricies. Nulla facilisi. Ut tincidunt accumsan diam a maximus. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur rhoncus eget neque quis elementum. 
        Maecenas varius hendrerit ante. Integer ligula ipsum, mattis ac odio vel, vestibulum egestas libero. 
        Quisque fermentum dui in mi mattis, a blandit metus gravida.
      </p>
    </div>
    <img 
      className="object-cover h-[480px] w-[480px] rounded-3xl mt-[-400px] ml-[100px] shadow-xl border-2 border-gray-800 hover:shadow-2xl hover:blur-sm" 
      src={Illustration} alt="Profile picture of the user"
    />
  </div>
);

export default About;