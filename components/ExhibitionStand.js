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

export default function ExhibitionStand() {
    const ref = useReveal();

    return (
        <section id="partner" className="section bg-surface">
            <div ref={ref} className="reveal max-w-[1200px] mx-auto px-6 lg:px-16">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="relative img-reveal aspect-[4/3]">
                        <Image
                            src="/images/past-edition/img_4623.jpeg"
                            alt="Exhibitors at past Achievers Summit"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                            loading="lazy"
                        />
                    </div>

                    <div>
                        <p className="section-label">Partner with us</p>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-6 leading-[1.12]">
                            Put your brand in front of 5,000+ African leaders
                        </h2>
                        <p className="text-text-secondary text-lg leading-relaxed mb-8">
                            Strategic partnerships position your organisation at the heart of continental innovation. Get exhibition space, speaking slots, and direct access to decision-makers.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6 mb-10">
                            {[
                                { title: "Exhibition arena", desc: "Showcase your products to thousands of engaged attendees." },
                                { title: "Brand visibility", desc: "Logo placement across all digital and physical materials." },
                                { title: "Elite access", desc: "Private introductions to policymakers and investors." },
                                { title: "Speaking slots", desc: "Present your vision on the main stage." },
                            ].map((item) => (
                                <div key={item.title}>
                                    <h4 className="font-semibold text-text text-sm mb-1">{item.title}</h4>
                                    <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <a href="/partnership" target="_blank" rel="noopener noreferrer" className="btn bg-brand text-white hover:bg-brand-dark border-brand hover:border-brand-dark">
                            Become a partner <ArrowRight size={15} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
