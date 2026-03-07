"use client";
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { Heart, ShieldCheck, MessageCircle, ArrowRight } from 'lucide-react';
import VolunteerForm from '../../components/VolunteerForm';
import AmbassadorForm from '../../components/AmbassadorForm';

export default function CommunityPage() {
    const [activeForm, setActiveForm] = useState(null);

    if (activeForm === 'volunteer') {
        return <VolunteerForm onBack={() => setActiveForm(null)} />;
    }

    if (activeForm === 'ambassador') {
        return <AmbassadorForm onBack={() => setActiveForm(null)} />;
    }

    return (
        <main className="min-h-screen bg-surface">
            <Navbar variant="light" />

            <PageHero
                label="Our community"
                heading={<>Grow with<br />Achievers.</>}
                subtitle="Join a vibrant movement of young African leaders. Whether you want to serve as a volunteer or lead as an ambassador, there’s a place for you in our community."
                image="/images/past-edition/img_5484.jpeg"
                imageAlt="Community members at the summit"
            />

            <section className="section bg-surface">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
                    <p className="section-label">Get involved</p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-14 max-w-2xl">Choose your path</h2>
                    <div className="grid sm:grid-cols-3 gap-6 max-w-4xl">
                        {/* Volunteer Card */}
                        <div className="card p-6 flex flex-col h-full hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand mb-4">
                                <Heart size={20} />
                            </div>
                            <h3 className="font-semibold text-text mb-2">Volunteer</h3>
                            <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-grow">
                                Give back to the continent by serving in our various product and service units. Gain experience and make an impact.
                            </p>
                            <button
                                onClick={() => setActiveForm('volunteer')}
                                className="btn bg-brand text-white hover:bg-brand-dark border-brand hover:border-brand-dark w-full justify-center text-sm"
                            >
                                Apply now <ArrowRight size={14} />
                            </button>
                        </div>

                        {/* Ambassador Card */}
                        <div className="card p-6 flex flex-col h-full hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand mb-4">
                                <ShieldCheck size={20} />
                            </div>
                            <h3 className="font-semibold text-text mb-2">Ambassador</h3>
                            <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-grow">
                                Become a campus or professional representative. Lead the narrative and represent the summit in your region.
                            </p>
                            <button
                                onClick={() => setActiveForm('ambassador')}
                                className="btn bg-brand text-white hover:bg-brand-dark border-brand hover:border-brand-dark w-full justify-center text-sm"
                            >
                                Become one <ArrowRight size={14} />
                            </button>
                        </div>

                        {/* WhatsApp Card */}
                        <div className="card p-6 flex flex-col h-full hover:shadow-md transition-shadow border-green-100">
                            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 mb-4">
                                <MessageCircle size={20} />
                            </div>
                            <h3 className="font-semibold text-text mb-2">WhatsApp Community</h3>
                            <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-grow">
                                Join our official WhatsApp group for real-time updates, networking, and announcements.
                            </p>
                            <a
                                href="https://chat.whatsapp.com/BVSQbb1TcNkD8ZYwHmwtyO"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn bg-green-600 text-white hover:bg-green-700 border-green-600 hover:border-green-700 w-full justify-center text-sm"
                            >
                                Join group <ArrowRight size={14} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
