"use client";
import React from 'react';
import Navbar from '../../components/Navbar';
import FindTicket from '../../components/FindTicket';
import Footer from '../../components/Footer';

export default function FindTicketPage() {
    return (
        <main className="min-h-screen bg-bg-deep pt-40">
            <Navbar />
            <div className="container py-20 flex flex-col justify-center">
                <FindTicket />
            </div>
            <Footer />
        </main>
    );
}
