"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ChevronDown, Shield, Lock, Eye } from 'lucide-react';

const PrivacySection = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);
    return (
        <div className="border-b border-white/5 last:border-0" style={{ backgroundColor: 'transparent' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-10 flex items-center justify-between text-left group"
                style={{ backgroundColor: 'transparent' }}
            >
                <h3 className="text-2xl md:text-3xl font-black !text-white uppercase italic tracking-tighter group-hover:text-primary-copper transition-colors">
                    {title}
                </h3>
                <ChevronDown className={`text-primary-copper transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} size={24} />
            </button>
            <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? 'max-h-[1500px] mb-10' : 'max-h-0'}`} style={{ backgroundColor: 'transparent' }}>
                <div className="text-white text-lg font-medium leading-relaxed prose prose-invert max-w-none" style={{ backgroundColor: 'transparent' }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-bg-deep pt-32">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-16 pb-24 overflow-hidden border-b border-white/5">
                <div className="container relative z-10 text-center">
                    <div className="text-primary-copper font-black text-[10px] tracking-[0.4em] uppercase mb-6 uppercase">Data Security</div>
                    <h1 className="text-5xl md:text-8xl text-white mb-10 font-black italic uppercase tracking-tighter leading-tight">
                        Privacy <br />
                        <span className="text-gradient NOT-italic font-black text-primary-copper">Protocol.</span>
                    </h1>
                    <p className="text-xl text-text-secondary font-light max-w-4xl mx-auto leading-relaxed">
                        Last Updated: 31st December 2025. EA International is committed to protecting the privacy of all participants.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-40 bg-midnight-black relative">
                <div className="container">
                    <div className="max-w-5xl mx-auto p-4 md:p-10" style={{ backgroundColor: 'transparent', color: 'white' }}>
                        <PrivacySection title="1. Introduction" defaultOpen={true}>
                            <p>EA International ("we," "our," "us") is committed to protecting the privacy of all participants ("you," "your") of the Achievers Summit 2026. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you register for and participate in our Summit.</p>
                        </PrivacySection>

                        <PrivacySection title="2. Information We Collect">
                            <p>We collect information you provide directly to us:</p>
                            <ul className="space-y-4 mt-6">
                                <li><strong>Identity & Contact Data:</strong> Full name, email address, phone number, country of residence, affiliation (school/university/organization).</li>
                                <li><strong>Registration & Profile Data:</strong> Date of birth (for age verification), dietary preferences (if applicable), accessibility requirements, areas of interest.</li>
                                <li><strong>Transaction Data:</strong> Payment confirmation details (note: we do not store full credit card numbers; these are processed by secure third-party payment gateways).</li>
                                <li><strong>Technical & Usage Data:</strong> IP address, browser type, pages viewed, and interaction data via cookies and similar technologies.</li>
                            </ul>
                        </PrivacySection>

                        <PrivacySection title="3. How We Use Your Information">
                            <p>We use your personal data to:</p>
                            <ul className="space-y-4 mt-6">
                                <li>Process your registration and manage your participation.</li>
                                <li>Communicate with you about Summit details, updates, and logistics.</li>
                                <li>Ensure a safe, tailored, and inclusive event experience.</li>
                                <li>Analyze participation trends to improve future events.</li>
                                <li>Send post-event surveys and initiatives (you may opt-out at any time).</li>
                                <li>Comply with legal obligations.</li>
                            </ul>
                        </PrivacySection>

                        <PrivacySection title="4. Legal Basis for Processing">
                            <p>Our processing is based on:</p>
                            <ul className="space-y-4 mt-6">
                                <li><strong>Performance of a Contract:</strong> To fulfill your registration.</li>
                                <li><strong>Legitimate Interests:</strong> For event management, security, and improvement.</li>
                                <li><strong>Consent:</strong> For direct marketing communications, where applicable.</li>
                            </ul>
                        </PrivacySection>

                        <PrivacySection title="5. Sharing of Your Information">
                            <p>We may share your information with:</p>
                            <ul className="space-y-4 mt-6">
                                <li><strong>Service Providers:</strong> Trusted third parties who assist in operations (e.g., registration platform, payment processor).</li>
                                <li><strong>Partners/Sponsors:</strong> We may share a general attendee list (name, affiliation) with event partners. We will never sell your personal data.</li>
                                <li><strong>Legal Authorities:</strong> If required by law or to protect our rights and the safety of participants.</li>
                            </ul>
                        </PrivacySection>

                        <PrivacySection title="6. International Data Transfers">
                            <p>As an international summit, your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.</p>
                        </PrivacySection>

                        <PrivacySection title="7. Data Security">
                            <p>We implement reasonable technical and organizational measures to protect your data. However, no electronic transmission or storage is 100% secure.</p>
                        </PrivacySection>

                        <PrivacySection title="8. Your Rights & Choices">
                            <ul className="space-y-4">
                                <li>Access, correct, or delete your personal data.</li>
                                <li>Restrict or object to our processing.</li>
                                <li>Data portability.</li>
                                <li>Withdraw consent (where processing is based on consent).</li>
                            </ul>
                        </PrivacySection>

                        <PrivacySection title="9. Data Retention">
                            <p>We retain your personal data for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Typically, this is for 36 months after the event.</p>
                        </PrivacySection>

                        <PrivacySection title="10. Children's Privacy">
                            <p>The Summit is targeted at youth. If you are under the age of majority in your country, you confirm you have obtained consent from a parent or guardian to register and provide your data.</p>
                        </PrivacySection>

                        <PrivacySection title="11. Changes to This Policy">
                            <p>We may update this Privacy Policy. The updated version will be posted on the Summit website with a revised "Last Updated" date.</p>
                        </PrivacySection>

                        <PrivacySection title="12. Contact us">
                            <p>For any privacy-specific questions or to exercise your rights, please contact our Data Protection contact at: <a href="mailto:privacy@eainternational.net" className="text-primary-copper underline">privacy@eainternational.net</a> or <a href="mailto:contact@achieverssummit.com.ng" className="text-primary-copper underline">contact@achieverssummit.com.ng</a></p>
                        </PrivacySection>
                    </div>
                </div>
            </section>

            <Footer />
</main>
    );
}
