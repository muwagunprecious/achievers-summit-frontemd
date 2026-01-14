"use client";
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Speakers from '../../components/Speakers';
import Footer from '../../components/Footer';

export default function FacultyPage() {
    return (
        <main className="min-h-screen bg-bg-deep pt-40">
            <Navbar />
            <div className="container py-20">
                <div className="text-center mb-24">
                    <div className="text-primary-copper font-black text-xs tracking-widest uppercase mb-4">The Faculty</div>
                    <h1 className="text-5xl md:text-7xl text-white mb-8 italic">World Class <span className="text-gradient font-black NOT-italic">Visionaries.</span></h1>
                    <p className="text-xl text-text-secondary font-light max-w-3xl mx-auto">
                        A convergence of industry titans, policy makers, and pioneers shaping the global African narrative.
                    </p>
                </div>
                <Speakers />
            </div>
            <Footer />
        </main>
    );
}
