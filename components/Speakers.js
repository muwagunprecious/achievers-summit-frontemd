"use client";
import React, { useState, useEffect } from 'react';

export default function Speakers() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <section id="speakers" className="section-sm bg-midnight-obsidian py-24">
                <div className="container text-center">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-4 w-32 bg-white/10 rounded mb-4"></div>
                        <div className="h-12 w-64 bg-white/10 rounded mb-8"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="speakers" className="bg-midnight-obsidian py-96 mt-10 border-y border-white/5">
            <div className="container relative flex flex-col items-center">
                <div className="max-w-4xl w-full glass-panel p-8 md:p-12 rounded-[32px] border border-white/5 bg-black/20 text-center animate-fade-in">
                    <div className="inline-block text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-2">The Faculty</div>
                    <h2 className="text-4xl md:text-5xl text-white font-black italic uppercase tracking-tighter mb-2">
                        Speakers to be announced soon
                    </h2>
                    <p className="text-text-muted text-sm font-medium uppercase tracking-[0.2em]">
                        Faculty selection in progress
                    </p>
                </div>
            </div>

            <style jsx>{`
                .bg-midnight-obsidian { background-color: var(--midnight-obsidian); }
                .text-primary-copper { color: var(--primary-copper); }
            `}</style>
        </section>
    );
}
