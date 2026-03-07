"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import {
    Mic2, Users, GraduationCap, Store, Rocket,
    Handshake, GlassWater, ArrowRight
} from 'lucide-react';

export default function ProgramPage() {
    const components = [
        { title: "Keynote Sessions", icon: Mic2, desc: "Delivered by global thinkers, policymakers, CEOs, and development leaders on governance, innovation, entrepreneurship, energy, youth engagement, and Africa’s development future." },
        { title: "Plenary Sessions", icon: Users, desc: "Panel discussions covering leadership, governance & policy; youth employment & economic transformation; entrepreneurship & digital economy; health, technology & innovation; peacebuilding & security." },
        { title: "Masterclasses", icon: GraduationCap, desc: "Practical sessions led by industry experts on startup building & funding, public speaking, digital influence & brand growth, policy writing & advocacy, and creative economy skills." },
        { title: "Exhibition Arena", icon: Store, desc: "Featuring tech startups, science & robotic innovations, creative products, development partners and corporate showcases." },
        { title: "EAI Consortium Launch", icon: Rocket, desc: "The official launch of the EAI Collegiate, State, and National Consortium — a structured leadership pipeline that builds, trains, and supports future leaders." },
        { title: "Deal Rooms", icon: Handshake, desc: "Private engagement sessions between investors, corporations, youth innovators, and government agencies, providing mentorship and scalable investment opportunities." },
        { title: "Private Dinner & Awards", icon: GlassWater, desc: "A high-level dinner hosting speakers, special guests, investors, and premium ticket holders alongside the prestigious awards ceremony." },
    ];

    return (
        <main className="min-h-screen bg-surface">
            <Navbar variant="light" />

            <PageHero
                label="Event structure"
                heading={<>Summit<br />components.</>}
                subtitle="A carefully curated sequence of high-impact engagements designed to facilitate learning, interaction, and transformation."
                image="/images/past-edition/img_9097.jpg"
                imageAlt="Summit program session"
            />

            <section className="section bg-surface">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
                    <p className="section-label">Program highlights</p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-14 max-w-2xl">Seven pillars of the summit experience</h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {components.map((comp, i) => (
                            <div key={i} className={`card p-6 hover:shadow-md transition-shadow ${i === components.length - 1 && components.length % 2 !== 0 ? 'sm:col-span-2 sm:max-w-lg sm:mx-auto' : ''}`}>
                                <div className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand shrink-0">
                                        <comp.icon size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-text mb-2">{comp.title}</h4>
                                        <p className="text-sm text-text-secondary leading-relaxed">{comp.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-surface-alt">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-16 text-center">
                    <div className="rounded-2xl bg-brand-50 border border-brand-100 p-12 lg:p-16">
                        <h3 className="text-2xl md:text-3xl font-bold text-text mb-4">Ready to experience excellence?</h3>
                        <p className="text-text-secondary mb-8 max-w-lg mx-auto">Secure your access pass and join a curated experience designed for Africa’s next generation of leaders.</p>
                        <a href="/tickets" className="btn bg-brand text-white hover:bg-brand-dark border-brand hover:border-brand-dark">
                            Secure your access <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
