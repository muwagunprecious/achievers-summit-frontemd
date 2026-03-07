"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSummit from '../components/AboutSummit';
import ProgramDetails from '../components/ProgramDetails';
import Speakers from '../components/Speakers';
import Tickets from '../components/Tickets';
import ExhibitionStand from '../components/ExhibitionStand';
import FAQ from '../components/FAQ';
import FindTicket from '../components/FindTicket';
import Footer from '../components/Footer';
import { ArrowRight } from 'lucide-react';

const CheckoutModal = dynamic(() => import('../components/CheckoutModal'), { ssr: false });

/* Scroll-triggered reveal hook */
function useReveal() {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el); } },
            { threshold: 0.12 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return ref;
}

/* Past edition marquee images */
const MARQUEE_IMAGES = [
    '/images/past-edition/img_5335.jpeg',
    '/images/past-edition/img_1633.jpeg',
    '/images/past-edition/img_9097.jpg',
    '/images/past-edition/img_1612.jpeg',
    '/images/past-edition/img_5484.jpeg',
    '/images/past-edition/img_5179.jpeg',
    '/images/past-edition/img_9358.jpg',
    '/images/past-edition/img_4903.jpeg',
    '/images/past-edition/img_1545.jpeg',
    '/images/past-edition/img_9166.jpg',
];

function PastEditionMarquee() {
    return (
        <section className="py-4 bg-neutral-950 overflow-hidden">
            <div className="flex animate-marquee" style={{ width: 'max-content' }}>
                {[...MARQUEE_IMAGES, ...MARQUEE_IMAGES].map((src, i) => (
                    <div key={i} className="w-[180px] h-[120px] mx-1.5 rounded-sm overflow-hidden shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-500 relative">
                        <Image src={src} alt="" fill sizes="180px" className="object-cover object-top" loading="lazy" />
                    </div>
                ))}
            </div>
        </section>
    );
}

/* Parallax quote section */
function ParallaxSection() {
    const [scrollY, setScrollY] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                setScrollY(rect.top);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={ref} className="parallax-section relative h-[70vh] min-h-[500px] flex items-center justify-center">
            <div
                className="absolute inset-0 h-[130%]"
                style={{ transform: `translateY(${scrollY * 0.15}px)` }}
            >
                <Image
                    src="/images/past-edition/ed-022.jpeg"
                    alt="Achievers Summit past edition"
                    fill
                    sizes="100vw"
                    className="object-cover object-top"
                    loading="lazy"
                />
            </div>
            <div className="absolute inset-0 bg-neutral-950/70" />
            <div className="absolute inset-0 animate-shimmer" />

            <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
                <p className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.25em] mb-6">Past editions</p>
                <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight mb-6">
                    Where leaders are made, not born.
                </h2>
                <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-xl mx-auto">
                    Every year, the Achievers Summit brings together Africa most ambitious minds. The result? Partnerships formed, ventures launched, and lives transformed.
                </p>
                <a href="/about" className="btn btn-lg bg-white/10 backdrop-blur-md text-white border border-white/15 hover:bg-white/20">
                    Our story <ArrowRight size={15} />
                </a>
            </div>
        </section>
    );
}

/* Past edition photo grid */
function PastEditionGrid() {
    const ref = useReveal();
    const images = [
        { src: '/images/past-edition/img_9836.jpg', span: 'col-span-2 row-span-2' },
        { src: '/images/past-edition/img_5554.jpeg', span: '' },
        { src: '/images/past-edition/img_5468.jpeg', span: '' },
        { src: '/images/past-edition/img_5457.jpeg', span: '' },
        { src: '/images/past-edition/img_1449.jpeg', span: '' },
        { src: '/images/past-edition/img_9099.jpg', span: 'col-span-2' },
    ];

    return (
        <section className="section bg-surface">
            <div ref={ref} className="reveal max-w-[1200px] mx-auto px-6 lg:px-16">
                <p className="section-label">Past editions</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4 max-w-xl">Moments that defined a generation</h2>
                <p className="text-text-secondary text-lg mb-12 max-w-xl">A look back at the energy, brilliance, and impact of previous Achievers Summits.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                    {images.map((img, i) => (
                        <div key={i} className={`img-reveal aspect-[4/3] relative ${img.span}`}>
                            <Image src={img.src} alt="Past Achievers Summit" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover object-top" loading="lazy" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function Home() {
    const router = useRouter();
    const [selectedTicket, setSelectedTicket] = useState(null);
    const statsRef = useReveal();

    const handleBuy = (ticket) => setSelectedTicket(ticket);
    const handleComplete = (ticketData) => router.push(`/ticket-confirmation?id=${ticketData.ticketId}`);

    return (
        <main className="min-h-screen bg-surface" suppressHydrationWarning>
            <Navbar isHidden={!!selectedTicket} />

            <Hero />

            {/* Image marquee strip */}
            <PastEditionMarquee />

            <AboutSummit />

            {/* Impact stats */}
            <section className="py-20 lg:py-28 bg-neutral-950 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                <div ref={statsRef} className="reveal max-w-[1200px] mx-auto px-6 lg:px-16 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
                        {[
                            { value: '5,000+', label: 'Attendees' },
                            { value: '25,000+', label: 'Virtual audience' },
                            { value: '200+', label: "Int'l delegates" },
                            { value: '50+', label: 'Exhibitors' },
                            { value: '20+', label: 'Countries' },
                            { value: '20+', label: 'Speakers' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center lg:text-left">
                                <div className="text-3xl lg:text-4xl font-bold text-white mb-1 tracking-tight">{stat.value}</div>
                                <div className="text-sm text-white/35">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ProgramDetails />

            {/* Parallax break */}
            <ParallaxSection />

            <Speakers />

            <Tickets onBuy={handleBuy} />

            {/* Past edition gallery */}
            <PastEditionGrid />

            <ExhibitionStand />

            <FAQ />

            <FindTicket />

            <Footer />

            {selectedTicket && (
                <CheckoutModal
                    isOpen={true}
                    ticket={selectedTicket}
                    onClose={() => setSelectedTicket(null)}
                    onComplete={handleComplete}
                />
            )}
        </main>
    );
}
