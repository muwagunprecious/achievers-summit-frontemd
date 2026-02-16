"use client";
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function BoldMinds() {
    return (
        <section className="relative w-full overflow-hidden bg-midnight-black">
            {/* Background Image Container */}
            <div className="relative w-full h-[500px] md:h-[700px]">
                <img
                    src="/images/banner.jpeg"
                    alt="Auditorium"
                    className="w-full h-full object-cover"
                />

                {/* Floating White Card */}
                <div className="absolute top-10 right-4 md:top-20 md:right-[10%] w-[90%] md:w-[400px] bg-white p-8 md:p-12 shadow-2xl rounded-sm animate-fade-in-up">
                    <div className="w-12 h-0.5 bg-gray-200 mb-8"></div>
                    <h2 className="text-3xl md:text-4xl font-heading text-[#1A0033] mb-6 font-medium">
                        Bold minds
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        bold minds as we gather for a day of courage, clarity, and unstoppable inspiration.
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
