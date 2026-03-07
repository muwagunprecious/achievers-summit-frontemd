"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Plus, Minus, Loader2 } from 'lucide-react';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const sectionRef = useRef(null);

    /* Reveal observer — uses callback ref pattern so it fires
       even when the element mounts *after* initial render (loading → content). */
    const revealRef = useCallback((node) => {
        if (!node) return;
        sectionRef.current = node;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    node.classList.add('visible');
                    obs.unobserve(node);
                }
            },
            { threshold: 0.1 }
        );
        obs.observe(node);
    }, []);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await fetch('/api/faq');
                if (response.ok) {
                    const data = await response.json();
                    setFaqs(data);
                }
            } catch (error) {
                console.error('Error fetching FAQs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFaqs();
    }, []);

    if (loading) {
        return (
            <section className="section bg-surface flex items-center justify-center min-h-[300px]">
                <Loader2 className="animate-spin text-brand" size={24} />
            </section>
        );
    }

    return (
        <section id="faq" ref={revealRef} className="reveal section bg-surface">
            <div className="max-w-[800px] mx-auto px-6 lg:px-16">
                <p className="section-label">FAQ</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}>
                    Common questions
                </h2>
                <p className="text-text-secondary text-lg mb-12">
                    Everything you need to know about the summit.
                </p>

                {/* Accordion */}
                <div className="divide-y divide-border">
                    {faqs.map((faq, index) => (
                        <div key={index} className="transition-all duration-300"
                            style={{ transitionDelay: `${index * 60}ms` }}>
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full py-5 text-left flex justify-between items-center gap-4 group cursor-pointer"
                            >
                                <span className="text-sm font-medium text-text group-hover:text-brand transition-colors">
                                    {faq.question}
                                </span>
                                <span className="shrink-0 text-text-muted transition-transform duration-300"
                                    style={{ transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                    {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-500 ease-out ${
                                    openIndex === index ? 'max-h-[600px] opacity-100 pb-5' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact */}
                <div className="mt-12 pt-8 border-t border-border text-center">
                    <p className="text-sm text-text-secondary mb-4">
                        Still have questions?
                    </p>
                    <a
                        href="mailto:info@achieverssummit.com.ng"
                        className="btn border-border text-text hover:bg-brand hover:text-white hover:border-brand"
                    >
                        Contact support
                    </a>
                </div>
            </div>
        </section>
    );
}
