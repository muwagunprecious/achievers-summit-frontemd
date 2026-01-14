"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navbar from '../../components/Navbar';
import Tickets from '../../components/Tickets';
import Footer from '../../components/Footer';

const CheckoutModal = dynamic(() => import('../../components/CheckoutModal'), { ssr: false });

export default function TicketsPage() {
    const router = useRouter();
    const [selectedTicket, setSelectedTicket] = useState(null);

    const handleBuy = (ticket) => {
        setSelectedTicket(ticket);
    };

    const handleComplete = (ticketData) => {
        router.push(`/ticket-confirmation?id=${ticketData.ticketId}`);
    };

    return (
        <main className="min-h-screen bg-bg-deep pt-40">
            <Navbar isHidden={!!selectedTicket} />
            <div className="py-20">
                <Tickets onBuy={handleBuy} />
            </div>

            {selectedTicket && (
                <CheckoutModal
                    isOpen={true}
                    ticket={selectedTicket}
                    onClose={() => setSelectedTicket(null)}
                    onComplete={handleComplete}
                />
            )}
            <Footer />
        </main>
    );
}
