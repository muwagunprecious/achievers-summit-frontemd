"use client";
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ChevronDown, ShieldCheck, Scale, FileText, AlertCircle, Ban, Gavel, Radio } from 'lucide-react';

const AccordionItem = ({ title, icon, children, isOpen, onToggle }) => (
    <div className={`glass-panel mb-4 overflow-hidden border border-white/5 transition-all duration-500 ${isOpen ? 'border-primary-copper/30 bg-primary-copper/[0.02]' : 'hover:border-white/10'}`}>
        <button
            onClick={onToggle}
            className="w-full p-8 flex items-center justify-between text-left transition-all"
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

export default function TermsPage() {
    const [openIndex, setOpenIndex] = useState(0);

    const sections = [
        {
            title: "Acceptance of Terms",
            icon: <Scale size={22} />,
            content: (
                <>
                    <p>By registering for or attending the Achievers Summit 2026, you agree to be bound by these Terms and Conditions. These terms apply to all delegates, speakers, exhibitors, and partners.</p>
                    <p>The organizers, Emmanuel Agida International (EAI), reserve the right to modify these terms at any time. Continued use of the website or attendance at the summit constitutes acceptance of the updated terms.</p>
                </>
            )
        },
        {
            title: "Registration & Payment",
            icon: <FileText size={22} />,
            content: (
                <>
                    <p>Full payment of registration fees is required to secure your pass. All prices are in Nigerian Naira (NGN) unless otherwise stated.</p>
                    <p>Digital passes will be issued upon successful verification of payment. Each pass is unique and tied to the registered delegate's identity.</p>
                </>
            )
        },
        {
            title: "Cancellation & Refund Policy",
            icon: <Ban size={22} />,
            content: (
                <>
                    <p>Registration fees are non-refundable. However, you may transfer your registration to another individual by providing written notice to the organizers at least 14 days prior to the summit start date (11th August 2026).</p>
                    <p>In the event of a summit postponement or cancellation by the organizers due to force majeure, delegates will be offered the option to transfer their registration to the new date or receive a credit for future events.</p>
                </>
            )
        },
        {
            title: "Conduct & Security",
            icon: <ShieldCheck size={22} />,
            content: (
                <>
                    <p>All attendees must maintain a high standard of professional decorum. Harassment, discrimination, or disruptive behavior of any kind will not be tolerated.</p>
                    <p>The organizers reserve the right to refuse entry or expel any individual from the summit premises for violation of security protocols or conduct codes without refund.</p>
                </>
            )
        },
        {
            title: "Media Rights",
            icon: <Radio size={22} />,
            content: (
                <>
                    <p>By attending the Achievers Summit, you acknowledge that you may be photographed or recorded. You grant the organizers the irrevocable right to use your image and voice in promotional materials, broadcasts, and social media without compensation.</p>
                    <p>Flash photography and unauthorized professional recording equipment are prohibited during keynote sessions unless prior approval is obtained.</p>
                </>
            )
        },
        {
            title: "Liability & Governing Law",
            icon: <Gavel size={22} />,
            content: (
                <>
                    <p>The organizers are not liable for personal injury, loss, or damage to property during the summit. It is recommended that international delegates obtain appropriate travel and health insurance.</p>
                    <p>These terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria.</p>
                </>
            )
        }
    ];

    return (
        <main className="min-h-screen bg-bg-deep pt-40 pb-40">
            <Navbar />
            <div className="container max-w-4xl">
                <div className="text-center mb-24">
                    <div className="text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-6">Legal Framework</div>
                    <h1 className="text-5xl md:text-8xl text-white mb-10 font-black italic uppercase tracking-tighter">Terms & <span className="text-gradient NOT-italic">Conditions.</span></h1>
                    <p className="text-text-muted text-xs font-black tracking-widest uppercase italic">Last Updated: January 15, 2026</p>
                </div>

                <div className="space-y-4">
                    {sections.map((section, index) => (
                        <AccordionItem
                            key={index}
                            title={section.title}
                            icon={section.icon}
                            isOpen={openIndex === index}
                            onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                        >
                            {section.content}
                        </AccordionItem>
                    ))}
                </div>

                <div className="mt-20 p-8 glass-panel rounded-3xl border border-red-500/10 bg-red-500/[0.01] flex gap-6 items-start">
                    <AlertCircle className="text-red-500 shrink-0" size={24} />
                    <p className="text-sm text-text-secondary leading-relaxed font-medium">
                        <span className="text-white font-bold block mb-1 uppercase tracking-widest text-[10px]">Important Note:</span>
                        Participation in the Achievers Summit is subject to strict adherence to the venue's safety protocols and local health regulations. Failure to comply may result in revoked access.
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
