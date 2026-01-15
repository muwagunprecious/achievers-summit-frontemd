"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
    Zap, Rocket, Users, Target, Globe, Award, Shield,
    TrendingUp, Briefcase, Lightbulb, HeartHandshake, ArrowRight
} from 'lucide-react';

export default function WhyAttendPage() {
    const benefits = [
        {
            icon: <Zap />,
            title: "Transformational Knowledge",
            desc: "Gain deep insights from global thought leaders who are successfully redefining leadership paradigms."
        },
        {
            icon: <Users />,
            title: "High-Impact Networking",
            desc: "Connect with a high-level network of CEOs, policymakers, and visionary youth from across Africa and beyond."
        },
        {
            icon: <TrendingUp />,
            title: "leadership & personal development",
            desc: "Immerse yourself in curated sessions designed to elevate your professional capacity and personal growth."
        },
        {
            icon: <Rocket />,
            title: "Entrepreneurship & Innovation",
            desc: "Access an ecosystem built to support startup founders and provide the tools for scalable innovation."
        },
        {
            icon: <Globe />,
            title: "Exposure to Global Conversations",
            desc: "Be at the center of discussions that are shaping Africa's positioning in the global economic landscape."
        },
        {
            icon: <Award />,
            title: "100Under40 Young Achievers Award",
            desc: "Witness the recognition of excellence and be inspired by the continent's most impactful young figures."
        },
        {
            icon: <Target />,
            title: "Engagement with Policymakers",
            desc: "Direct access to government officials and industry titans for advocacy and strategic partnerships."
        },
        {
            icon: <Lightbulb />,
            title: "Career & Capacity Development",
            desc: "Bridging the gap between ambition and high-level execution through specialized masterclasses."
        },
        {
            icon: <Shield />,
            title: "Exclusive Premium Opportunities",
            desc: "Unlock access to closed-door VIP sessions, deal rooms, and private networking dinners."
        },
        {
            icon: <HeartHandshake />,
            title: "Transformational Movement",
            desc: "Join a community dedicated to rewriting the African narrative and building institutional excellence."
        }
    ];

    return (
        <main className="min-h-screen bg-bg-deep pt-40">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden border-b border-white/5">
                <div className="container relative z-10 text-center">
                    <div className="inline-block text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-8">Elevate Your Strategy</div>
                    <h1 className="text-5xl md:text-8xl text-white mb-10 font-black italic uppercase tracking-tighter leading-tight">
                        Why You <span className="text-gradient NOT-italic">Should Attend.</span>
                    </h1>
                    <p className="text-xl text-text-secondary font-light max-w-3xl mx-auto leading-relaxed">
                        More than a conference — the Achievers Summit is a transformational movement designed for those ready to lead the future.
                    </p>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-40">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, i) => (
                            <div key={i} className="glass-panel p-10 rounded-[40px] border border-white/5 hover:border-primary-copper/30 transition-all duration-700 group flex flex-col items-start h-full">
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary-copper mb-8 group-hover:bg-primary-copper group-hover:text-white transition-all duration-500 shadow-xl group-hover:shadow-primary-copper/20">
                                    {React.cloneElement(benefit.icon, { size: 28 })}
                                </div>
                                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-4">{benefit.title}</h3>
                                <p className="text-text-secondary font-light leading-relaxed flex-grow">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-24 text-center glass-panel p-16 rounded-[48px] border border-primary-copper/20 bg-primary-copper/[0.02]">
                        <h2 className="text-3xl md:text-5xl text-white font-black italic uppercase tracking-tighter mb-12">
                            Ready to <span className="text-gradient NOT-italic">Step Up?</span>
                        </h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <a href="/tickets" className="btn btn-primary py-5 px-12 group transition-all">
                                <span className="tracking-[0.2em] font-black text-xs">REGISTER NOW</span>
                                <ArrowRight size={16} className="ml-2 inline group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a href="/#tickets" className="btn btn-outline py-5 px-12 border-white/10 hover:border-white">
                                <span className="tracking-[0.2em] font-black text-xs">VIEW CATEGORIES</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(24px);
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
