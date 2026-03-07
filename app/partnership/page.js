"use client";
import React, { useState } from 'react';
import { Loader2, CheckCircle, AlertCircle, Handshake, Mail, Phone, User, Building2, ChevronRight, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

export default function PartnershipPage() {
    const [formData, setFormData] = useState({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        partnershipType: '',
        message: ''
    });
    const [status, setStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const response = await fetch('/api/partnerships/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit partnership request');
            }

            setStatus('success');
        } catch (error) {
            setStatus('error');
            setErrorMessage(error.message);
        }
    };

    if (status === 'success') {
        return (
            <main className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center">
                <Navbar variant="light" />
                <div className="max-w-md w-full card p-10">
                    <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={32} className="text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-text mb-3">Request submitted</h2>
                    <p className="text-text-secondary mb-8">
                        Your partnership request has been received. Our team will contact you shortly.
                    </p>
                    <a href="/" className="btn bg-brand text-white hover:bg-brand-dark border-brand hover:border-brand-dark w-full justify-center">
                        Return to homepage
                    </a>
                </div>
            </main>
        );
    }

    const inputClass = "w-full h-12 bg-surface-alt border border-border rounded-lg px-4 text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all";

    return (
        <main className="min-h-screen bg-surface">
            <Navbar variant="light" />

            <PageHero
                label="Strategic partnership"
                heading={<>Partner with<br />the summit.</>}
                subtitle="Our strategic partners gain exclusive access to a high-net-worth network of industry leaders and continental policymakers."
                image="/images/past-edition/img_4669-copy-2.jpeg"
                imageAlt="Partnership handshake"
            />

            <section className="section bg-surface">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
                    <div className="grid lg:grid-cols-5 gap-16">
                        {/* Left info */}
                        <div className="lg:col-span-2">
                            <p className="section-label">Why partner?</p>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text mb-8">Benefits of partnership</h2>
                            <div className="space-y-6">
                                {[
                                    { title: "Global Exposure", desc: "Brand alignment with Africa\'s leading youth summit." },
                                    { title: "Premium Access", desc: "VIP networking with top-tier delegates and speakers." },
                                    { title: "Strategic Impact", desc: "Influence African innovation, policy, and growth." }
                                ].map((b, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center text-brand shrink-0 mt-0.5">
                                            <ChevronRight size={16} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-text mb-0.5">{b.title}</h4>
                                            <p className="text-sm text-text-secondary">{b.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right form */}
                        <div className="lg:col-span-3">
                            <div className="card p-8">
                                <h3 className="text-lg font-bold text-text mb-6">Submit your interest</h3>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-text mb-1.5">Company name</label>
                                            <input required type="text" name="companyName" value={formData.companyName} onChange={handleChange} className={inputClass} placeholder="Your organization" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text mb-1.5">Contact person</label>
                                            <input required type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} className={inputClass} placeholder="Full name" />
                                        </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-text mb-1.5">Email</label>
                                            <input required type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="partner@company.com" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text mb-1.5">Phone</label>
                                            <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+234 ..." />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text mb-1.5">Partnership tier</label>
                                        <select required name="partnershipType" value={formData.partnershipType} onChange={handleChange} className={inputClass + " appearance-none"}>
                                            <option value="">Select a tier</option>
                                            <option value="Platinum Sponsor">Platinum Partner</option>
                                            <option value="Gold Sponsor">Gold Partner</option>
                                            <option value="Silver Sponsor">Silver Partner</option>
                                            <option value="Media Partner">Media Partner</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text mb-1.5">Message</label>
                                        <textarea required name="message" value={formData.message} onChange={handleChange} rows="4" className={inputClass + " h-auto py-3 resize-none"} placeholder="Tell us about your partnership goals..." />
                                    </div>

                                    {status === 'error' && (
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                                            <AlertCircle size={18} className="text-red-500 shrink-0" />
                                            <p className="text-red-700 text-sm">{errorMessage}</p>
                                        </div>
                                    )}

                                    <button type="submit" disabled={status === 'submitting'} className="btn bg-brand text-white hover:bg-brand-dark border-brand hover:border-brand-dark w-full justify-center disabled:opacity-50">
                                        {status === 'submitting' ? (
                                            <Loader2 size={18} className="animate-spin" />
                                        ) : (
                                            <>Submit request <Handshake size={16} /></>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
