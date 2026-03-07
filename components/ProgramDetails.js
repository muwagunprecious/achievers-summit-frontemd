"use client";
import React, { useEffect, useRef } from 'react';
import { Mic2, Users, GraduationCap, Handshake, ArrowRight } from 'lucide-react';

function useReveal() {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el); } },
            { threshold: 0.15 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return ref;
}

export default function ProgramDetails() {
    const ref = useReveal();

    const agenda = [
        { day: "Day 1", title: "Opening & Vision", items: ["Opening ceremony", "Keynote speeches", "Plenary sessions", "Exhibition Arena launch", "Networking sessions"] },
        { day: "Day 2", title: "Deep Dive", items: ["Masterclasses", "Deal Room sessions", "Panel discussions", "Youth Innovation showcase", "Consortium launch"] },
        { day: "Day 3", title: "Celebrate & Connect", items: ["Startup pitches", "Closing ceremony", "Networking mixer", "Private Dinner & Award Night"] },
    ];

    const components = [
        { icon: Mic2, title: "Keynote Sessions", desc: "Hear from global thinkers and industry CEOs" },
        { icon: Users, title: "Plenary Sessions", desc: "Panel discussions, debates, and open dialogue" },
        { icon: GraduationCap, title: "Masterclasses", desc: "Hands-on workshops with domain experts" },
        { icon: Handshake, title: "Deal Rooms", desc: "Where investors meet African innovators" },
    ];

    return (
        <section id="program" className="section bg-surface">
            <div ref={ref} className="reveal max-w-[1200px] mx-auto px-6 lg:px-16">
                <p className="section-label">Program</p>

                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                            Three days of insight, action, and connection
                        </h2>
                        <p className="text-text-secondary text-lg leading-relaxed">
                            From keynotes to deal rooms \u2014 every session is designed to create lasting impact.
                        </p>
                    </div>
                    <a href="/program" className="btn border-border text-text hover:bg-surface-raised shrink-0 self-start lg:self-auto">
                        Full program <ArrowRight size={15} />
                    </a>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-20">
                    {agenda.map((day, i) => (
                        <div key={day.day} className="card p-6 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                            <span className="badge bg-brand-50 text-brand border-brand-100 mb-4">{day.day}</span>
                            <h3 className="text-lg font-semibold text-text mb-4">{day.title}</h3>
                            <ul className="space-y-2">
                                {day.items.map((item) => (
                                    <li key={item} className="text-sm text-text-secondary flex items-start gap-2">
                                        <span className="w-1 h-1 rounded-full bg-brand mt-2 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {components.map((item, i) => (
                        <div key={item.title} className="flex flex-col gap-3 p-6 rounded-sm bg-surface-alt border border-border-light hover:shadow-md transition-all duration-300">
                            <div className="w-10 h-10 rounded-sm bg-brand-50 flex items-center justify-center text-brand">
                                <item.icon size={20} />
                            </div>
                            <h4 className="font-semibold text-text">{item.title}</h4>
                            <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
