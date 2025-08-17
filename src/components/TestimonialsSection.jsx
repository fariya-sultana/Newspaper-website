
import React, { useEffect, useRef} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Users,
    Star,
    Quote,
    BookOpen,
    Shield
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const testimonialsRef = useRef([]);
    const statsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(testimonialsRef.current,
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: testimonialsRef.current[0],
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(statsRef.current,
                { scale: 0.8, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: statsRef.current[0],
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Tech Journalist",
            company: "Digital Times",
            avatar: "SC",
            rating: 5,
            text: "NewsPress has revolutionized how I consume news. The AI-powered recommendations are incredibly accurate, and I never miss important stories in my field.",
            color: "from-blue-400 to-cyan-500"
        },
        {
            name: "Michael Rodriguez",
            role: "Marketing Director",
            company: "InnovateCorp",
            avatar: "MR",
            rating: 5,
            text: "The real-time alerts keep our team informed about industry trends instantly. It's become an essential tool for our competitive intelligence.",
            color: "from-purple-400 to-pink-500"
        },
        {
            name: "Emily Johnson",
            role: "Financial Analyst",
            company: "WealthTech",
            avatar: "EJ",
            rating: 5,
            text: "I love the offline reading feature. Perfect for my daily commute, and the content quality from verified publishers is outstanding.",
            color: "from-green-400 to-emerald-500"
        }
    ];

    const stats = [
        { number: "500K+", label: "Active Readers", icon: <Users className="w-6 h-6" /> },
        { number: "4.9/5", label: "User Rating", icon: <Star className="w-6 h-6" /> },
        { number: "1M+", label: "Articles Read", icon: <BookOpen className="w-6 h-6" /> },
        { number: "99.9%", label: "Uptime", icon: <Shield className="w-6 h-6" /> }
    ];

    return (
        <section ref={sectionRef} className="py-16 md:py-24  dark:from-gray-900 dark:to-blue-900/20 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-20">
                    <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full border border-green-400/30">
                        <Quote className="text-green-400 w-5 h-5" />
                        <span className="text-sm font-medium text-green-700 dark:text-green-300 uppercase tracking-wider">
                            Trusted by Thousands
                        </span>
                    </div>

                    <h2 className="text-4xl font-black bg-gradient-to-r from-green-400 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
                        What Our Readers Say
                    </h2>

                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Join thousands of professionals who trust NewsPress for their daily news consumption and industry insights.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            ref={el => testimonialsRef.current[index] = el}
                            className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105"
                        >
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                                "{testimonial.text}"
                            </blockquote>

                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role} at {testimonial.company}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            ref={el => statsRef.current[index] = el}
                            className="text-center group"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                {stat.icon}
                            </div>
                            <div className="text-3xl font-black text-gray-900 dark:text-white mb-2">{stat.number}</div>
                            <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;