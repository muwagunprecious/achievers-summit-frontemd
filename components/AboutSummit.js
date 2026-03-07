"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

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

export default function AboutSummit() {
    const sectionRef = useReveal();

    return (
        <section id="about" className="section bg-surface">
            <div ref={sectionRef} className="reveal max-w-[1200px] mx-auto px-6 lg:px-16">
                <p className="section-label">About the summit</p>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    <div>
                        <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.12] tracking-tight text-text mb-6">
                            Uniting Africa  boldest minds to shape what next
                        </h2>
                        <p className="text-text-secondary text-lg leading-relaxed mb-6">
                            The Achievers Summit is an International Youth Day conference convened by Emmanuel Agida International (EAI). Over three days, it brings together policymakers, entrepreneurs, and global leaders for actionable dialogue on Africa  future.
                        </p>
                        <p className="text-text-secondary leading-relaxed mb-8">
                            Through keynotes, workshops, and curated networking, attendees gain the insights and connections to drive real impact 2014 in business, governance, and community development.
                        </p>
                        <a href="/about" className="btn border-brand text-brand hover:bg-brand hover:text-white">
                            More about the summit
                            <ArrowRight size={15} />
                        </a>
                    </div>

                    <div className="relative">
                        <div className="img-reveal aspect-[4/3] relative">
                            <Image
                                alt="Achievers Summit past edition"
                                className="object-cover object-top"
                                src="/images/past-edition/img_9354.jpg"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                loading="lazy"
                            />
                        </div>
                        {/* Floating stat card */}
                        <div className="absolute -bottom-6 -left-6 bg-white rounded-sm shadow-lg border border-border p-5 hidden lg:block animate-float">
                            <div className="text-3xl font-bold text-brand mb-1">5,000+</div>
                            <div className="text-sm text-text-secondary">Expected attendees<br />across 3 days</div>
                        </div>
                        {/* Small accent image */}
                        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-sm overflow-hidden border-2 border-white shadow-md hidden lg:block relative">
                            <Image src="/images/past-edition/img_1672.jpeg" alt="" fill sizes="80px" className="object-cover object-top" loading="lazy" />
                        </div>
                    </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-8 mt-20 pt-16 border-t border-border">
                    {[
                        { title: "Keynotes & Panels", desc: "Hear from world-class leaders and policymakers shaping the continent trajectory." },
                        { title: "Curated Networking", desc: "Connect with founders, investors, and change-makers through structured sessions." },
                        { title: "Actionable Workshops", desc: "Walk away with practical frameworks you can apply the very next day." },
                    ].map((item) => (
                        <div key={item.title}>
                            <h3 className="font-semibold text-text text-lg mb-2">{item.title}</h3>
                            <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
