import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Zap,
  Shield,
  Search,
  Bell,
  Download,
  Filter,
  BookOpen,
  Smartphone,
  Globe,
  TrendingUp,
  Users,
  Star,
  Eye,
  Heart,
  Share2,
  Bookmark,
  Clock
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeaturesShowcaseSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const featuresRef = useRef([]);
  const mockupRef = useRef(null);
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

      gsap.fromTo(featuresRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: featuresRef.current[0],
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(mockupRef.current,
        { x: 100, opacity: 0, scale: 0.8 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mockupRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(statsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
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

      gsap.to(mockupRef.current, {
        y: -20,
        duration: 3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Get instant access to breaking news and articles with our optimized content delivery system.",
      color: "from-yellow-400 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Smart Search",
      description: "Find exactly what you're looking for with AI-powered search and intelligent recommendations.",
      color: "from-blue-400 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Real-time Alerts",
      description: "Stay updated with personalized notifications for breaking news and topics you care about.",
      color: "from-purple-400 to-pink-500",
      bgColor: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Offline Reading",
      description: "Download articles for offline reading, perfect for commutes or areas with poor connectivity.",
      color: "from-indigo-400 to-purple-500",
      bgColor: "from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20"
    },

  ];

  return (
    <section ref={sectionRef} className="py-10 md:py-24 text-white relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30">
            <Zap className="text-blue-400 w-5 h-5" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wider">
              Powerful Features
            </span>
          </div>

          <h2 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
            Experience the Future of Reading
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover cutting-edge features designed to enhance your reading experience and keep you informed like never before.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Features List */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={el => featuresRef.current[index] = el}
                className={`group p-4 rounded-2xl cursor-pointer transition-all duration-500 ${activeFeature === index
                    ? `bg-gradient-to-r ${feature.bgColor} border-2 border-gray-300/30 dark:border-white/20 shadow-xl`
                    : 'bg-gray-100 border border-gray-200 hover:border-gray-300 dark:bg-gray-800/50 dark:border-gray-700/50'
                  }`}
                onClick={() => setActiveFeature(index)}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-500 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>


          {/* Mockup */}
          <div ref={mockupRef} className="relative">
            <div className="relative mx-auto w-80 h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] border-8 border-gray-700 shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-[2rem] p-6 overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">9:41 AM</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-2 bg-gray-400 rounded-sm"></div>
                    <div className="w-6 h-3 bg-green-500 rounded-sm"></div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">News Feed</h3>
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500">Search articles...</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-white rounded-2xl p-4 shadow-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                        <span className="text-xs text-gray-500">TechNews</span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-800 mb-2">
                        Breaking: AI Revolution in News
                      </h4>
                      <p className="text-xs text-gray-600">
                        Discover how artificial intelligence is transforming journalism and content delivery.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcaseSection;
