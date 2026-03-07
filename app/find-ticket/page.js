"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import FindTicket from '../../components/FindTicket';
import Footer from '../../components/Footer';

export default function FindTicketPage() {
    return (
        <main className="min-h-screen bg-surface pt-32">
            <Navbar variant="light" />
            <div className="max-w-[1200px] mx-auto px-6 lg:px-16 py-12 flex flex-col justify-center">
                <FindTicket />
            </div>
            <Footer />
        </main>
    );
}
