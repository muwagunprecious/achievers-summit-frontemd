"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { ChevronDown, Mail } from 'lucide-react';

const TermSection = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);
    return (
        <div className="border-b border-border last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-5 flex items-center justify-between text-left group"
            >
                <h3 className="text-lg font-semibold text-text group-hover:text-brand transition-colors">
                    {title}
                </h3>
                <ChevronDown className={`text-brand transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={20} />
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1500px] mb-6' : 'max-h-0'}`}>
                <div className="text-text-secondary text-sm leading-relaxed prose max-w-none">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-surface">
            <Navbar variant="light" />

            <PageHero
                label="Governance"
                heading={<>Terms &<br />conditions.</>}
                subtitle="Last updated: 31st December 2025. Please read these terms carefully before completing your registration."
                image="/images/past-edition/img_5554.jpeg"
                imageAlt="Terms and conditions"
            />

            <section className="section bg-surface">
                <div className="max-w-3xl mx-auto px-6 lg:px-16">
                    <div className="card p-8 md:p-10">
                        <TermSection title="1. Acceptance of Terms" defaultOpen={true}>
                            <p>By registering for the Achievers Summit (the "Summit"), organized by EA International ("Organizer," "we," "us," "our"), you ("Participant," "Delegate," "you," "your") agree to be bound by these Terms and Conditions.</p>
                        </TermSection>

                        <TermSection title="2. Event Details">
                            <ul className="space-y-3">
                                <li><strong>Event:</strong> Achievers Summit 2013 International Youth Day Leadership and Entrepreneurship Summit.</li>
                                <li><strong>Dates:</strong> August 11-12, 2026.</li>
                                <li><strong>Venue:</strong> Lagos, Nigeria.</li>
                                <li>The Organizer reserves the right to change the venue, schedule, speakers, or any other aspect of the Summit due to unforeseen circumstances.</li>
                            </ul>
                        </TermSection>

                        <TermSection title="3. Registration & Payment">
                            <ul className="space-y-3">
                                <li>Registration is confirmed only upon receipt of full payment.</li>
                                <li>All fees are as quoted on the official registration platform. Fees are non-refundable except as stated in the Cancellation & Refund Policy.</li>
                                <li>Registration is personal and non-transferable without the prior written consent of the Organizer.</li>
                            </ul>
                        </TermSection>

                        <TermSection title="4. Participant Conduct">
                            <p>As an international youth leadership summit, we expect all participants to:</p>
                            <ul className="space-y-3 mt-4">
                                <li>Conduct themselves professionally, respectfully, and inclusively.</li>
                                <li>Adhere to the schedule and instructions of Summit staff.</li>
                                <li>Not engage in any form of harassment, discrimination, or disruptive behavior.</li>
                                <li>Respect the intellectual property of speakers, sponsors, and fellow participants.</li>
                                <li>Recording of sessions may be prohibited unless explicitly authorized.</li>
                                <li>The Organizer reserves the right to deny entry or remove any participant whose conduct is deemed inappropriate.</li>
                            </ul>
                        </TermSection>

                        <TermSection title="5. Cancellation & Refund Policy">
                            <ul className="space-y-3">
                                <li><strong>No refund will be issued after payment has been made.</strong> Ticket transfer is possible; requests must be sent to <a href="mailto:info@achieverssummit.com.ng" className="text-brand hover:underline">info@achieverssummit.com.ng</a></li>
                                <li><strong>By Organizer:</strong> EA International reserves the right to cancel or postpone the Summit due to force majeure events.</li>
                                <li>If the Summit is postponed, your registration will be automatically transferred to the new dates.</li>
                                <li>If the Summit is canceled, participants will be entitled to a full refund.</li>
                                <li>The Organizer is not liable for any additional costs incurred (travel, accommodation, visa fees).</li>
                            </ul>
                        </TermSection>

                        <TermSection title="6. Liability & Responsibility">
                            <ul className="space-y-3">
                                <li>Participation is at your own risk. The Organizer is not liable for any loss, injury, damage to person or property.</li>
                                <li>Participants are solely responsible for their personal belongings, travel arrangements, health insurance, and obtaining any necessary visas.</li>
                            </ul>
                        </TermSection>

                        <TermSection title="7. Media & Promotional Rights">
                            <p>By attending the Summit, you grant EA International the right to use photographs, video, and audio recordings featuring your image taken during the event for promotional and archival purposes.</p>
                        </TermSection>

                        <TermSection title="8. Data Privacy">
                            <p>Your personal data will be handled in accordance with our <a href="/privacy" className="text-brand hover:underline">Privacy Policy</a>, which forms an integral part of these Terms.</p>
                        </TermSection>

                        <TermSection title="9. Amendments">
                            <p>EA International reserves the right to amend these Terms and Conditions at any time. The most current version will be posted on the official Summit website.</p>
                        </TermSection>

                        <TermSection title="10. Governing Law & Jurisdiction">
                            <p>These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria.</p>
                        </TermSection>

                        <div className="mt-10 pt-8 border-t border-border text-center">
                            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand mx-auto mb-4">
                                <Mail size={22} />
                            </div>
                            <p className="text-text-secondary text-sm mb-3">For any questions regarding these Terms, please contact:</p>
                            <a href="mailto:info@achieverssummit.com.ng" className="text-lg font-semibold text-text hover:text-brand transition-colors">
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
