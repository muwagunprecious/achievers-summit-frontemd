"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import {
    Target, Users, Award, Rocket,
    Lightbulb, Building2, Landmark, HeartHandshake, ArrowRight, GraduationCap, Briefcase,
    Zap, Share2, Globe, Star, ShieldCheck, Network, MessageSquare, Flag
} from 'lucide-react';

export default function AboutPage() {
    const benefits = [
        { title: "Transformational Knowledge", desc: "Learn directly from accomplished leaders, industry experts, and innovators shaping Africa's future.", icon: Zap },
        { title: "Leadership Development", desc: "Gain mindset-shifting insights and strategies that sharpen your leadership potential.", icon: Target },
        { title: "High-Impact Networking", desc: "Connect with over 2,000 young leaders, mentors, entrepreneurs, and investors.", icon: Users },
        { title: "Entrepreneurship & Innovation", desc: "Explore ideas, pitch solutions, meet investors, and learn to build sustainable ventures.", icon: Rocket },
        { title: "Global Conversations", desc: "Engage in discussions on governance, technology, and policy at global levels.", icon: Globe },
        { title: "100Under40 Awards", desc: "Witness the recognition of outstanding young leaders across Africa.", icon: Award },
        { title: "Policymaker Access", desc: "Participate in sessions with government officials and corporate executives.", icon: MessageSquare },
        { title: "Career Development", desc: "Access trainings, development tracks, and professional pathways.", icon: GraduationCap },
        { title: "Premium Exclusives", desc: "VIP deal rooms, mentoring circles, and high-level receptions.", icon: Star },
        { title: "Join the Movement", desc: "Be part of a new wave of African youth committed to positive change.", icon: Share2 },
    ];

    const objectives = [
        { category: "Leadership & Governance", icon: ShieldCheck, items: ["Strengthen leadership capacity for public service and governance.", "Promote ethical, value-driven leadership."] },
        { category: "Entrepreneurship & Innovation", icon: Lightbulb, items: ["Equip youth with entrepreneurial skills and mentorship.", "Showcase innovative African startups and ventures."] },
        { category: "Civic Engagement", icon: Flag, items: ["Inspire active participation in civic and policy processes.", "Encourage responsible citizenship and accountability."] },
        { category: "Professional Development", icon: Target, items: ["Build confidence and global perspective in emerging leaders.", "Provide exposure to top leaders for mentorship."] },
        { category: "Networking & Partnerships", icon: Network, items: ["Strengthen linkages between youth, government, and private sector.", "Create partnerships that accelerate economic opportunities."] },
    ];

    const audience = [
        { icon: Target, label: "Young leaders" },
        { icon: Lightbulb, label: "Entrepreneurs" },
        { icon: Landmark, label: "Policymakers" },
        { icon: GraduationCap, label: "Students & professionals" },
        { icon: Building2, label: "Corporate executives" },
        { icon: Briefcase, label: "Investors & donors" },
        { icon: HeartHandshake, label: "CSO leaders" },
        { icon: Rocket, label: "High-impact delegates" },
    ];

    return (
        <main className="min-h-screen bg-surface">
            <Navbar variant="light" />

            <PageHero
                label="About the summit"
                heading={<>Inspire. Equip.<br />Elevate.</>}
                subtitle="The Achievers Summit is an annual International Youth Day conference convened by Emmanuel Agida International (EAI), uniting innovators, policymakers, and changemakers across Africa."
                image="/images/past-edition/img_5335.jpeg"
                imageAlt="Achievers Summit conference"
            />

            <section className="section bg-surface">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text mb-6">A strategic platform for the next generation</h2>
                            <div className="space-y-4 text-text-secondary leading-relaxed">
                                <p>The Summit brings together young innovators, policymakers, professionals, industry experts, development partners, and influential leaders from across Nigeria, Africa, and the global community.</p>
                                <p>It provides a unique environment where emerging leaders gain access to transformative ideas, mentorship, opportunities, and real-world insights that shape their journey toward global relevance.</p>
                            </div>
                        </div>
                        <div className="card p-8 bg-brand-50 border-brand-100">
                            <p className="text-brand font-medium text-sm mb-4">2026 Theme</p>
                            <h3 className="text-xl font-bold text-text mb-3 leading-snug">&ldquo;The Global Emerging Leader: Redefining the African Narrative&rdquo;</h3>
                            <p className="text-text-secondary text-sm leading-relaxed">This edition commemorates the 23rd birthday of the Convener on August 12, aligning with International Youth Day &mdash; a global celebration dedicated to empowering young voices.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 lg:py-28 bg-neutral-950">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-16 grid md:grid-cols-2 gap-8">
                    <div className="rounded-2xl border border-white/10 p-10">
                        <div className="w-10 h-10 rounded-lg bg-brand flex items-center justify-center text-white mb-6"><Target size={20} /></div>
                        <h3 className="text-xl font-bold text-white mb-4">Vision</h3>
                        <p className="text-white/60 leading-relaxed">To build a generation of globally competent African leaders who inspire excellence, drive innovation, and redefine the continent&apos;s narrative through leadership, entrepreneurship, and civic responsibility.</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 p-10">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-brand-light mb-6"><Rocket size={20} /></div>
                        <h3 className="text-xl font-bold text-white mb-4">Mission</h3>
                        <p className="text-white/60 leading-relaxed">To provide a transformative platform that empowers young Africans with knowledge, mentorship, networks, and opportunities for leadership growth, entrepreneurial development, and global exposure.</p>
                    </div>
                </div>
            </section>

            <section className="section bg-surface">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
                    <p className="section-label">Why attend</p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4 max-w-2xl">Ten reasons to be there</h2>
                    <p className="text-text-secondary text-lg mb-14 max-w-2xl">Whether you&apos;re a student, professional, or policymaker &mdash; the summit delivers unmatched value.</p>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {benefits.map((b, i) => (
                            <div key={i} className="flex gap-4 p-5 rounded-xl hover:bg-surface-alt transition-colors">
                                <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand shrink-0"><b.icon size={20} /></div>
                                <div>
                                    <h4 className="font-semibold text-text mb-1">{b.title}</h4>
                                    <p className="text-sm text-text-secondary leading-relaxed">{b.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-surface-alt">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
                    <p className="section-label">Objectives</p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-14 max-w-2xl">What we aim to achieve</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {objectives.map((obj, i) => (
                            <div key={i} className="card p-6">
                                <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand mb-4"><obj.icon size={20} /></div>
                                <h4 className="font-semibold text-text mb-3">{obj.category}</h4>
                                <ul className="space-y-2">
                                    {obj.items.map((item, idx) => (
                                        <li key={idx} className="text-sm text-text-secondary leading-relaxed flex items-start gap-2">
                                            <span className="w-1 h-1 rounded-full bg-brand mt-2 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-surface">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
                    <p className="section-label">Who should attend</p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-14 max-w-2xl">Built for leaders at every stage</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {audience.map((item, i) => (
                            <div key={i} className="text-center p-6 rounded-xl hover:bg-surface-alt transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand mx-auto mb-4"><item.icon size={22} /></div>
                                <h4 className="font-medium text-text text-sm">{item.label}</h4>
                            </div>
                        ))}
                    </div>
                    <div className="mt-20 text-center rounded-2xl bg-brand-50 border border-brand-100 p-12 lg:p-16">
                        <h3 className="text-2xl md:text-3xl font-bold text-text mb-4">Be part of the African narrative</h3>
                        <p className="text-text-secondary mb-8 max-w-lg mx-auto">Join over 5,000 visionary leaders committed to shaping the future. Secure your spot today.</p>
                        <a href="/#tickets" className="btn bg-brand text-white hover:bg-brand-dark border-brand hover:border-brand-dark">Get your ticket<ArrowRight size={16} /></a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
