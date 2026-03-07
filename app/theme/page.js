"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import {
    ShieldCheck, Lightbulb, Flag, Target,
    Network, ArrowRight
} from 'lucide-react';

export default function ThemePage() {
    const objectives = [
        { category: "Leadership & Governance", icon: ShieldCheck, items: ["Strengthen leadership capacity among young Africans to prepare them for roles in public service, governance, diplomacy, and civil society.", "Promote responsible, ethical, and value-driven leadership to build trust and institutional stability."] },
        { category: "Entrepreneurship & Innovation", icon: Lightbulb, items: ["Equip youth with entrepreneurial skills, access to resources, and mentorship networks.", "Showcase innovative African projects, startups, and youth-led ventures."] },
        { category: "Civic Engagement & Advocacy", icon: Flag, items: ["Inspire young people to participate actively in civic processes and policy development.", "Encourage responsible citizenship, patriotism, and socio-political accountability."] },
        { category: "Personal & Professional Development", icon: Target, items: ["Build confidence, global perspective, and resilience in emerging leaders.", "Provide exposure to top leaders across sectors, enabling mentorship and direct learning pathways."] },
        { category: "Networking & Partnerships", icon: Network, items: ["Strengthen linkages between youth, government, private sector, donors, and development institutions.", "Create multi-sectoral partnerships that accelerate youth development and economic opportunities."] },
    ];

    const explores = [
        "Transition from local impact to global influence",
        "Drive value-based leadership",
        "Lead governance reforms",
        "Build enterprises that compete globally",
        "Innovate around African solutions",
        "Reclaim and redefine the continent2019s global reputation"
    ];

    return (
        <main className="min-h-screen bg-surface">
            <Navbar variant="light" />

            <PageHero
                label="2026 Official theme"
                heading={<>The Global Emerging Leader: Redefining the African Narrative</>}
                subtitle="This edition commemorates the 23rd birthday of the Convener on August 12, aligning with International Youth Day."
                image="/images/past-edition/img_9748.jpg"
                imageAlt="Summit theme"
            />

            {/* Rationale */}
            <section className="section bg-surface">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
                    <div className="max-w-3xl">
                        <p className="section-label">Theme rationale</p>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-8">Why this theme matters</h2>
                        <div className="space-y-5 text-text-secondary leading-relaxed">
                            <p>Africa is experiencing a historic demographic shift, with over 60% of its population under the age of 25. This generation of emerging leaders has the potential to reimagine Africa 2019s trajectory in governance, innovation, entrepreneurship, technology, education, and global diplomacy.</p>
                            <p>Despite enormous potential, young Africans still face systemic barriers including limited access to opportunities, low civic participation, constrained economic mobility, and insufficient platforms for leadership expression.</p>
                            <p>The theme reflects a central reality: today2019s youth are no longer limited by geography. Technology, migration, global markets, and transnational collaboration have positioned African youth to participate meaningfully in global transformation.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Explores */}
            <section className="section bg-surface-alt">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
                    <p className="section-label">Areas of focus</p>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text mb-10 max-w-2xl">The 2026 Summit seeks to explore how Africa 2019s new generation can:</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {explores.map((item, i) => (
                            <div key={i} className="flex gap-3 items-center p-4 rounded-xl bg-surface border border-border">
                                <span className="w-7 h-7 rounded-md bg-brand-50 flex items-center justify-center text-xs font-bold text-brand shrink-0">{i + 1}</span>
                                <span className="text-sm text-text">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Objectives */}
            <section className="section bg-surface">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
                    <p className="section-label">Core objectives</p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-14 max-w-2xl">What we aim to achieve</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {objectives.map((obj, i) => (
                            <div key={i} className="card p-6">
                                <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand mb-4">
                                    <obj.icon size={20} />
                                </div>
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

            <Footer />
        </main>
    );
}
