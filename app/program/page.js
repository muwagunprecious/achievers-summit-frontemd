"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
    Mic2, Users, GraduationCap, Store, Rocket,
    Handshake, GlassWater, ArrowRight, Zap, Target
} from 'lucide-react';

export default function ProgramPage() {
    const components = [
        {
            title: "Keynote Sessions",
            icon: <Mic2 />,
            desc: "Delivered by global thinkers, policymakers, CEOs, and development leaders on governance, innovation, entrepreneurship, energy, youth engagement, and Africa’s development future."
        },
        {
            title: "Plenary Sessions",
            icon: <Users />,
            desc: "Panel discussions covering: Leadership, Governance & Policy; Youth Employment & Economic Transformation; Entrepreneurship & Digital Economy; Health, Technology & Innovation; Peacebuilding, Security & Responsible Ideologies."
        },
        {
            title: "Masterclasses",
            icon: <GraduationCap />,
            desc: "Practical sessions led by industry experts on: Startup Building & Funding; Public Speaking & Leadership Presence; Digital Influence & Brand Growth; Policy Writing & Advocacy; Creative Economy & Digital Skills."
        },
        {
            title: "Exhibition Arena",
            icon: <Store />,
            desc: "Featuring Tech startups, Science & Robotic innovations, Creative products, Development partners and corporate showcases."
        },
        {
            title: "Launch of the EAI Consortium",
            icon: <Rocket />,
            desc: "The official launch of the EAI Collegiate, State, and National Consortium—a structured leadership pipeline that builds, trains, and supports future leaders."
        },
        {
            title: "Deal Rooms",
            icon: <Handshake />,
            desc: "Private engagement sessions between Investors, Corporations, Youth innovators, and Government agencies, providing mentorship and scalable investment opportunities."
        },
        {
            title: "Private Dinner & Award Night",
            icon: <GlassWater />,
            desc: "A high-level dinner hosting speakers, special guests, investors, and premium ticket holders."
        }
    ];

    return (
        <main className="min-h-screen bg-bg-deep pt-40">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden border-b border-white/5">
                <div className="container relative z-10 text-center">
                    <div className="text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-6 uppercase">Event Structure</div>
                    <h1 className="text-5xl md:text-8xl text-white mb-10 font-black italic uppercase tracking-tighter leading-tight">
                        Summit <br />
                        <span className="text-gradient NOT-italic font-black text-primary-copper">Components.</span>
                    </h1>
                    <p className="text-xl text-text-secondary font-light max-w-4xl mx-auto leading-relaxed">
                        A carefully curated sequence of high-impact engagements designed to facilitate learning, interaction, and transformation.
                    </p>
                </div>
            </section>

            {/* Components Grid */}
            <section className="py-40 bg-midnight-black relative overflow-hidden">
                <div className="motif-bg opacity-5"></div>
                <div className="container relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {components.map((comp, i) => (
                            <div key={i} className={`glass-panel p-12 md:p-16 rounded-[56px] border border-white/5 hover:border-primary-copper/30 transition-all duration-700 group relative ${i === components.length - 1 && components.length % 2 !== 0 ? 'md:col-span-2 max-w-4xl mx-auto w-full' : ''}`}>
                                <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
                                    <div className="w-24 h-24 bg-white/5 rounded-[32px] flex items-center justify-center text-primary-copper border border-white/10 group-hover:bg-primary-copper group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-2xl">
                                        {React.cloneElement(comp.icon, { size: 36 })}
                                    </div>
                                    <div className="space-y-6 flex-1">
                                        <h3 className="text-2xl md:text-4xl font-black text-white uppercase italic tracking-tighter leading-tight border-b border-white/5 pb-6">{comp.title}</h3>
                                        <p className="text-text-secondary text-xl font-light leading-relaxed">{comp.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-40">
                <div className="container">
                    <div className="max-w-5xl mx-auto glass-panel p-20 rounded-[80px] border border-primary-copper/20 bg-primary-copper/[0.03] text-center space-y-12">
                        <div className="inline-flex items-center gap-3 text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase">
                            <Target size={14} />
                            Strategic Alignment
                        </div>
                        <h2 className="text-4xl md:text-7xl text-white font-black italic uppercase tracking-tighter leading-tight">
                            Ready to <span className="text-gradient NOT-italic">Experience Excellence?</span>
                        </h2>
                        <div className="pt-8">
                            <a href="/tickets" className="btn btn-primary py-6 px-16 group">
                                <span className="tracking-[0.3em] font-black text-xs">SECURE YOUR ACCESS PASS</span>
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
