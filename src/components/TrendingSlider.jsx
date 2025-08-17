import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Link } from 'react-router';
import { FaEye, FaCalendarAlt } from 'react-icons/fa';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import axios from 'axios';
// import useAxios from '../hooks/useAxios';

const TrendingSlider = () => {
    const [trendingArticles, setTrendingArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentText, setCurrentText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    // const axios = useAxios();
    const typewriterTexts = [
        'Latest Breaking News',
        'Trending Stories',
        'Popular Articles',
        'Most Viewed Content'
    ];

    // Typewriter effect
    useEffect(() => {
        let timeout;
        const currentFullText = typewriterTexts[textIndex];

        if (currentText.length < currentFullText.length) {
            timeout = setTimeout(() => {
                setCurrentText(currentFullText.slice(0, currentText.length + 1));
            }, 100);
        } else {
            timeout = setTimeout(() => {
                setCurrentText('');
                setTextIndex((prevIndex) => (prevIndex + 1) % typewriterTexts.length);
            }, 2000);
        }

        return () => clearTimeout(timeout);
    }, [currentText, textIndex]);

    // Fetch trending articles
    useEffect(() => {
        const fetchTrendingArticles = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://newspaper-server-fawn.vercel.app/articles/trending`);
                setTrendingArticles(response.data);
            } catch (error) {
                console.error('Error fetching trending articles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingArticles();
    }, []);

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Truncate text
    const truncateText = (text, maxLength = 200) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    };

    if (loading) {
        return (
            <div className="relative h-screen bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black">
                <div className="absolute inset-0 animate-pulse">
                    <div className="h-full bg-gray-700 dark:bg-gray-800"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>

                    {/* Loading header */}
                    <div className="absolute top-4 sm:top-6 md:top-8 left-1/2 transform -translate-x-1/2 text-center px-4 z-20">
                        <div className="h-8 sm:h-10 md:h-12 bg-gray-600 dark:bg-gray-700 rounded w-64 sm:w-80 mx-auto mb-2"></div>
                        <div className="h-4 sm:h-5 bg-gray-600 dark:bg-gray-700 rounded w-48 sm:w-64 mx-auto"></div>
                    </div>

                    {/* Loading content */}
                    <div className="absolute bottom-8 sm:bottom-16 md:bottom-20 left-4 sm:left-8 right-4 sm:right-8 max-w-4xl mx-auto">
                        <div className="h-6 sm:h-8 bg-gray-600 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                        <div className="h-4 sm:h-6 bg-gray-600 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
                        <div className="h-3 sm:h-4 bg-gray-600 dark:bg-gray-700 rounded w-full mb-2"></div>
                        <div className="h-3 sm:h-4 bg-gray-600 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <section className="relative overflow-hidden bg-gray-900 dark:bg-black h-[80vh]">
                {/* Header with Typewriter Effect - Fixed positioning */}
                <div className="absolute top-4 sm:top-6 md:top-8 left-1/2 transform -translate-x-1/2 z-20 text-center px-4 w-full">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold  bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600 bg-clip-text text-transparent  leading-tight mb-2">
                            🔥 <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600 bg-clip-text text-transparent">{currentText}</span>
                            <span className="animate-pulse bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600 bg-clip-text text-transparent">|</span>
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-200 dark:text-gray-300 max-w-2xl mx-auto">
                            Discover the most popular and trending articles
                        </p>
                    </div>
                </div>

                {/* Banner Slider */}
                {trendingArticles.length > 0 ? (
                    <Swiper
                        modules={[Autoplay, EffectFade]}
                        spaceBetween={0}
                        slidesPerView={1}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        effect="fade"
                        fadeEffect={{
                            crossFade: true
                        }}
                        loop={true}
                        className="banner-swiper h-full"
                    >
                        {trendingArticles.map((article, index) => (
                            <SwiperSlide key={article._id}>
                                <div className="relative h-full">
                                    {/* Background Image */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 dark:from-black/90 dark:via-black/70 dark:to-black/50"></div>
                                    </div>

                                    {/* Content Overlay - Fixed positioning to avoid header overlap */}
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                                            <div className="max-w-3xl mx-auto lg:mx-0">
                                                {/* Add top margin to push content below header */}
                                                <div className="mt-20 sm:mt-24 md:mt-28 lg:mt-32">
                                                    {/* Trending Badge */}
                                                    <div className="mb-4 sm:mb-4 md:mb-6">
                                                        <span className="bg-blue-300 hover:bg-blue-400 text-blue-900 px-2 py-1 rounded-full text-xs  font-semibold animate-pulse">
                                                            #{index + 1} Trending Now
                                                        </span>
                                                    </div>

                                                    {/* Article Meta */}
                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 mb-4 sm:mb-4 md:mb-6 text-gray-200 dark:text-gray-300">
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-blue-400 dark:text-blue-300 font-medium text-sm sm:text-base">
                                                                {article.publisher}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center space-x-4">
                                                            <div className="flex items-center space-x-2">
                                                                <FaCalendarAlt className="text-xs sm:text-sm" />
                                                                <span className="text-xs sm:text-sm">
                                                                    {formatDate(article.postedAt)}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <FaEye className="text-xs sm:text-sm" />
                                                                <span className="text-xs sm:text-sm font-medium">
                                                                    {article.views || 0} views
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Title */}
                                                    <h1 className="text-3xl lg:text-4xl  font-bold text-white dark:text-gray-100 mb-4 sm:mb-4 md:mb-6 leading-tight">
                                                        {article.title}
                                                    </h1>

                                                    {/* Description */}
                                                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed max-w-3xl">
                                                        {truncateText(article.description, window.innerWidth < 640 ? 120 : 200)}
                                                    </p>

                                                    {/* Read Button */}
                                                    <div className="mt-4 sm:mt-6 md:mt-8">
                                                        <Link
                                                            to={`/articles/${article._id}`}
                                                            className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4  py-2 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                                                        >
                                                            Read Full Story
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black">
                        <div className="text-center px-4 mt-20 sm:mt-24 md:mt-28">
                            <p className="text-gray-400 dark:text-gray-500 text-base sm:text-lg md:text-xl">
                                No trending articles available at the moment.
                            </p>
                        </div>
                    </div>
                )}

            </section>
        </>
    );
};

export default TrendingSlider;