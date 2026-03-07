"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import {
    Zap, Target, Users, Rocket, Globe, Award,
    MessageSquare, GraduationCap, Star, Share2, ArrowRight
} from 'lucide-react';

export default function WhyAttendPage() {
    const benefits = [
        { title: "Transformational Knowledge", desc: "Learn directly from accomplished leaders, industry experts, policymakers, and innovators shaping Africa’s future.", icon: Zap },
        { title: "Leadership Development", desc: "Gain mindset-shifting insights, practical tools, and strategies that sharpen your leadership potential.", icon: Target },
        { title: "High-Impact Networking", desc: "Connect with a vibrant community of over 2,000 young leaders, mentors, entrepreneurs, and investors.", icon: Users },
        { title: "Entrepreneurship & Innovation", desc: "Explore ideas, pitch solutions, meet investors, and learn how to build sustainable ventures.", icon: Rocket },
        { title: "Global Conversations", desc: "Engage in discussions on leadership, governance, technology, and policy at global levels.", icon: Globe },
        { title: "100Under40 Awards", desc: "Witness the recognition of outstanding young leaders across Africa and be inspired to elevate your impact.", icon: Award },
        { title: "Policymaker Access", desc: "Participate in sessions featuring government officials and corporate executives influencing national change.", icon: MessageSquare },
        { title: "Career Development", desc: "Gain access to trainings, development tracks, and professional pathways introduced during the Summit.", icon: GraduationCap },
        { title: "Premium Exclusives", desc: "Access VIP deal rooms, mentoring circles, high-level receptions, and special networking with global guests.", icon: Star },
        { title: "Join the Movement", desc: "Be part of a new wave of African youth committed to shaping the future and driving positive change.", icon: Share2 },
    ];

    return (
        <main className="min-h-screen bg-surface">
            <Navbar variant="light" />

            <PageHero
                label="Value proposition"
                heading={<>Why you should<br />attend.</>}
                subtitle="Whether you are a student, emerging leader, young professional, entrepreneur, or policymaker — the Achievers Summit offers unmatched value."
                image="/images/past-edition/img_1612.jpeg"
                imageAlt="Summit networking session"
            />

            <section className="section bg-surface">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
                    <p className="section-label">10 reasons to attend</p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-14 max-w-2xl">Every reason you need to be there</h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {benefits.map((b, i) => (
                            <div key={i} className="flex gap-4 p-5 rounded-xl hover:bg-surface-alt transition-colors">
                                <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand shrink-0">
                                    <b.icon size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-text mb-1">{b.title}</h4>
                                    <p className="text-sm text-text-secondary leading-relaxed">{b.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-surface-alt">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-16 text-center">
                    <div className="rounded-2xl bg-brand-50 border border-brand-100 p-12 lg:p-16">
                        <h3 className="text-2xl md:text-3xl font-bold text-text mb-4">Ready to join the new wave?</h3>
                        <p className="text-text-secondary mb-8 max-w-lg mx-auto">Join over 2,000 visionary leaders committed to redefining the African narrative. Secure your spot today.</p>
                        <a href="/tickets" className="btn bg-brand text-white hover:bg-brand-dark border-brand hover:border-brand-dark">
                            Reserve your seat <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
