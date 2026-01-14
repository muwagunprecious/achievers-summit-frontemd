"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ExhibitionStand from '../components/ExhibitionStand';
import Tickets from '../components/Tickets';
import Footer from '../components/Footer';

const CheckoutModal = dynamic(() => import('../components/CheckoutModal'), { ssr: false });

export default function Home() {
  const router = useRouter();
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleBuy = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleComplete = (ticketData) => {
    router.push(`/ticket-confirmation?id=${ticketData.ticketId}`);
  };

  return (
    <main className="min-h-screen bg-bg-deep">
      <Navbar isHidden={!!selectedTicket} />

      <section id="home">
        <Hero />
      </section>

      {/* Stats Section - Premium Redesign */}
      <section className="bg-midnight-black py-40 relative overflow-hidden">
        <div className="motif-bg opacity-5"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Attendees', value: '2000+', desc: 'Across Africa' },
              { label: 'Delegates', value: '200+', desc: 'Leadership Tier' },
              { label: 'Exhibitors', value: '20+', desc: 'Global Entities' },
              { label: 'Faculty', value: '20+', desc: 'Keynote speakers' },
              { label: 'VIP Guests', value: '20%', desc: 'C-Suite Leaders' },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-white mb-4 group-hover:text-primary-copper transition-all duration-700 italic tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-primary-copper mb-2">{stat.label}</div>
                <div className="text-xs text-text-muted uppercase tracking-widest font-medium">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ExhibitionStand />

      <section id="tickets">
        <Tickets onBuy={handleBuy} />
      </section>

      <Footer />

      {selectedTicket && (
        <CheckoutModal
          isOpen={true}
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onComplete={handleComplete}
        />
      )}

      <style jsx>{`
        .bg-midnight-black { background-color: var(--midnight-black); }
        .text-primary-copper { color: var(--primary-copper); }
        .glass-panel {
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </main>
  );
}
