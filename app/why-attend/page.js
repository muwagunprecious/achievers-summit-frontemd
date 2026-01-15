"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
    Zap, Target, Share2, Rocket, Globe, Award,
    MessageSquare, GraduationCap, Star, Users, ArrowRight
} from 'lucide-react';

export default function WhyAttendPage() {
    const benefits = [
        {
            title: "Access to Transformational Knowledge",
            desc: "Learn directly from accomplished leaders, industry experts, policymakers, and innovators shaping Africa’s future.",
            icon: <Zap />
        },
        {
            title: "Leadership and Personal Development",
            desc: "Gain mindset-shifting insights, practical tools, and strategies that sharpen your leadership potential.",
            icon: <Target />
        },
        {
            title: "High-Impact Networking Opportunities",
            desc: "Connect with a vibrant community of over 2,000 young leaders, mentors, entrepreneurs, and investors.",
            icon: <Users />
        },
        {
            title: "Entrepreneurship & Innovation Opportunities",
            desc: "Explore ideas, pitch solutions, meet investors, and learn how to build sustainable ventures or scale your business.",
            icon: <Rocket />
        },
        {
            title: "Exposure to Global Conversations",
            desc: "Engage in discussions on leadership, governance, technology, and policy shaping the continent at global levels.",
            icon: <Globe />
        },
        {
            title: "Access to the 100Under40 Young Achievers Award",
            desc: "Witness the recognition of outstanding young leaders across Africa and be inspired to elevate your impact.",
            icon: <Award />
        },
        {
            title: "Direct Engagement with Policymakers",
            desc: "Participate in sessions featuring government officials and corporate executives influencing national change.",
            icon: <MessageSquare />
        },
        {
            title: "Career & Capacity Development",
            desc: "Gain access to trainings, development tracks, and professional pathways introduced during the Summit.",
            icon: <GraduationCap />
        },
        {
            title: "Exclusive Opportunities for Premium Holders",
            desc: "Access VIP deal rooms, mentoring circles, high-level receptions, and special networking with global guests.",
            icon: <Star />
        },
        {
            title: "Be Part of a Transformational Movement",
            desc: "Join a new wave of African youth committed to shaping the future, driving development and positive change.",
            icon: <Share2 />
        }
    ];

    return (
        <main className="min-h-screen bg-bg-deep pt-40">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden border-b border-white/5">
                <div className="container relative z-10 text-center">
                    <div className="text-primary-copper font-black text-xs tracking-widest uppercase mb-6 uppercase tracking-[0.4em]">Value Proposition</div>
                    <h1 className="text-5xl md:text-8xl text-white mb-10 font-black italic uppercase tracking-tighter leading-tight">
                        Why You <br />
                        <span className="text-gradient NOT-italic font-black text-primary-copper">Should Attend.</span>
                    </h1>
                    <p className="text-xl text-text-secondary font-light max-w-4xl mx-auto leading-relaxed">
                        Whether you are a student, emerging leader, young professional, entrepreneur, policymaker, or change-maker, the Achievers Summit offers unmatched value.
                    </p>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-40 bg-midnight-black relative">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                        {benefits.map((benefit, i) => (
                            <div key={i} className="glass-panel p-10 md:p-16 rounded-[48px] border border-white/5 hover:border-primary-copper/30 transition-all duration-500 group relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-24 h-24 bg-primary-copper/5 rounded-br-[48px] -translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
                                <div className="flex flex-col md:flex-row gap-10 items-start relative z-10 text-center md:text-left items-center md:items-start">
                                    <div className="flex-shrink-0 w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-primary-copper border border-white/10 group-hover:scale-110 group-hover:bg-primary-copper group-hover:text-white transition-all duration-500 shadow-2xl">
                                        {React.cloneElement(benefit.icon, { size: 36 })}
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 justify-center md:justify-start">
                                            <span className="text-4xl font-black text-white/5 group-hover:text-primary-copper/20 transition-colors italic">0{i + 1}</span>
                                            <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter leading-tight">{benefit.title}</h3>
                                        </div>
                                        <p className="text-text-secondary text-lg font-light leading-relaxed">{benefit.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-40 text-center">
                        <div className="max-w-4xl mx-auto glass-panel p-16 rounded-[64px] border border-primary-copper/20 bg-primary-copper/[0.03] space-y-10">
                            <h2 className="text-4xl md:text-6xl text-white font-black italic uppercase tracking-tighter leading-tight">
                                Ready to join the <br />
                                <span className="text-gradient NOT-italic">New Wave?</span>
                            </h2>
                            <p className="text-xl text-text-secondary font-light max-w-2xl mx-auto">
                                Join over 2,000 visionary leaders committed to redefining the African narrative. Secure your spot today.
                            </p>
                            <a href="/tickets" className="btn btn-primary py-6 px-16 group">
                                <span className="tracking-[0.3em] font-black text-xs">RESERVE YOUR SEAT</span>
                                <ArrowRight size={20} className="ml-4 group-hover:translate-x-2 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(40px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .text-gradient {
                    background: linear-gradient(to right, #ffffff, var(--primary-copper));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
        </main>
    );
}
