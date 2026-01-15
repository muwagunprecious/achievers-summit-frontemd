"use client";
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ChevronDown, Lock, Eye, Database, Share2, UserCheck, Clock, ShieldAlert } from 'lucide-react';

const PrivacySection = ({ title, icon, children, isOpen, onToggle }) => (
    <div className={`glass-panel mb-4 overflow-hidden border border-white/5 transition-all duration-500 ${isOpen ? 'border-primary-copper/30 bg-primary-copper/[0.02]' : 'hover:border-white/10'}`}>
        <button
            onClick={onToggle}
            className="w-full p-8 flex items-center justify-between text-left"
        >
            <div className="flex items-center gap-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-primary-copper text-white' : 'bg-white/5 text-primary-copper'}`}>
                    {icon}
                </div>
                <h3 className="text-lg font-black text-white italic uppercase tracking-widest">{title}</h3>
            </div>
            <ChevronDown className={`text-text-muted transition-transform duration-500 ${isOpen ? 'rotate-180 text-primary-copper' : ''}`} size={24} />
        </button>
        <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-8 pt-0 border-t border-white/5 text-text-secondary font-light leading-relaxed space-y-4">
                {children}
            </div>
        </div>
    </div>
);

export default function PrivacyPage() {
    const [openIndex, setOpenIndex] = useState(0);

    const sections = [
        {
            title: "Data Collection",
            icon: <Database size={22} />,
            content: (
                <>
                    <p>We collect personal information that you provide voluntarily when registering for the Achievers Summit, including your full name, email address, phone number, and professional affiliations.</p>
                    <p>We also collect technical data such as your IP address and browsing behavior on our platform to optimize the user experience and ensure platform security.</p>
                </>
            )
        },
        {
            title: "Usage & Purpose",
            icon: <Eye size={22} />,
            content: (
                <>
                    <p>Your data is used primarily for event coordination, ticket issuance, and providing summit-related updates. We also use your information for security verification at the venue.</p>
                    <p>We comply with the Global Data Protection Regulation (GDPR) standards, ensuring that your data is processed only for explicit and legitimate purposes.</p>
                </>
            )
        },
        {
            title: "Data Security",
            icon: <Lock size={22} />,
            content: (
                <>
                    <p>Achievers Summit employs industry-standard security measures, including multi-layer encryption and secure socket layers (SSL), to protect your personal datasets from unauthorized access or disclosure.</p>
                    <p>Payment information is processed via certified third-party gateways and is never stored directly on our servers.</p>
                </>
            )
        },
        {
            title: "Data Sharing",
            icon: <Share2 size={22} />,
            content: (
                <>
                    <p>We do not sell or trade your personal data to third parties for marketing purposes. Data may be shared with trusted service providers who assist us in operating our platform and conducting the summit, provided they agree to maintain strict confidentiality.</p>
                </>
            )
        },
        {
            title: "Your Rights",
            icon: <UserCheck size={22} />,
            content: (
                <>
                    <p>You have the right to access, rectify, or request the deletion of your personal data at any time. You may also object to processing or request data portability by contacting our data protection officer at <span className="text-primary-copper font-bold">privacy@achieverssummit.africa</span>.</p>
                </>
            )
        },
        {
            title: "Retention & Storage",
            icon: <Clock size={22} />,
            content: (
                <>
                    <p>We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy or to comply with legal obligations.</p>
                </>
            )
        }
    ];

    return (
        <main className="min-h-screen bg-bg-deep pt-40 pb-40">
            <Navbar />
            <div className="container max-w-4xl">
                <div className="text-center mb-24">
                    <div className="text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-6">Data Responsibility</div>
                    <h1 className="text-5xl md:text-8xl text-white mb-10 font-black italic uppercase tracking-tighter">Privacy <span className="text-gradient NOT-italic">Protocol.</span></h1>
                    <p className="text-text-muted text-xs font-black tracking-widest uppercase italic">Committed to GDPR & NDPR Standards</p>
                </div>

                <div className="space-y-4">
                    {sections.map((section, index) => (
                        <PrivacySection
                            key={index}
                            title={section.title}
                            icon={section.icon}
                            isOpen={openIndex === index}
                            onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                        >
                            {section.content}
                        </PrivacySection>
                    ))}
                </div>

                <div className="mt-20 p-8 glass-panel rounded-3xl border border-white/5 bg-white/[0.01] flex gap-6 items-center">
                    <ShieldAlert className="text-primary-copper shrink-0" size={24} />
                    <p className="text-sm text-text-secondary leading-relaxed">
                        For any privacy-related inquiries or data requests, please reach out to our legal department via <span className="text-white font-bold underline">legal@achieverssummit.africa</span>.
                    </p>
                </div>
            </div>
            <Footer />

            <style jsx>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 32px;
                }
                .text-gradient {
                    background: linear-gradient(to right, #ffffff, var(--primary-copper));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
        </main>
    );
}
