"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
    Target, Users, Award, Shield, Rocket, Sparkles,
    Lightbulb, Building2, Landmark, HeartHandshake, ArrowRight, GraduationCap, Briefcase,
    Zap, Share2, Globe, Star, ShieldCheck, Network, MessageSquare, Flag
} from 'lucide-react';

export default function AboutPage() {
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

    const objectives = [
        {
            category: "Leadership & Governance",
            icon: <ShieldCheck />,
            items: [
                "Strengthen leadership capacity among young Africans to prepare them for roles in public service, governance, diplomacy, and civil society.",
                "Promote responsible, ethical, and value-driven leadership to build trust and institutional stability."
            ]
        },
        {
            category: "Entrepreneurship & Innovation",
            icon: <Lightbulb />,
            items: [
                "Equip youth with entrepreneurial skills, access to resources, and mentorship networks.",
                "Showcase innovative African projects, startups, and youth-led ventures."
            ]
        },
        {
            category: "Civic Engagement & Advocacy",
            icon: <Flag />,
            items: [
                "Inspire young people to participate actively in civic processes and policy development.",
                "Encourage responsible citizenship, patriotism, and socio-political accountability."
            ]
        },
        {
            category: "Personal & Professional Development",
            icon: <Target />,
            items: [
                "Build confidence, global perspective, and resilience in emerging leaders.",
                "Provide exposure to top leaders across sectors, enabling mentorship and direct learning pathways."
            ]
        },
        {
            category: "Networking & Partnerships",
            icon: <Network />,
            items: [
                "Strengthen linkages between youth, government, private sector, donors, and development institutions.",
                "Create multi-sectoral partnerships that accelerate youth development and economic opportunities."
            ]
        }
    ];


    return (
        <main className="min-h-screen bg-bg-deep pt-40">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden border-b border-white/5">
                <div className="container relative z-10 text-center">
                    <div className="text-primary-copper font-black text-xs tracking-widest uppercase mb-6">About the Summit</div>
                    <h1 className="text-5xl md:text-8xl text-white mb-10 font-black italic uppercase tracking-tighter leading-tight">
                        Inspire. Equip. <br />
                        <span className="text-gradient NOT-italic font-black">Elevate.</span>
                    </h1>
                    <div className="space-y-8 text-xl text-text-secondary font-light max-w-4xl mx-auto leading-relaxed mb-16">
                        <p>
                            The Achievers Summit is an annual International Youth Day Leadership and Entrepreneurship Conference designed to inspire, equip, and elevate the next generation of African leaders. Convened by <span className="text-white font-bold">Emmanuel Agida International (EAI)</span>, the Summit brings together young innovators, policymakers, professionals, industry experts, development partners, and influential leaders from across Nigeria, Africa, and the global community.
                        </p>
                        <p>
                            The Summit serves as a strategic platform for young people to explore the future of leadership, governance, entrepreneurship, and innovation within Africa’s rapidly evolving socio-economic landscape. It provides a unique environment where emerging leaders gain access to transformative ideas, mentorship, opportunities, and real-world insights that shape their journey toward global relevance.
                        </p>
                    </div>

                    {/* Context & Theme Teaser - Centered */}
                    <div className="max-w-3xl mx-auto">
                        <div className="glass-panel p-10 md:p-12 rounded-[48px] border border-white/10 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden text-center">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-copper/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

                            <div className="relative z-10">
                                <p className="text-white text-xl md:text-2xl font-light leading-relaxed mb-10 italic">
                                    “This edition holds special significance as it commemorates the <span className="text-primary-copper font-bold NOT-italic">23rd birthday of the Convener on the 12th of August</span>, aligning with International Youth Day, a global celebration dedicated to empowering the voices and possibilities of young people.”
                                </p>

                                <div className="pt-8 border-t border-white/10">
                                    <div className="inline-block px-4 py-1.5 rounded-full border border-primary-copper/30 bg-primary-copper/5 mb-4">
                                        <span className="text-[10px] font-black text-primary-copper uppercase tracking-widest">Official 2026 Theme</span>
                                    </div>
                                    <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-tight mt-2">
                                        "The Global Emerging Leader: <br />
                                        <span className="text-gradient NOT-italic">Redefining the African Narrative"</span>
                                    </h3>
                                    <p className="mt-6 text-text-secondary text-sm font-light leading-relaxed max-w-2xl mx-auto italic">
                                        Reflecting a bold commitment to shaping a generation of African leaders who are confident, visionary, globally competitive, and ready to influence systems at scale.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary-copper/30 to-transparent"></div>
            </section>

            {/* Vision & Mission Sections */}
            <section className="py-40 bg-midnight-black relative overflow-hidden">
                <div className="motif-bg opacity-5"></div>
                <div className="container relative z-10">
                    <div className="max-w-5xl mx-auto space-y-24">
                        {/* Vision - Centered */}
                        <div className="glass-panel p-16 rounded-[56px] border border-white/5 relative group text-center">
                            <div className="flex flex-col items-center mb-10">
                                <div className="w-16 h-16 bg-primary-copper rounded-[24px] flex items-center justify-center text-white shadow-2xl shadow-primary-copper/30 mb-6">
                                    <Target size={32} />
                                </div>
                                <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Vision</h2>
                            </div>
                            <blockquote className="text-2xl md:text-3xl text-text-secondary font-light leading-relaxed italic max-w-4xl mx-auto">
                                "To build a generation of globally competent African leaders who inspire excellence, drive innovation, and redefine the continent’s narrative through leadership, entrepreneurship, and civic responsibility."
                            </blockquote>
                        </div>

                        {/* Mission - Centered */}
                        <div className="glass-panel p-16 rounded-[56px] border border-white/5 relative group text-center">
                            <div className="flex flex-col items-center mb-10">
                                <div className="w-16 h-16 bg-white/5 rounded-[24px] flex items-center justify-center text-primary-copper border border-white/10 mb-6">
                                    <Rocket size={32} />
                                </div>
                                <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Mission</h2>
                            </div>
                            <blockquote className="text-2xl md:text-3xl text-text-secondary font-light leading-relaxed italic max-w-4xl mx-auto">
                                "To provide a transformative platform that empowers young Africans with knowledge, mentorship, networks, and opportunities for leadership growth, entrepreneurial development, social impact, and global exposure."
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why You Should Attend - From Why Attend Page */}
            <section className="py-40 relative overflow-hidden bg-bg-deep">
                <div className="container relative z-10">
                    <div className="text-center mb-24">
                        <div className="inline-block text-primary-copper font-black text-xs tracking-[0.4em] uppercase mb-6 uppercase">Value Proposition</div>
                        <h2 className="text-4xl md:text-7xl text-white font-black italic uppercase tracking-tighter leading-tight">
                            Why You <br />
                            <span className="text-gradient NOT-italic font-black text-primary-copper">Should Attend.</span>
                        </h2>
                        <p className="text-xl text-text-secondary font-light max-w-4xl mx-auto leading-relaxed mt-8">
                            Whether you are a student, emerging leader, young professional, entrepreneur, policymaker, or change-maker, the Achievers Summit offers unmatched value.
                        </p>
                    </div>

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
                </div>
            </section>

            {/* Theme Rationale & Objectives - From Theme Page */}
            <section className="py-40 bg-midnight-black relative overflow-hidden">
                <div className="motif-bg opacity-5"></div>
                <div className="container relative z-10">
                    <div className="max-w-4xl mx-auto space-y-12 mb-32">
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl md:text-4xl text-white font-black italic uppercase tracking-tighter">Theme <span className="text-primary-copper NOT-italic">Rationale</span></h2>
                            <div className="h-1 w-20 bg-primary-copper mx-auto"></div>
                        </div>
                        <div className="prose prose-invert max-w-none text-text-secondary text-lg font-light leading-relaxed space-y-6 text-center">
                            <p>
                                Africa is experiencing a historic demographic shift, with over 60% of its population under the age of 25. This generation of emerging leaders has the potential to reimagine Africa’s trajectory in governance, innovation, entrepreneurship, technology, education, and global diplomacy.
                            </p>
                            <p>
                                Despite enormous potential, young Africans still face systemic barriers including limited access to opportunities, low civic participation, constrained economic mobility, and insufficient platforms for leadership expression.
                            </p>
                            <p>
                                The theme reflects a central reality: today’s youth are no longer limited by geography. Technology, migration, global markets, and transnational collaboration have positioned African youth to participate meaningfully in global transformation.
                            </p>
                        </div>

                        <div className="glass-panel p-10 rounded-[40px] border border-white/10 bg-white/[0.02] space-y-8">
                            <h3 className="text-xl text-white font-black italic uppercase tracking-tighter leading-tight text-center">The 2026 Summit seeks to explore how Africa’s new generation can:</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    "Transition from local impact to global influence",
                                    "Drive value-based leadership",
                                    "Lead governance reforms",
                                    "Build enterprises that compete globally",
                                    "Innovate around African solutions",
                                    "Reclaim and redefine the continent’s global reputation"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 items-center group text-left">
                                        <div className="w-8 h-8 rounded-xl bg-primary-copper/10 border border-primary-copper/30 flex items-center justify-center text-primary-copper text-sm font-black transition-all group-hover:bg-primary-copper group-hover:text-white flex-shrink-0">
                                            {i + 1}
                                        </div>
                                        <span className="text-text-secondary text-base font-light group-hover:text-white transition-colors">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="text-center mb-16">
                        <div className="inline-block text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-4">Core Objectives</div>
                        <h2 className="text-4xl md:text-5xl text-white font-black italic uppercase tracking-tighter leading-tight">What We Aim to <span className="text-gradient NOT-italic">Achieve.</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        {objectives.map((obj, i) => (
                            <div key={i} className="glass-panel p-8 rounded-[32px] border border-white/5 hover:border-primary-copper/30 transition-all duration-500 group flex flex-col h-full">
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-primary-copper border border-white/10 group-hover:scale-110 transition-transform">
                                        {React.cloneElement(obj.icon, { size: 28 })}
                                    </div>
                                    <h3 className="text-xl font-black text-white uppercase italic tracking-tighter leading-tight flex-1">{obj.category}</h3>
                                </div>
                                <ul className="space-y-3 flex-1">
                                    {obj.items.map((item, idx) => (
                                        <li key={idx} className="flex gap-3 items-start">
                                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-copper flex-shrink-0" />
                                            <p className="text-text-secondary text-sm font-light leading-relaxed">{item}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who Should Attend */}
            <section className="pt-20 pb-40">
                <div className="container">
                    <div className="text-center mb-24">
                        <div className="inline-block text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-4">Target Audience</div>
                        <h2 className="text-4xl md:text-6xl text-white font-black italic uppercase tracking-tighter leading-tight">Who Should <span className="text-gradient NOT-italic">Attend?</span></h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <Target />, label: "Young leaders", desc: "Visionary changemakers" },
                            { icon: <Lightbulb />, label: "Entrepreneurs", desc: "Startup founders & innovators" },
                            { icon: <Landmark />, label: "Policymakers", desc: "Government officials & advisors" },
                            { icon: <GraduationCap />, label: "Emerging Professionals", desc: "Students & sector leaders" },
                            { icon: <Building2 />, label: "Corporate Executives", desc: "C-Suite & industry heads" },
                            { icon: <Briefcase />, label: "Investors", desc: "Venture capitalists & donors" },
                            { icon: <HeartHandshake />, label: "CSO Leaders", desc: "Civil society advocates" },
                            { icon: <Rocket />, label: "Delegates", desc: "High-impact individuals" }
                        ].map((item, i) => (
                            <div key={i} className="glass-panel p-10 rounded-[40px] border border-white/5 hover:border-primary-copper/30 hover:bg-primary-copper/[0.02] transition-all duration-700 group text-center flex flex-col items-center">
                                <div className="w-16 h-16 bg-white/5 rounded-[24px] flex items-center justify-center text-primary-copper mb-8 group-hover:scale-110 transition-transform duration-500 border border-white/5 shadow-inner">
                                    {React.cloneElement(item.icon, { size: 32 })}
                                </div>
                                <h4 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-3">{item.label}</h4>
                                <p className="text-text-muted text-[11px] uppercase font-black tracking-widest leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-28 p-16 glass-panel rounded-[56px] border border-primary-copper/20 bg-primary-copper/[0.03] text-center max-w-5xl mx-auto">
                        <h3 className="text-3xl md:text-5xl text-white font-black italic uppercase tracking-tighter mb-10">
                            Be Part of the <span className="text-gradient NOT-italic">African narrative.</span>
                        </h3>
                        <a href="/tickets" className="btn btn-primary py-6 px-16 group">
                            <span className="tracking-[0.3em] font-black text-xs">SECURE YOUR PASS</span>
                            <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
                        </a>
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(32px);
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
