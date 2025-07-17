import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Check,
    X,
    Star,
    Zap,
    Shield,
    Crown,
    Sparkles,
    ArrowRight,
    Download,
    Bell,
    Eye,
    Users,
    Filter,
    BookOpen,
    TrendingUp,
    Globe
} from 'lucide-react';
import { useNavigate } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

const PricingPlansSection = () => {
    const [selectedPlan, setSelectedPlan] = useState('premium');
    const [isAnnual, setIsAnnual] = useState(false);
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);
    const headerRef = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo(headerRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Cards stagger animation
            gsap.fromTo(cardsRef.current,
                { y: 80, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: cardsRef.current[0],
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Floating animation for featured card
            gsap.to(cardsRef.current[1], {
                y: -10,
                duration: 2,
                ease: "power2.inOut",
                repeat: -1,
                yoyo: true,
                delay: 1
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handlePlanSelect = (planType) => {
        setSelectedPlan(planType);
        // Navigate to subscription page
        navigate('/subscription')
    };

    const plans = [
        {
            name: 'Free',
            price: 0,
            originalPrice: 0,
            icon: <BookOpen className="w-8 h-8" />,
            popular: false,
            description: 'Perfect for casual readers',
            features: [
                { name: 'Access to basic articles', included: true },
                { name: 'Limited daily reads (5 articles)', included: true },
                { name: 'Standard reading experience', included: true },
                { name: 'Premium content access', included: false },
                { name: 'Unlimited bookmarks', included: false },
                { name: 'Analytics dashboard', included: false }
            ],
            buttonText: 'Get Started',
            gradient: 'from-gray-400 to-gray-600',
            bgGradient: 'from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700'
        },
        {
            name: 'Premium',
            price: isAnnual ? 99 : 12,
            originalPrice: isAnnual ? 144 : 15,
            icon: <Crown className="w-8 h-8" />,
            popular: true,
            description: 'Everything you need to stay informed',
            features: [
                { name: 'Unlimited article access', included: true },
                { name: 'Premium exclusive content', included: true },
                { name: 'Ad-free reading experience', included: true },
                { name: 'Advanced search & filters', included: true },
                { name: 'Real-time notifications', included: true },
                { name: 'Unlimited bookmarks', included: true },

            ],
            buttonText: 'Upgrade to Premium',
            gradient: 'from-blue-500 to-purple-600',
            bgGradient: 'from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20'
        },
        {
            name: 'Enterprise',
            price: isAnnual ? 299 : 29,
            originalPrice: isAnnual ? 348 : 35,
            icon: <Shield className="w-8 h-8" />,
            popular: false,
            description: 'For teams and organizations',
            features: [
                { name: 'Everything in Premium', included: true },
                { name: 'Team collaboration tools', included: true },
                { name: 'Reading analytics', included: true },
                { name: 'Priority customer support', included: true },
                { name: 'Mobile app access', included: true },
                { name: 'Offline reading mode', included: true }
            ],
            buttonText: 'Contact Sales',
            gradient: 'from-purple-500 to-pink-600',
            bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
        }
    ];

    return (
        <section ref={sectionRef} className=" py-8 md:py-24 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-16">
                    <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full border border-blue-200/50 dark:border-blue-700/50">
                        <Sparkles className="text-blue-600 dark:text-blue-400 w-4 h-4" />
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                            Choose Your Plan
                        </span>
                    </div>

                    <h2 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 dark:from-white dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent mb-4 leading-tight">
                        Unlock Your Reading Potential
                    </h2>

                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
                        Choose the perfect plan to access premium content, advanced features, and unlimited reading
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <span className={`text-lg font-medium ${!isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                            Monthly
                        </span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className={`relative w-10 h-6 rounded-full transition-colors duration-300 ${isAnnual
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                                : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                        >
                            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${isAnnual ? 'translate-x-6' : 'translate-x-0'
                                }`} />
                        </button>
                        <span className={`text-lg font-medium ${isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                            Annual
                        </span>
                        {isAnnual && (
                            <span className="ml-2 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium rounded-full">
                                Save 30%
                            </span>
                        )}
                    </div>
                </div>

                {/* Plans Grid */}
                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={plan.name}
                            ref={el => cardsRef.current[index] = el}
                            className={`relative group ${plan.popular ? 'transform scale-105 z-10' : ''}`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-1 rounded-full text-sm font-bold shadow-lg">
                                        <Star className="w-2 h-2 inline mr-1" />
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            {/* Card */}
                            <div className={`relative h-full bg-gradient-to-br ${plan.bgGradient} rounded-3xl border-2 ${plan.popular
                                ? 'border-blue-200 dark:border-blue-700 shadow-2xl'
                                : 'border-gray-200/50 dark:border-gray-700/50 shadow-xl'
                                } backdrop-blur-sm transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105`}>

                                {/* Glow Effect */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${plan.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />

                                <div className="relative p-8 h-full flex flex-col">
                                    {/* Plan Header */}
                                    <div className="text-center mb-8">
                                        <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${plan.gradient} rounded-2xl text-white mb-2 group-hover:scale-110 transition-transform duration-300`}>
                                            {plan.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                            {plan.name}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                                            {plan.description}
                                        </p>

                                        {/* Price */}
                                        <div className="flex items-center justify-center gap-2 mb-1">
                                            <span className="text-3xl font-black text-gray-900 dark:text-white">
                                                ${plan.price}
                                            </span>
                                            <div className="text-left">
                                                <div className="text-gray-500 dark:text-gray-400 text-md">
                                                    /{isAnnual ? 'year' : 'month'}
                                                </div>
                                                {plan.originalPrice > plan.price && (
                                                    <div className="text-gray-400 dark:text-gray-500 text-sm line-through">
                                                        ${plan.originalPrice}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Features List */}
                                    <div className="flex-1 space-y-2 mb-6">
                                        {plan.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-center gap-2">
                                                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${feature.included
                                                    ? 'bg-green-100 dark:bg-green-900/30'
                                                    : 'bg-gray-100 dark:bg-gray-800'
                                                    }`}>
                                                    {feature.included ? (
                                                        <Check className="w-2 h-2 text-green-600 dark:text-green-400" />
                                                    ) : (
                                                        <X className="w-2 h-2 text-gray-400 dark:text-gray-500" />
                                                    )}
                                                </div>
                                                <span className={`text-sm ${feature.included
                                                    ? 'text-gray-700 dark:text-gray-300'
                                                    : 'text-gray-400 dark:text-gray-500'
                                                    }`}>
                                                    {feature.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handlePlanSelect(plan.name.toLowerCase())}
                                        className={`w-full py-2 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${plan.popular
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl'
                                            : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                                            }`}
                                    >
                                        {plan.buttonText}
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingPlansSection;