// components/AboutUs.jsx
import { Users, Globe, Lightbulb, ShieldCheck } from 'lucide-react';

const AboutUs = () => {
    return (
        <section className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white py-20 px-6 transition-colors duration-300">
            <div className="max-w-6xl mx-auto space-y-16">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 mb-6">
                        About NewsPress
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        NewsPress is an AI-powered news platform committed to delivering fast, unbiased, and personalized news to readers around the world.
                    </p>
                </div>

                {/* Mission and Vision */}
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-8 shadow-md hover:shadow-blue-500/20 transition duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <Lightbulb className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
                            Our Mission
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            To revolutionize how people consume news by combining artificial intelligence with quality journalism. We aim to make news discovery faster, smarter, and more personal.
                        </p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-8 shadow-md hover:shadow-purple-500/20 transition duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <ShieldCheck className="w-6 h-6 text-green-500 dark:text-green-400" />
                            Our Vision
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            To become the most trusted news companion in the digital era by using cutting-edge AI to ensure accuracy, transparency, and reader empowerment.
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6">
                        <Globe className="w-10 h-10 mx-auto text-blue-600 dark:text-blue-400 mb-2" />
                        <h3 className="text-3xl font-bold">150+</h3>
                        <p className="text-gray-600 dark:text-gray-400">Global News Sources</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6">
                        <Users className="w-10 h-10 mx-auto text-pink-600 dark:text-pink-400 mb-2" />
                        <h3 className="text-3xl font-bold">500K+</h3>
                        <p className="text-gray-600 dark:text-gray-400">Monthly Readers</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6">
                        <Lightbulb className="w-10 h-10 mx-auto text-yellow-500 dark:text-yellow-300 mb-2" />
                        <h3 className="text-3xl font-bold">AI-Powered</h3>
                        <p className="text-gray-600 dark:text-gray-400">Personalized Curation</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6">
                        <ShieldCheck className="w-10 h-10 mx-auto text-green-600 dark:text-green-400 mb-2" />
                        <h3 className="text-3xl font-bold">Privacy First</h3>
                        <p className="text-gray-600 dark:text-gray-400">No Data Sold</p>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <h3 className="text-2xl font-bold mb-4 dark:text-white text-gray-800">Want to explore more?</h3>
                    <a
                        href="/"
                        className="inline-block bg-blue-600 dark:bg-white text-white dark:text-black font-semibold px-8 py-3 rounded-full shadow-md hover:scale-105 transition"
                    >
                        Go to Homepage →
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
