"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-bg-deep pt-40">
            <Navbar />
            <div className="container py-20 max-w-4xl">
                <div className="text-center mb-16">
                    <div className="text-primary-copper font-black text-xs tracking-widest uppercase mb-4">User Agreement</div>
                    <h1 className="text-5xl md:text-7xl text-white mb-8 italic italic uppercase tracking-tighter font-black">Digital <span className="text-primary-copper NOT-italic font-black">Terms.</span></h1>
                </div>

                <div className="glass-panel p-12 rounded-[40px] border border-white/5 flex flex-col gap-10 text-text-secondary leading-relaxed font-light">
                    <section>
                        <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4">1. Ticket Validity</h2>
                        <p>Each digital pass is unique and tied to the registered individual. Proof of identity matching the ticket data will be required for entry at the Victoria Island venue.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4">2. Refund Policy</h2>
                        <p>Ticket purchases are final and non-refundable. However, passes can be transferred to an alternate delegate with written notice at least 14 days prior to the summit start date in August 2026.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4">3. Conduct Protocol</h2>
                        <p>Attendees are expected to maintain the highest levels of corporate decorum. Summit organizers reserve the right to revoke access for any individual violating institutional safety or harassment policies.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4">4. Liability Limitation</h2>
                        <p>Achievers Summit Africa and its partners are not liable for incidental losses, including travel or accommodation expenses, in the unlikely event of schedule adjustments or venue modifications.</p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
