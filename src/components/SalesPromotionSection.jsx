import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Zap,
  Star,
  Clock,
  Gift,
  TrendingUp,
  Shield,
  Crown,
  ArrowRight,
  CheckCircle,
  Timer,
  Percent,
  Award,
  Users,
  Sparkles
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SalesPromotionSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 12,
    minutes: 35,
    seconds: 42
  });

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const timerRef = useRef(null);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);
  const floatingRef = useRef([]);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: 80, opacity: 0 },
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

      // Timer animation
      gsap.fromTo(timerRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: timerRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Cards animation
      gsap.fromTo(cardsRef.current,
        { x: -60, opacity: 0, rotationY: -15 },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
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

      // CTA animation
      gsap.fromTo(ctaRef.current,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating elements animation
      floatingRef.current.forEach((el, index) => {
        if (el) {
          gsap.to(el, {
            y: -20,
            rotation: 360,
            duration: 3 + index,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.5
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24  relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div ref={el => floatingRef.current[0] = el} className="absolute top-20 left-20 text-yellow-400/30">
          <Sparkles className="w-8 h-8" />
        </div>
        <div ref={el => floatingRef.current[1] = el} className="absolute top-32 right-32 text-blue-400/30">
          <Star className="w-6 h-6" />
        </div>
        <div ref={el => floatingRef.current[2] = el} className="absolute bottom-40 left-32 text-purple-400/30">
          <Gift className="w-10 h-10" />
        </div>
        <div ref={el => floatingRef.current[3] = el} className="absolute bottom-20 right-20 text-pink-400/30">
          <Crown className="w-8 h-8" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-blue-500/30 to-blue-700/30 rounded-full border border-blue-400/50 backdrop-blur-sm">
            <Gift className="text-blue-500 w-5 h-5" />
            <span className="text-sm font-bold text-blue-500 uppercase tracking-wider">
              Limited Time Offer
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black bg-gradient-to-r text-blue-600 bg-clip-text mb-6 leading-tight">
            BLACK FRIDAY SALE
          </h2>

          <div className="md:flex items-center justify-center gap-4 mb-8 space-y-3">
            <div className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-6 py-2 rounded-full font-bold text-xl">
              75% OFF
            </div>
            <div className="text-2xl md:text-3xl font-bold">
              Premium Plans
            </div>
          </div>

          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            Don't miss out! Get premium access to NewsPress with advanced features at an unbeatable price.
            Join thousands of satisfied readers today.
          </p>
        </div>

        {/* Countdown Timer */}
        <div ref={timerRef} className="bg-white/10 backdrop-blur-lg rounded-3xl  border border-white/20 p-8 ">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 text-purple-600 mb-2">
              <Timer className="w-6 h-6" />
              <span className="font-bold text-lg">Offer Expires In:</span>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 md:gap-8">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-4 md:p-6 shadow-2xl border border-purple-400/50">
                  <div className="text-3xl md:text-4xl font-black">
                    {value.toString().padStart(2, '0')}
                  </div>
                </div>
                <div className="text-sm md:text-base mt-2 capitalize font-medium">
                  {unit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalesPromotionSection;