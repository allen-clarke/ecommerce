import hero from "../../assets/hero.jpeg";

const Hero = () => {
  return (
    <div className="bg-gray-800 font-[sans-serif] p-6">
      <div className="grid md:grid-cols-2 items-center gap-10 max-w-5xl max-md:max-w-md mx-auto">
        <div className="md:h-[600px]">
          <img src={hero} className="w-full h-full rounded-md object-cover" />
        </div>

        <div className="max-md:text-center">
          <h3 className="text-white font-semibold md:text-3xl text-2xl md:leading-10">
            Prompt Delivery and Enjoyable Shopping Experience.
          </h3>
          <p className="text-gray-300 mt-4 text-sm leading-relaxed">
            Laboris qui Lorem ad tempor ut reprehenderit. Nostrud anim nulla
            officia ea sit deserunt. Eu eu quis anim aute Laboris qui Lorem ad
            tempor ut reprehenderit.
          </p>
          <button
            type="button"
            className="px-5 py-2.5 mt-8 bg-blue-700 hover:bg-blue-800 text-white tracking-wider rounded text-sm outline-none"
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};
export default Hero;
