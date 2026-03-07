"use client";
import React, { useState } from 'react';
import { Award, Send, CheckCircle2, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

export default function NominationPage() {
    const [status, setStatus] = useState('IDLE');
    const [formData, setFormData] = useState({
        nomineeName: '',
        nomineeEmail: '',
        nomineePhone: '',
        nomineeWhatsApp: '',
        nomineeTwitter: '',
        nomineeLinkedIn: '',
        nomineeInstagram: '',
        category: '',
        reason: '',
        nominatorName: '',
        nominatorEmail: ''
    });

    const categories = [
        "Tech Innovator of the Year",
        "Business Leader of the Year",
        "Creative Arts Excellence",
        "Social Impact Champion",
        "Young Achiever (Under 30)",
        "Lifetime Achievement Award"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('SUBMITTING');

        const formDataObj = new FormData();
        Object.keys(formData).forEach(key => formDataObj.append(key, formData[key]));

        try {
            const { submitNomination } = await import('./actions');
            const result = await submitNomination(formDataObj);

            if (result.success) {
                setStatus('SUCCESS');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                alert(result.error || 'Something went wrong');
                setStatus('IDLE');
            }
        } catch (error) {
            console.error(error);
            alert('An unexpected error occurred');
            setStatus('IDLE');
        }
    };

    const inputClass = "w-full h-12 bg-surface-alt border border-border rounded-lg px-4 text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all";

    if (status === 'SUCCESS') {
        return (
            <main className="min-h-screen bg-surface flex flex-col items-center justify-center p-6">
                <Navbar variant="light" />
                <div className="max-w-md w-full card p-10 text-center">
                    <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={32} className="text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-text mb-3">Nomination received</h2>
                    <p className="text-text-secondary mb-8 text-sm leading-relaxed">
                        Thank you for submitting your nomination. Our committee will review the details and get back to you shortly.
                    </p>
                    <a href="/" className="btn bg-brand text-white hover:bg-brand-dark border-brand hover:border-brand-dark w-full justify-center mb-3">
                        Return home
                    </a>
                    <button
                        onClick={() => {
                            setStatus('IDLE');
                            setFormData({
                                nomineeName: '', nomineeEmail: '', nomineePhone: '', nomineeWhatsApp: '', nomineeTwitter: '', nomineeLinkedIn: '', nomineeInstagram: '', category: '', reason: '', nominatorName: '', nominatorEmail: ''
                            });
                        }}
                        className="text-sm text-text-secondary hover:text-brand transition-colors"
                    >
                        Submit another nomination
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-surface">
            <Navbar variant="light" />

            <PageHero
                label="Call for nominations"
                heading={<>Recognize<br />excellence.</>}
                subtitle="Know someone making waves in their industry? Nominate them for the prestigious Achievers Awards 2026."
                image="/images/past-edition/img_9836.jpg"
                imageAlt="Award ceremony"
            />

            <section className="section bg-surface">
                <div className="max-w-3xl mx-auto px-6 lg:px-16">
                    <div className="card p-8 md:p-10">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Section 1: Nominee Details */}
                            <div className="space-y-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="w-7 h-7 rounded-md bg-brand-50 flex items-center justify-center text-xs font-bold text-brand">01</span>
                                    <h3 className="font-semibold text-text">Nominee details</h3>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-text mb-1.5">Full name *</label>
                                        <input required type="text" className={inputClass} placeholder="Nominee\'s name" value={formData.nomineeName} onChange={(e) => setFormData({ ...formData, nomineeName: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text mb-1.5">Category *</label>
                                        <select required className={inputClass + " appearance-none"} value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                            <option value="" disabled>Select category</option>
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-text mb-1.5">Email *</label>
                                        <input required type="email" className={inputClass} placeholder="nominee@example.com" value={formData.nomineeEmail} onChange={(e) => setFormData({ ...formData, nomineeEmail: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text mb-1.5">Phone *</label>
                                        <input required type="tel" className={inputClass} placeholder="+234 ..." value={formData.nomineePhone} onChange={(e) => setFormData({ ...formData, nomineePhone: e.target.value })} />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-text mb-1.5">WhatsApp</label>
                                        <input type="tel" className={inputClass} placeholder="+234 ..." value={formData.nomineeWhatsApp} onChange={(e) => setFormData({ ...formData, nomineeWhatsApp: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text mb-1.5">Twitter</label>
                                        <input type="text" className={inputClass} placeholder="@username" value={formData.nomineeTwitter} onChange={(e) => setFormData({ ...formData, nomineeTwitter: e.target.value })} />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-text mb-1.5">LinkedIn</label>
                                        <input type="text" className={inputClass} placeholder="linkedin.com/in/..." value={formData.nomineeLinkedIn} onChange={(e) => setFormData({ ...formData, nomineeLinkedIn: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text mb-1.5">Instagram</label>
                                        <input type="text" className={inputClass} placeholder="@username" value={formData.nomineeInstagram} onChange={(e) => setFormData({ ...formData, nomineeInstagram: e.target.value })} />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text mb-1.5">Reason for nomination *</label>
                                    <textarea required className={inputClass + " h-auto py-3 resize-none"} rows="4" placeholder="Tell us why this person deserves the award..." value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} />
                                </div>
                            </div>

                            <div className="h-px bg-border" />

                            {/* Section 2: Nominator Details */}
                            <div className="space-y-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="w-7 h-7 rounded-md bg-brand-50 flex items-center justify-center text-xs font-bold text-brand">02</span>
                                    <h3 className="font-semibold text-text">Your details</h3>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-text mb-1.5">Your name *</label>
                                        <input required type="text" className={inputClass} placeholder="Your name" value={formData.nominatorName} onChange={(e) => setFormData({ ...formData, nominatorName: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text mb-1.5">Your email *</label>
                                        <input required type="email" className={inputClass} placeholder="you@email.com" value={formData.nominatorEmail} onChange={(e) => setFormData({ ...formData, nominatorEmail: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" disabled={status === 'SUBMITTING'} className="btn bg-brand text-white hover:bg-brand-dark border-brand hover:border-brand-dark w-full justify-center disabled:opacity-50">
                                {status === 'SUBMITTING' ? (
                                    <><Loader2 size={18} className="animate-spin" /> Submitting...</>
                                ) : (
                                    <>Submit nomination <Send size={16} /></>
                                )}
                            </button>
                            <p className="text-center text-xs text-text-secondary">By submitting, you agree to our terms and privacy policy.</p>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
