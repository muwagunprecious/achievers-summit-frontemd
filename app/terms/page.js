"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ChevronDown, Scale, ShieldCheck, Mail } from 'lucide-react';

const TermSection = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);
    return (
        <div className="border-b border-white/5 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-10 flex items-center justify-between text-left group focus:outline-none appearance-none border-none outline-none"
                style={{ backgroundColor: 'transparent', background: 'transparent' }}
            >
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter group-hover:text-primary-copper transition-colors bg-transparent">
                    {title}
                </h3>
                <ChevronDown className={`text-primary-copper transition-transform duration-500 ${isOpen ? 'rotate-180' : ''} bg-transparent`} size={24} />
            </button>
            <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? 'max-h-[1000px] mb-10' : 'max-h-0'}`}>
                <div className="text-text-secondary text-lg font-light leading-relaxed prose prose-invert max-w-none">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-bg-deep pt-48">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-24 pb-16 overflow-hidden border-b border-white/5">
                <div className="container relative z-10 text-center">
                    <div className="text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-6 uppercase">Governance</div>
                    <h1 className="text-5xl md:text-8xl text-white mb-10 font-black italic uppercase tracking-tighter leading-tight">
                        Digital <span className="text-gradient NOT-italic font-black text-primary-copper">Terms.</span>
                    </h1>
                    <p className="text-xl text-text-secondary font-light max-w-4xl mx-auto leading-relaxed">
                        Last Updated: 31st December 2025. Please read these terms carefully before completing your registration.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="pt-12 pb-40 bg-bg-deep relative">
                <div className="container">
                    <div className="max-w-5xl mx-auto glass-panel p-10 md:p-20 rounded-[64px] border border-white/5 bg-black/40">
                        <TermSection title="1. Acceptance of Terms" defaultOpen={true}>
                            <p>By registering for the Achievers Summit (the "Summit"), organized by EA International ("Organizer," "we," "us," "our"), you ("Participant," "Delegate," "you," "your") agree to be bound by these Terms and Conditions. Please read them carefully before completing your registration.</p>
                        </TermSection>

                        <TermSection title="2. Event Details">
                            <ul className="space-y-4">
                                <li><strong>Event:</strong> Achievers Summit – International Youth Day Leadership and Entrepreneurship Summit.</li>
                                <li><strong>Dates:</strong> August 11-12, 2026.</li>
                                <li><strong>Venue:</strong> Lagos, Nigeria.</li>
                                <li>The Organizer reserves the right to change the venue, schedule, speakers, or any other aspect of the Summit due to unforeseen circumstances, while striving to maintain the overall quality and intent of the event.</li>
                            </ul>
                        </TermSection>

                        <TermSection title="3. Registration & Payment">
                            <ul className="space-y-4">
                                <li>Registration is confirmed only upon receipt of full payment.</li>
                                <li>All fees are as quoted on the official registration platform. Fees are non-refundable except as explicitly stated in the Cancellation & Refund Policy (Clause 5).</li>
                                <li>Registration is personal and non-transferable without the prior written consent of the Organizer.</li>
                            </ul>
                        </TermSection>

                        <TermSection title="4. Participant Conduct">
                            <p>As an international youth leadership summit, we expect all participants to:</p>
                            <ul className="space-y-4 mt-6">
                                <li>Conduct themselves professionally, respectfully, and inclusively.</li>
                                <li>Adhere to the schedule and instructions of Summit staff and venue personnel.</li>
                                <li>Not engage in any form of harassment, discrimination, or disruptive behavior.</li>
                                <li>Respect the intellectual property of speakers, sponsors, and fellow participants.</li>
                                <li>Recording of sessions may be prohibited unless explicitly authorized.</li>
                                <li>The Organizer reserves the right to deny entry or remove any participant whose conduct is deemed inappropriate, without obligation for a refund.</li>
                            </ul>
                        </TermSection>

                        <TermSection title="5. Cancellation & Refund Policy">
                            <ul className="space-y-4">
                                <li><strong>No refund will be issued after payment has been made.</strong> Ticket transfer is possible and request must be written to <a href="mailto:info@achieverssummit.com.ng" className="text-primary-copper underline">info@achieverssummit.com.ng</a></li>
                                <li><strong>By Organizer:</strong> EA International reserves the right to cancel or postpone the Summit due to force majeure events.</li>
                                <li>If the Summit is postponed, your registration will be automatically transferred to the new dates.</li>
                                <li>If the Summit is canceled, participants will be entitled to a full refund of the registration fee.</li>
                                <li>The Organizer is not liable for any additional costs incurred (e.g., travel, accommodation, visa fees).</li>
                            </ul>
                        </TermSection>

                        <TermSection title="6. Liability & Responsibility">
                            <ul className="space-y-4">
                                <li>Participation is at your own risk. The Organizer is not liable for any loss, injury, damage to person or property, or any other claim arising from your participation.</li>
                                <li>Participants are solely responsible for their personal belongings, travel arrangements, health insurance, and obtaining any necessary visas or travel documents.</li>
                            </ul>
                        </TermSection>

                        <TermSection title="7. Media & Promotional Rights">
                            <p>By attending the Summit, you grant EA International the irrevocable right to use photographs, video, and audio recordings featuring your image, voice, or likeness taken during the event for promotional, archival, and news purposes across all media worldwide, in perpetuity, without compensation.</p>
                        </TermSection>

                        <TermSection title="8. Data Privacy">
                            <p>Your personal data will be handled in accordance with our <a href="/privacy" className="text-primary-copper underline">Privacy Policy</a>, which forms an integral part of these Terms.</p>
                        </TermSection>

                        <TermSection title="9. Amendments">
                            <p>EA International reserves the right to amend these Terms and Conditions at any time. The most current version will be posted on the official Summit website.</p>
                        </TermSection>

                        <TermSection title="10. Governing Law & Jurisdiction">
                            <p>These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to its conflict of law principles.</p>
                        </TermSection>

                        <div className="mt-20 pt-16 border-t border-white/5 text-center space-y-8">
                            <div className="w-16 h-16 bg-white/5 rounded-xs flex items-center justify-center text-primary-copper mx-auto">
                                <Mail size={32} />
                            </div>
                            <p className="text-text-secondary">For any questions regarding these Terms, please contact:</p>
                            <a href="mailto:info@achieverssummit.com.ng" className="text-2xl md:text-3xl font-black text-white hover:text-primary-copper transition-colors">
                                info@achieverssummit.com.ng
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
</main>
    );
}
