"use client";
import React, { useEffect, useRef } from 'react';
import { Bell, Mic2 } from 'lucide-react';

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

export default function Speakers() {
    const ref = useReveal();

    return (
        <section id="speakers" className="section bg-surface-alt">
            <div ref={ref} className="reveal max-w-[1200px] mx-auto px-6 lg:px-16">
                <p className="section-label">Speakers</p>

                <div className="max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}>
                        The lineup is coming
                    </h2>
                    <p className="text-text-secondary text-lg leading-relaxed mb-10">
                        We&apos;re curating an exceptional roster of founders, policymakers, and thought leaders. Speaker announcements begin soon.
                    </p>
                </div>

                {/* Placeholder grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="aspect-[3/4] rounded-sm bg-neutral-100 border border-neutral-200/60 flex flex-col items-center justify-center gap-3 transition-all duration-300"
                            style={{ transitionDelay: `${i * 80}ms` }}>
                            <div className="w-14 h-14 rounded-full bg-neutral-200/80 flex items-center justify-center">
                                <Mic2 size={20} className="text-neutral-400" />
                            </div>
                            <div className="text-center px-4">
                                <div className="h-3 w-20 bg-neutral-200 rounded-sm mx-auto mb-2" />
                                <div className="h-2 w-14 bg-neutral-200/70 rounded-sm mx-auto" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <Bell size={15} className="text-text-muted" />
                    <p className="text-sm text-text-secondary">
                        Want early access?{' '}
                        <a href="/community" className="text-brand font-medium hover:underline">
                            Join the community
                        </a>{' '}
                        to be notified first.
                    </p>
                </div>
            </div>
        </section>
    );
}
