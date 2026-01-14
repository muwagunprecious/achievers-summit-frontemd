"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-bg-deep pt-40">
            <Navbar />
            <div className="container py-20 max-w-4xl">
                <div className="text-center mb-16">
                    <div className="text-primary-copper font-black text-xs tracking-widest uppercase mb-4">Legal Framework</div>
                    <h1 className="text-5xl md:text-7xl text-white mb-8 italic italic uppercase tracking-tighter font-black">Privacy <span className="text-primary-copper NOT-italic font-black">Protocol.</span></h1>
                </div>

                <div className="glass-panel p-12 rounded-[40px] border border-white/5 flex flex-col gap-10 text-text-secondary leading-relaxed font-light">
                    <section>
                        <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4">1. Information Collection</h2>
                        <p>We collect essential data required for ticket issuance and summit updates, including full name, email address, and contact information. Payment details are processed via secure encrypted gateways and are not stored on our primary servers.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4">2. Usage Rights</h2>
                        <p>Your data is used exclusively for event coordination, security protocol at the venue, and official communications regarding Achievers Summit Africa. We do not sell or distribute your information to third-party marketing entities.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4">3. Security Standards</h2>
                        <p>All personal datasets are protected by multi-layer encryption and institutional-grade firewalls. Access is strictly restricted to authorized summit personnel on a need-to-know basis.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4">4. Cookie Policy</h2>
                        <p>Our platform uses micro-cookies to enhance user session stability and provide a seamless booking experience. No tracking cookies for behavioral advertising are employed.</p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
