import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, FileText, Globe } from 'lucide-react';
import axios from 'axios';
import Loading from './Loading';

const PublishersSection = () => {
    const [publishers, setPublishers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPublishers();
    }, []);

    const fetchPublishers = async () => {
        try {
            const response = await axios.get('https://newspaper-server-fawn.vercel.app/api/publishers/with-stats');
            setPublishers(response.data);
        } catch (error) {
            console.error('Error fetching publishers:', error);
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.08
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4 }
        }
    };

    if (loading) return <Loading />;

    return (
        <section className="py-10 md:py-24 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-100/30 via-transparent to-purple-100/30 dark:from-blue-900/20 dark:to-purple-900/20 rotate-12 animate-pulse"></div>
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-100/30 via-transparent to-indigo-100/30 dark:from-pink-900/20 dark:to-indigo-900/20 -rotate-12 animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-7xl  mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full border border-blue-200/50 dark:border-blue-700/50">
                        <Globe className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                            Global Publishers
                        </span>
                    </div>
                    <h2 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600  dark:from-white dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent mb-6 leading-tight">
                        Media Partners
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Connecting you with premium content from leading publishers worldwide
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {publishers.map((publisher) => (
                        <motion.div
                            key={publisher._id}
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.03,
                                rotateY: 5,
                                rotateX: 2
                            }}
                            className="group cursor-pointer perspective-1000"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div className="container  relative h-full transform-gpu transition-all duration-500 group-hover:shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-750 dark:to-gray-800 rounded-3xl border border-gray-200/60 dark:border-gray-700/60 backdrop-blur-sm"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                                <div className="relative p-8 h-full flex flex-col">
                                    <div className="  flex items-center justify-center mb-6">
                                        <div className="relative">
                                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:rotate-3 group-hover:scale-110 transition-all duration-500">
                                                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                                                    {publisher.logo ? (
                                                        <img
                                                            src={publisher.logo}
                                                            alt={publisher.name}
                                                            className="w-10 h-10 object-contain"
                                                        />
                                                    ) : (
                                                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                                            {publisher.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-2 border-white dark:border-gray-800 shadow-lg">
                                                <div className="w-full h-full rounded-full bg-green-400 animate-ping opacity-75"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                        {publisher.name}
                                    </h3>

                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl border border-blue-200/50 dark:border-blue-700/50">
                                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                                <FileText className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">Articles</p>
                                                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                                                    {publisher.articleCount || 0}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl border border-purple-200/50 dark:border-purple-700/50">
                                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                                                <Eye className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">Total Views</p>
                                                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                                                    {(publisher.totalViews || 0).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default PublishersSection;
