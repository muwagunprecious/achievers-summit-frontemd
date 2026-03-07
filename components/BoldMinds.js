"use client";
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function BoldMinds() {
    return (
        <section className="relative w-full overflow-hidden bg-white">
            {/* Background Image Container */}
            <div className="relative w-full h-[600px] md:h-[850px]">
                <img
                    src="/images/banner.jpeg"
                    alt="Auditorium"
                    className="w-full h-full object-cover"
                />

                {/* Floating White Card */}
                <div className="absolute top-10 right-4 w-[90%] glass-panel p-12 shadow-2xl rounded-xs animate-fade-in-up min-h-[400px] flex flex-col justify-center lg:right-[10%] lg:w-[450px]">
                    <div className="w-12 h-0.5 bg-primary-copper mb-8"></div>
                    <h2 className="text-4xl font-heading text-text-primary mb-6 font-medium uppercase italic">
                        Bold minds
                    </h2>
                    <p className="text-text-secondary text-xl leading-relaxed font-medium">
                        Join bold minds as we gather for a day of courage, clarity, and unstoppable inspiration.
                    </p>
                </div>

                {/* Blue Arrow Button */}
                <div className="absolute bottom-8 right-8 z-20">
                    <div className="w-14 h-14 bg-[#2A4BFF] rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform shadow-lg">
                        <ArrowUpRight size={24} />
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 1s ease-out forwards;
                }
            `}</style>
        </section>
    );
}
