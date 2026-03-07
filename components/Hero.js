"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, MapPin, Calendar, ChevronDown } from 'lucide-react';

function useCountdown(targetDate) {
    const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    useEffect(() => {
        const tick = () => {
            const diff = new Date(targetDate) - new Date();
            if (diff <= 0) return;
            setTime({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [targetDate]);
    return time;
}

export default function Hero() {
    const countdown = useCountdown('2026-08-12T09:00:00');
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950">
            {/* Parallax Background Image */}
            <div
                className="absolute inset-0"
                style={{ transform: `translateY(${scrollY * 0.3}px)` }}
            >
                <Image
                    src="/images/past-edition/ed-020.jpg"
                    alt="Achievers Summit past edition"
                    fill
                    priority
                    quality={75}
                    sizes="100vw"
                    className="object-cover opacity-35 animate-ken-burns"
                    style={{ height: '120%' }}
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/50 to-neutral-950" />

            {/* Subtle grain overlay for premium feel */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '128px 128px' }} />

            {/* Content */}
            <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-16 py-32 lg:py-40 w-full">
                <div className="max-w-3xl">
                    {/* Event tag */}
                    <div className="flex flex-wrap items-center gap-3 mb-8 animate-fade-in">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/80 bg-white/[0.08] backdrop-blur-md border border-white/[0.08] rounded-sm">
                            <Calendar size={13} />
                            August 12 – 14, 2026
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/80 bg-white/[0.08] backdrop-blur-md border border-white/[0.08] rounded-sm">
                            <MapPin size={13} />
                            Lagos, Nigeria
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl lg:text-[4.5rem] font-bold text-white leading-[1.05] tracking-[-0.03em] mb-6 animate-fade-in delay-100">
                        Africa 2019s Premier
                        <br />
                        Leadership &amp;
                        <br />
                        <span className="text-brand-light">Innovation Summit</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg lg:text-xl text-white/50 max-w-xl mb-10 leading-relaxed animate-fade-in delay-200">
                        A 3-day high-level experience uniting innovators, policymakers, and changemakers redefining the African narrative.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-4 mb-16 animate-fade-in delay-300">
                        <a href="#tickets" className="btn btn-lg bg-white text-neutral-900 hover:bg-neutral-100 border-white hover:border-neutral-100">
                            Get your ticket
                            <ArrowRight size={16} />
                        </a>
                        <a href="#about" className="btn btn-lg border border-white/15 text-white hover:bg-white/[0.06]">
                            Learn more
                        </a>
                    </div>

                    {/* Countdown */}
                    <div className="animate-fade-in delay-400">
                        <p className="text-[11px] font-medium text-white/30 uppercase tracking-[0.2em] mb-4">Event starts in</p>
                        <div className="flex gap-6">
                            {[
                                { value: countdown.days, label: 'Days' },
                                { value: countdown.hours, label: 'Hours' },
                                { value: countdown.minutes, label: 'Min' },
                                { value: countdown.seconds, label: 'Sec' },
                            ].map((item) => (
                                <div key={item.label} className="text-center">
                                    <div className="text-3xl lg:text-4xl font-bold text-white tabular-nums tracking-tight">
                                        {String(item.value).padStart(2, '0')}
                                    </div>
                                    <div className="text-[10px] text-white/30 font-medium mt-1 tracking-wider">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating past edition thumbnails — right side */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3 z-10 animate-fade-in delay-600">
                {['/images/past-edition/img_9354.jpg', '/images/past-edition/img_5335.jpeg', '/images/past-edition/img_1633.jpeg'].map((src, i) => (
                    <div key={i} className="w-16 h-16 rounded-sm overflow-hidden border border-white/10 opacity-60 hover:opacity-100 transition-opacity duration-500 relative" style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
                        <Image src={src} alt="Past edition" fill sizes="64px" className="object-cover" loading="lazy" />
                    </div>
                ))}
                <div className="text-[9px] text-white/20 font-medium tracking-wider text-center mt-1">PAST<br/>EDITIONS</div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                <ChevronDown size={22} className="text-white/20" />
            </div>
        </section>
    );
}
