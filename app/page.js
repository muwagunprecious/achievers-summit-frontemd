"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ExhibitionStand from '../components/ExhibitionStand';
import Tickets from '../components/Tickets';
import Footer from '../components/Footer';
import Speakers from '../components/Speakers';
import FindTicket from '../components/FindTicket';
import AboutSummit from '../components/AboutSummit';

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
    <main className="min-h-screen bg-bg-deep" suppressHydrationWarning>
      <Navbar isHidden={!!selectedTicket} />

      <section id="home">
        <Hero />
      </section>

      <AboutSummit />

      {/* Stats Section - Premium Redesign */}
      <section className="bg-midnight-black pt-32 pb-96 mb-10 relative overflow-hidden">
        <div className="motif-bg opacity-5"></div>
        <div className="container relative z-10">
          <div className="flex flex-row flex-nowrap justify-between items-start gap-4 md:gap-8 overflow-x-auto hide-scrollbar mb-20">
            {[
              { label: 'Attendees', value: '2000+', desc: 'Across Africa' },
              { label: 'Delegates', value: '200+', desc: 'Leadership Tier' },
              { label: 'Exhibitors', value: '20+', desc: 'Global Entities' },
              { label: 'Faculty', value: '20+', desc: 'Keynote speakers' },
              { label: 'VIP Guests', value: '20%', desc: 'C-Suite Leaders' },
            ].map((stat, i) => (
              <div key={i} className="text-center group flex-1 min-w-[120px]">
                <div className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-2 group-hover:text-primary-copper transition-all duration-700 italic tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-black uppercase tracking-widest text-primary-copper mb-1">{stat.label}</div>
                <div className="text-xs md:text-sm text-text-muted uppercase tracking-widest font-medium leading-tight">{stat.desc}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <a
              href="#tickets"
              className="px-12 py-5 bg-white text-black font-black text-xs uppercase tracking-[0.3em] rounded-full hover:bg-primary-copper hover:text-white transition-all duration-500 shadow-2xl shadow-primary-copper/20 group"
            >
              Get Your Pass
            </a>
          </div>
        </div>
      </section>

      <Speakers />

      <ExhibitionStand />

      <section id="tickets">
        <Tickets onBuy={handleBuy} />
      </section>

      <section id="find-pass">
        <FindTicket />
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
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .glass-panel {
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </main>
  );
}
