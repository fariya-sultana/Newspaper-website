import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import {
    Users,
    UserCheck,
    Crown,
    FileText,
    Star,
    Building2,
    TrendingUp,
    Activity
} from 'lucide-react';
import axios from 'axios';
import Loading from './Loading';

const StatisticsSection = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        normalUsers: 0,
        premiumUsers: 0,
        totalArticles: 0,
        premiumArticles: 0,
        totalPublishers: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('https://newspaper-server-fawn.vercel.app/api/statistics');
                setStats(response.data);
            } catch (error) {
                console.error('Failed to fetch statistics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);


    const statisticsData = [
        {
            title: "Total Users",
            value: stats.totalUsers,
            icon: Users,
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-50 dark:bg-blue-900/20",
            iconColor: "text-blue-600 dark:text-blue-400",
            description: "Registered Members"
        },
        {
            title: "Normal Users",
            value: stats.normalUsers,
            icon: UserCheck,
            color: "from-green-500 to-emerald-500",
            bgColor: "bg-green-50 dark:bg-green-900/20",
            iconColor: "text-green-600 dark:text-green-400",
            description: "Standard Access"
        },
        {
            title: "Premium Users",
            value: stats.premiumUsers,
            icon: Crown,
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-purple-50 dark:bg-purple-900/20",
            iconColor: "text-purple-600 dark:text-purple-400",
            description: "Premium Members"
        },
        {
            title: "Total Articles",
            value: stats.totalArticles,
            icon: FileText,
            color: "from-orange-500 to-red-500",
            bgColor: "bg-orange-50 dark:bg-orange-900/20",
            iconColor: "text-orange-600 dark:text-orange-400",
            description: "Published Stories"
        },
        {
            title: "Premium Articles",
            value: stats.premiumArticles,
            icon: Star,
            color: "from-yellow-500 to-amber-500",
            bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
            iconColor: "text-yellow-600 dark:text-yellow-400",
            description: "Exclusive Content"
        },
        {
            title: "Publishers",
            value: stats.totalPublishers,
            icon: Building2,
            color: "from-indigo-500 to-blue-500",
            bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
            iconColor: "text-indigo-600 dark:text-indigo-400",
            description: "News Sources"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                duration: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    if (loading) <Loading></Loading>;

    return (
        <section className="py-10 md:py-16 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center justify-center mb-4">
                        <div className="flex items-center space-x-2">
                            <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                                Platform Statistics
                            </span>
                        </div>
                    </div>
                    <h2 className=" dark:from-white dark:to-gray-300 text-4xl font-black bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
                        NewsPress at a Glance
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Discover the vibrant community and rich content that makes NewsPress your trusted news destination
                    </p>
                </motion.div>

                {/* Statistics Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {statisticsData.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className={`${stat.bgColor} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 group hover:scale-105`}
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`p-3 rounded-xl ${stat.iconColor} bg-white dark:bg-gray-800 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                                            <CountUp
                                                end={stat.value}
                                                duration={2}
                                                separator=","
                                                delay={index * 0.2}
                                            />
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            {stat.description}
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                    {stat.title}
                                </h3>
                                <div className={`h-2 bg-gradient-to-r ${stat.color} rounded-full opacity-20 group-hover:opacity-100 transition-opacity duration-300`}></div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <div className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <Activity className="w-5 h-5" />
                        <span className="text-sm">
                            Statistics updated in real-time • Join our growing community
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default StatisticsSection;