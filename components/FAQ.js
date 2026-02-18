"use client";
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Loader2 } from 'lucide-react';

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
            <div className="py-24 bg-bg-deep flex items-center justify-center">
                <Loader2 className="animate-spin text-primary-copper" size={48} />
            </div>
        );
    }

    return (
        <section id="faq" className="py-24 bg-bg-deep relative overflow-hidden">
            <div className="container relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="text-primary-copper font-black text-xs tracking-widest uppercase mb-4">Common Questions</div>
                    <h2 className="text-4xl md:text-5xl text-white mb-6 italic leading-tight uppercase font-black tracking-tighter">
                        Frequently <span className="text-gradient NOT-italic block">Asked.</span>
                    </h2>
                    <p className="text-text-secondary text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                        Curious about the summit? We've compiled the most important details for our 2026 attendees.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`relative overflow-hidden transition-all duration-700 rounded-[24px] border border-white/10 ${openIndex === index ? 'shadow-2xl shadow-primary-copper/20' : ''}`}
                            style={{
                                background: openIndex === index ? 'rgba(120, 58, 40, 0.15)' : 'rgba(0, 0, 0, 0.4)',
                                backdropFilter: 'blur(40px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(40px) saturate(180%)'
                            }}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between text-left group p-8 md:p-10 gap-6 bg-transparent border-none outline-none appearance-none"
                            >
                                <span className={`text-xl md:text-2xl font-black italic tracking-tighter uppercase transition-all duration-500 ${openIndex === index ? 'text-white' : 'text-white/90 group-hover:text-white'}`}>
                                    {faq.question}
                                </span>
                                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border ${openIndex === index ? 'rotate-180 bg-primary-copper border-primary-copper text-white shadow-lg shadow-primary-copper/40' : 'bg-white/5 border-white/10 text-white group-hover:bg-white/10'}`}>
                                    <ChevronDown size={24} />
                                </div>
                            </button>

                            <div
                                className={`transition-all duration-700 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="px-8 md:px-10 pb-12">
                                    <div className="text-text-secondary text-lg md:text-xl leading-relaxed whitespace-pre-line font-medium border-l border-white/20 pl-8">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <div className="inline-flex flex-col items-center">
                        <p className="text-text-muted text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                            <HelpCircle size={16} className="text-primary-copper" />
                            Still have more questions?
                        </p>
                        <a
                            href="mailto:info@achieverssummit.com.ng"
                            className="btn btn-primary !py-4 !px-12 !text-xs tracking-[0.4em] shadow-2xl shadow-primary-copper/30 transition-all font-black"
                        >
                            CONTACT SUPPORT
                        </a>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .text-gradient {
                    background: linear-gradient(135deg, #783A28 0%, #4A2419 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
            `}</style>
        </section>
    );
}
