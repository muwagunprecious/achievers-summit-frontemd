"use client";
import React from 'react';
import {
    Mic2, Users, GraduationCap, Store, Rocket,
    Handshake, GlassWater, MapPin, Calendar, Ticket,
    CalendarPlus, Sparkles
} from 'lucide-react';

export default function ProgramDetails() {
    const agenda = [
        {
            day: "Day 1",
            items: "Keynote speeches, Plenary sessions, Exhibition Arena launch, Networking sessions, Opening ceremony"
        },
        {
            day: "Day 2",
            items: "Masterclasses, Deal Room sessions, Panel discussions, Youth Innovation showcase, Consortium launch"
        },
        {
            day: "Day 3",
            items: "Private Dinner & Award Night, Startup pitches, Closing ceremony, Networking mixer"
        }
    ];

    const topics = [
        "Leadership & Governance",
        "Entrepreneurship",
        "Digital Economy",
        "Youth Employment",
        "Innovation & Tech",
        "Peacebuilding",
        "Public Speaking",
        "Creative Economy",
        "Policy & Advocacy",
        "Health & Technology"
    ];

    return (
        <section className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8">
            {/* Dotted pattern background */}
            <div className="absolute inset-0 pattern-bg opacity-40 pointer-events-none"></div>

            {/* Header CTA */}
            <div className="max-w-4xl mx-auto text-center relative z-10 mb-16">
                <p className="text-sm font-medium text-text-muted mb-6 tracking-wide">
                    Unleashing Potential: Join Africa&apos;s Premier Gathering of Leaders, Innovators &amp; Changemakers
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
                    <a href="#tickets" className="btn btn-primary w-full sm:w-auto">
                        Buy tickets
                        <Ticket size={16} />
                    </a>
                    <a href="/program" className="btn btn-secondary w-full sm:w-auto">
                        View full program
                        <CalendarPlus size={16} />
                    </a>
                </div>
                <p className="text-xs text-text-muted">
                    Limited Early Bird discounts available. Reserve your spot now.
                </p>
            </div>

            {/* Bento Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Card 1: Main info + image (spans 2 cols) */}
                    <div className="col-span-1 lg:col-span-2 bg-white rounded-xl shadow-sm p-8 flex flex-col md:flex-row gap-8 items-center border border-gray-100">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-4xl font-bold tracking-tight text-text-primary leading-tight">
                                Shape the future<br />at Achievers Summit
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                Join Africa&apos;s most influential leaders, policymakers, and visionaries for a 3-day experience designed to inspire, equip, and transform.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xs bg-primary-copper/10 text-primary-copper text-sm font-medium">
                                    <MapPin size={16} />
                                    Lagos, Nigeria
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xs bg-primary-copper/10 text-primary-copper text-sm font-medium">
                                    <Calendar size={16} />
                                    August 2026
                                </span>
                            </div>
                        </div>
                        <div className="flex-1 w-full relative rounded-xl overflow-hidden aspect-[4/3] md:aspect-auto md:h-64 shadow-inner">
                            <img
                                alt="Achievers Summit venue"
                                className="absolute inset-0 w-full h-full object-cover"
                                src="/images/hero/summit-2.jpg"
                            />
                        </div>
                    </div>

                    {/* Card 2: Description */}
                    <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col justify-between border border-gray-100">
                        <h3 className="text-xl font-bold text-text-primary mb-4 leading-snug">
                            The Achievers Summit brings together the brightest minds across Africa and the world to explore leadership, innovation, and entrepreneurship.
                        </h3>
                        <p className="text-text-muted text-sm mt-8">
                            Convened by Emmanuel Agida International (EAI), the Summit is a movement for the next generation of changemakers.
                        </p>
                    </div>

                    {/* Card 3: Program Components (speakers-style) */}
                    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                        <h3 className="text-xl font-bold text-text-primary mb-6">Summit Components</h3>
                        <div className="space-y-5">
                            {[
                                { icon: <Mic2 size={18} />, title: "Keynote Sessions", sub: "Global thinkers & CEOs" },
                                { icon: <Users size={18} />, title: "Plenary Sessions", sub: "Panel discussions & debates" },
                                { icon: <GraduationCap size={18} />, title: "Masterclasses", sub: "Hands-on expert sessions" },
                                { icon: <Handshake size={18} />, title: "Deal Rooms", sub: "Investors meet innovators" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary-copper/10 flex items-center justify-center text-primary-copper shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-text-primary text-sm">{item.title}</h4>
                                        <p className="text-xs text-text-muted">{item.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Card 4: Agenda */}
                    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                        <h3 className="text-xl font-bold text-text-primary mb-6">Agenda</h3>
                        <div className="space-y-6">
                            {agenda.map((day, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="shrink-0">
                                        <span className="inline-flex items-center justify-center h-10 px-4 rounded-xl bg-primary-copper/10 text-primary-copper font-medium text-sm">
                                            {day.day}
                                        </span>
                                    </div>
                                    <p className="text-sm text-text-secondary leading-relaxed pt-1">
                                        {day.items}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Card 5: Workshops & Topics */}
                    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                        <h3 className="text-xl font-bold text-text-primary mb-4">Masterclasses &amp; Sessions</h3>
                        <p className="text-sm text-text-muted mb-8 leading-relaxed">
                            Participate in interactive workshops led by industry experts covering key areas shaping Africa&apos;s future.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {topics.map((topic, i) => (
                                <span key={i} className="px-3 py-1.5 bg-primary-copper/10 text-primary-copper rounded-xs text-xs font-medium">
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Card 6: Partners / Tagline */}
                    <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col justify-between border border-gray-100">
                        <div>
                            <p className="text-xs text-text-muted mb-2">Achievers Summit 2026</p>
                            <h3 className="text-2xl font-bold text-text-primary leading-tight">
                                Connect. Lead. Achieve. — The Movement for Africa&apos;s Next Generation
                            </h3>
                        </div>
                        <div className="mt-8">
                            <p className="text-xs text-text-muted mb-4">Convened by</p>
                            <div className="flex items-center gap-6 opacity-60 grayscale">
                                <span className="font-bold text-lg tracking-tight text-text-primary">EAI International</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 7: Venue */}
                    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 flex flex-col">
                        <h3 className="text-xl font-bold text-text-primary mb-6">Venue</h3>
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-primary-copper/10 flex items-center justify-center shrink-0">
                                <MapPin size={20} className="text-primary-copper" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-text-primary text-sm">Lagos, Nigeria</h4>
                                <p className="text-xs text-text-muted leading-relaxed mt-1">
                                    Venue details to be announced soon.<br />Lagos, Nigeria
                                </p>
                            </div>
                        </div>
                        <div className="mt-auto relative rounded-lg overflow-hidden h-32 bg-gray-200">
                            <img
                                alt="Lagos venue area"
                                className="w-full h-full object-cover opacity-70"
                                src="/images/hero/summit-4.jpg"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <MapPin size={36} className="text-primary-copper drop-shadow-md" />
                            </div>
                        </div>
                    </div>

                    {/* Card 8: Final CTA */}
                    <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col justify-center border border-gray-100">
                        <h3 className="text-3xl font-bold text-text-primary mb-4 leading-tight">
                            Join us this year<br />at Achievers Summit 2026
                        </h3>
                        <p className="text-sm text-text-muted mb-8">
                            Secure your spot today! Limited early bird tickets available.
                        </p>
                        <div className="space-y-3 mt-auto">
                            <a href="#tickets" className="btn btn-primary w-full">
                                Buy tickets
                                <Ticket size={16} />
                            </a>
                            <a href="/program" className="btn btn-secondary w-full">
                                View full program
                                <CalendarPlus size={16} />
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                .pattern-bg {
                    background-image: radial-gradient(#D1D5DB 1px, transparent 1px);
                    background-size: 20px 20px;
                }
            `}</style>
        </section>
    );
}
