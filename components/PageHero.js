"use client";
import React from 'react';
import Image from 'next/image';

/**
 * Reusable sub-page hero:
 *  - Light (#FAFAF9) background
 *  - Left: label, heading, subtitle, optional CTA
 *  - Right: floating image card with sharp corners + subtle shadow
 */
export default function PageHero({ label, heading, subtitle, image, imageAlt, children }) {
    return (
        <section className="bg-surface-alt pt-32 pb-20 lg:pt-40 lg:pb-28">
            <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left \u2014 Text */}
                    <div className="animate-fade-in">
                        {label && (
                            <p className="section-label">{label}</p>
                        )}
                        <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.08] tracking-tight text-text mb-6">
                            {heading}
                        </h1>
                        {subtitle && (
                            <p className="text-lg lg:text-xl text-text-secondary leading-relaxed max-w-xl">
                                {subtitle}
                            </p>
                        )}
                        {children && (
                            <div className="mt-8">{children}</div>
                        )}
                    </div>

                    {/* Right \u2014 Image card */}
                    {image && (
                        <div className="relative hidden lg:block animate-fade-in delay-200">
                            <div className="img-reveal aspect-[4/3] shadow-xl relative">
                                <Image
                                    src={image}
                                    alt={imageAlt || ''}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover"
                                    loading="lazy"
                                />
                            </div>
                            {/* Decorative dot grid */}
                            <div
                                className="absolute -bottom-4 -right-4 w-24 h-24 opacity-[0.06] -z-10"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, #783A28 1.5px, transparent 1.5px)',
                                    backgroundSize: '10px 10px',
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
