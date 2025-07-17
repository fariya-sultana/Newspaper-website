// components/FinalCtaSection.jsx

const FinalCtaSection = () => {
  

  return (
    <section className="py-16 mb-24 max-w-4xl mx-auto text-white  px-6 text-center bg-gradient-to-r from-black-100 via-blue-300 to-purple-400 rounded-3xl">
      <div className=" text-blue-700">
        <h2 className="text-4xl font-extrabold mb-4 leading-tight">
          Ready to Experience Smarter News?
        </h2>
        <p className="text-lg md:text-xl  mb-8 text-blue-600">
          Discover trending topics, AI analysis, and personalized updates—all in one platform.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-full shadow-lg hover:scale-105 transition"
        >
          Get Started ↑
        </button>
      </div>
    </section>
  );
};

export default FinalCtaSection;
