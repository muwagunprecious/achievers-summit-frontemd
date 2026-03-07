"use client";
import React, { useState } from 'react';
import { Plus, Minus, Loader2 } from 'lucide-react';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
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
            <section className="py-20 bg-white flex items-center justify-center min-h-[300px]">
                <Loader2 className="animate-spin text-primary-copper" size={32} />
            </section>
        );
    }

    return (
        <section id="faq" className="py-20 bg-white border-t border-gray-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-text-primary uppercase">
                        Frequently <span className="text-primary-copper">Asked.</span>
                    </h2>
                    <p className="mt-4 text-text-muted">
                        Curious about the summit? We&apos;ve compiled the most important details for our 2026 attendees.
                    </p>
                </div>

                {/* Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center group"
                            >
                                <span className="text-sm font-semibold text-text-primary uppercase pr-4">
                                    {faq.question}
                                </span>
                                <span className={`shrink-0 transition-colors ${openIndex === index ? 'text-primary-copper' : 'text-gray-400 group-hover:text-primary-copper'}`}>
                                    {openIndex === index ? (
                                        <Minus size={20} />
                                    ) : (
                                        <Plus size={20} />
                                    )}
                                </span>
                            </button>

                            {/* Answer panel */}
                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                    openIndex === index ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div className="px-6 pb-5 pt-1">
                                    <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-12 text-center">
                    <a
                        href="mailto:info@achieverssummit.com.ng"
                        className="inline-block px-8 py-3 bg-primary-copper/10 text-primary-copper border border-primary-copper/20 hover:bg-primary-copper hover:text-white text-sm font-semibold rounded transition-all"
                    >
                        Contact Support
                    </a>
                </div>

            </div>
        </section>
    );
}
