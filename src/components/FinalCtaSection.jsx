// components/FinalCtaSection.jsx

const FinalCtaSection = () => {
  

  return (
    <section className="bg-gradient-to-r from-indigo-800 via-purple-800 to-blue-800 text-white py-20 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-4 leading-tight">
          Ready to Experience Smarter News?
        </h2>
        <p className="text-lg md:text-xl text-gray-200 mb-8">
          Discover trending topics, AI analysis, and personalized updates—all in one platform.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-white text-black font-semibold px-4 py-2 rounded-full shadow-lg hover:scale-105 transition"
        >
          Get Started ↑
        </button>
      </div>
    </section>
  );
};

export default FinalCtaSection;
