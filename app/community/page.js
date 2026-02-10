"use client";
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Users, UserPlus, MessageCircle, ArrowRight, ShieldCheck, Zap, Heart } from 'lucide-react';
import VolunteerForm from '../../components/VolunteerForm';
import AmbassadorForm from '../../components/AmbassadorForm';

export default function CommunityPage() {
    const [activeForm, setActiveForm] = useState(null); // 'volunteer' or 'ambassador'

    if (activeForm === 'volunteer') {
        return <VolunteerForm onBack={() => setActiveForm(null)} />;
    }

    if (activeForm === 'ambassador') {
        return <AmbassadorForm onBack={() => setActiveForm(null)} />;
    }

    return (
        <main className="min-h-screen bg-bg-deep pt-48">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-12 overflow-hidden border-b border-white/5">
                <div className="container relative z-10 text-center">
                    <div className="text-primary-copper font-black text-xs tracking-widest uppercase mb-6">Our Community</div>
                    <h1 className="text-5xl md:text-8xl text-white mb-10 font-black italic uppercase tracking-tighter leading-tight">
                        Grow with <br />
                        <span className="text-gradient NOT-italic font-black">Achievers.</span>
                    </h1>
                    <p className="text-sm text-text-secondary font-light max-w-lg mx-auto leading-relaxed mb-4">
                        Join a vibrant movement of young African leaders. Whether you want to serve as a volunteer or lead as an ambassador, there's a place for you in our community.
                    </p>
                </div>
            </section>

            {/* Options Section */}
            <section className="py-4 relative overflow-hidden bg-midnight-black">
                <div className="motif-bg opacity-5"></div>
                <div className="container relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {/* Volunteer Card */}
                        <div className="glass-panel p-3 rounded-lg border border-white/5 hover:border-primary-copper/30 transition-all duration-500 group flex flex-col h-full">
                            <div className="w-6 h-6 bg-primary-copper/10 rounded-md flex items-center justify-center text-primary-copper mb-2 border border-primary-copper/20 group-hover:scale-110 transition-transform">
                                <Heart size={14} />
                            </div>
                            <h3 className="text-sm font-black text-white italic uppercase tracking-tighter mb-1">Volunteer</h3>
                            <p className="text-text-secondary [font-size:8px] font-light mb-2 flex-grow leading-[1.1]">
                                Give back to the continent by serving in our various product and service units. Gain experience and make an impact.
                            </p>
                            <button
                                onClick={() => setActiveForm('volunteer')}
                                className="btn btn-primary w-full py-1.5 flex items-center justify-center gap-1.5"
                            >
                                <span className="font-black [font-size:8px] tracking-widest uppercase text-white">APPLY</span>
                                <ArrowRight size={10} />
                            </button>
                        </div>

                        {/* Ambassador Card */}
                        <div className="glass-panel p-3 rounded-lg border border-white/5 hover:border-white/20 transition-all duration-500 group flex flex-col h-full">
                            <div className="w-6 h-6 bg-white/10 rounded-md flex items-center justify-center text-white mb-2 border border-white/20 group-hover:scale-110 transition-transform">
                                <ShieldCheck size={14} />
                            </div>
                            <h3 className="text-sm font-black text-white italic uppercase tracking-tighter mb-1">Ambassador</h3>
                            <p className="text-text-secondary [font-size:8px] font-light mb-2 flex-grow leading-[1.1]">
                                Become a campus or professional representative. Lead the narrative and represent the Achievers Summit in your region.
                            </p>
                            <button
                                onClick={() => setActiveForm('ambassador')}
                                className="btn btn-primary w-full py-1.5 flex items-center justify-center gap-1.5 transition-all"
                            >
                                <span className="font-black [font-size:8px] tracking-widest uppercase text-white">BECOME</span>
                                <ArrowRight size={10} />
                            </button>
                        </div>

                        {/* WhatsApp Card */}
                        <div className="glass-panel p-3 rounded-lg border border-white/5 hover:border-green-500/30 transition-all duration-500 group flex flex-col h-full bg-green-500/[0.02]">
                            <div className="w-6 h-6 bg-green-500/10 rounded-md flex items-center justify-center text-green-500 mb-2 border border-green-500/20 group-hover:scale-110 transition-transform">
                                <MessageCircle size={14} />
                            </div>
                            <h3 className="text-sm font-black text-white italic uppercase tracking-tighter mb-1">WhatsApp Community</h3>
                            <p className="text-text-secondary [font-size:8px] font-light mb-2 flex-grow leading-[1.1]">
                                Join our official WhatsApp group to get real-time updates, network with other members, and never miss an announcement.
                            </p>
                            <a
                                href="https://chat.whatsapp.com/G3P2qD8V9j6H1Y2Z3L4M5N" // Replace with real link
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary bg-green-600 border-green-600 hover:bg-green-700 w-full py-1.5 flex items-center justify-center gap-1.5"
                            >
                                <span className="font-black [font-size:8px] tracking-widest uppercase text-white">JOIN</span>
                                <ArrowRight size={10} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(32px);
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
