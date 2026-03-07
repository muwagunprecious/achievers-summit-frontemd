"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import Speakers from '../../components/Speakers';

export default function FacultyPage() {
    return (
        <main className="min-h-screen bg-surface">
            <Navbar variant="light" />

            <PageHero
                label="The faculty"
                heading={<>World-class<br />visionaries.</>}
                subtitle="A convergence of industry titans, policymakers, and pioneers shaping the global African narrative."
                image="/images/past-edition/img_9356.jpg"
                imageAlt="Summit speakers"
            />

            <section className="section bg-surface">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
                    <Speakers />
                </div>
            </section>

            <Footer />
        </main>
    );
}
