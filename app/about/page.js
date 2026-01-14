"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Target, Users, Award, Shield } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-bg-deep pt-40">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden border-b border-white/5">
                <div className="container relative z-10 text-center">
                    <div className="text-primary-copper font-black text-xs tracking-widest uppercase mb-6">Our Mission</div>
                    <h1 className="text-5xl md:text-8xl text-white mb-10 italic">Elevating <span className="text-gradient font-black NOT-italic">Excellence.</span></h1>
                    <p className="text-xl text-text-secondary font-light max-w-4xl mx-auto leading-relaxed">
                        The Achievers Summit is Africa's premier convergence of leadership and entrepreneurship, dedicated to catalyzing the next era of continental growth through visionary thinking and institutional transformation.
                    </p>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary-copper/30 to-transparent"></div>
            </section>

            {/* Core Values */}
            <section className="py-40">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { icon: <Target />, name: 'Vision', desc: 'Setting the blueprint for African dominance in global markets.' },
                            { icon: <Users />, name: 'Leadership', desc: 'Nurturing the next generation of ethical and innovative leaders.' },
                            { icon: <Award />, name: 'Impact', desc: 'Creating measurable socio-economic transformation across borders.' },
                            { icon: <Shield />, name: 'Integrity', desc: 'Upholding the highest standards of institutional excellence.' },
                        ].map((stat, i) => (
                            <div key={i} className="glass-panel p-10 rounded-[32px] border border-white/5 hover:border-primary-copper/30 transition-all group">
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary-copper mb-8 group-hover:bg-primary-copper group-hover:text-white transition-all">
                                    {React.cloneElement(stat.icon, { size: 32 })}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{stat.name}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">{stat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-40 bg-midnight-black relative overflow-hidden">
                <div className="motif-bg opacity-5"></div>
                <div className="container relative z-10">
                    <div className="max-w-4xl mx-auto space-y-16">
                        <div>
                            <h2 className="text-4xl text-white font-black italic mb-8 italic uppercase tracking-tighter">About the <span className="text-primary-copper NOT-italic font-black">Summit</span></h2>
                            <div className="prose prose-invert max-w-none text-text-secondary font-light text-lg leading-relaxed space-y-6">
                                <p>
                                    Since its inception, the Achievers Summit has served as a beacon for Africa's most influential figures. It is more than just a conference; it is a movement that bridges the gap between ambition and achievement, providing the tools and networks necessary for high-level success.
                                </p>
                                <p>
                                    Our annual gathering brings together heads of state, CEOs of multinational corporations, and groundbreaking entrepreneurs to discuss, debate, and design the future. We focus on sectors critical to Africa's development, including technology, energy, agriculture, and finance.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-4xl text-white font-black italic mb-8 italic uppercase tracking-tighter">Our <span className="text-primary-copper NOT-italic font-black">Commitment</span></h2>
                            <div className="prose prose-invert max-w-none text-text-secondary font-light text-lg leading-relaxed space-y-6">
                                <p>
                                    We are committed to delivering an experience that transcends traditional networking. Every panel, workshop, and keynote is curated to provide actionable insights. We believe in the power of the African narrative and work tirelessly to ensure it is told with authority, elegance, and precision.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
