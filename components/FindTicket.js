"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Search, AlertCircle, Loader2 } from 'lucide-react';
import TicketResult from './TicketResult';

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

export default function FindTicket() {
    const [searchName, setSearchName] = useState('');
    const [foundTicket, setFoundTicket] = useState(null);
    const [error, setError] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const ref = useReveal();

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        setIsSearching(true);

        try {
            const response = await fetch(`/api/tickets/search?name=${encodeURIComponent(searchName)}`);
            const data = await response.json();

            if (response.ok) {
                setFoundTicket(data);
            } else {
                setError(data.error || "No ticket found for this name.");
            }
        } catch (err) {
            console.error("Search Error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSearching(false);
        }
    };

    if (foundTicket) {
        return <TicketResult ticketData={foundTicket} onBack={() => setFoundTicket(null)} />;
    }

    return (
        <section id="find-ticket" className="section bg-surface-alt">
            <div ref={ref} className="reveal max-w-[600px] mx-auto px-6 lg:px-16 text-center">
                <p className="section-label justify-center">Find your ticket</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                    Already registered?
                </h2>
                <p className="text-text-secondary text-lg mb-10">
                    Enter your full name to retrieve your ticket and download your delegate pass.
                </p>

                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-6">
                    <input
                        type="text"
                        placeholder="Full name"
                        className="flex-grow h-12 px-4 rounded-sm bg-white border border-border text-text placeholder:text-text-muted focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-all text-sm"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={isSearching}
                        className="btn bg-brand text-white hover:bg-brand-dark border-brand hover:border-brand-dark h-12 px-6 disabled:opacity-50"
                    >
                        {isSearching ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <>
                                <Search size={15} />
                                Search
                            </>
                        )}
                    </button>
                </form>

                {error && (
                    <div className="flex items-center justify-center gap-2 text-red-600 text-sm bg-red-50 border border-red-100 rounded-sm p-4 animate-fade-in">
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}
            </div>
        </section>
    );
}
