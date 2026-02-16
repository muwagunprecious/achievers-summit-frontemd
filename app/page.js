"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BoldMinds from '../components/BoldMinds';
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

      <BoldMinds />

      <AboutSummit />

      {/* Stats Section - Premium Redesign */}
      <section className="bg-midnight-black pt-20 pb-32 relative overflow-hidden border-none -mt-[1px]" style={{ paddingTop: '80px' }}>
        <div className="motif-bg opacity-5"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-32 mb-20">
            {[
              { label: 'Physical', value: '5000+', desc: 'Attendees' },
              { label: 'Virtual', value: '25000+', desc: 'Audience' },
              { label: 'International', value: '200+', desc: 'Delegates' },
              { label: 'Exhibitors', value: '50+', desc: 'Global Presence' },
              { label: 'Countries', value: '20+', desc: 'Representation' },
              { label: 'Global', value: '20+', desc: 'Speakers' },
              { label: 'VIP Guest', value: '20%', desc: '& Influencers' },
            ].map((stat, i) => (
              <div key={i} className="text-center group py-10">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-primary-copper transition-all duration-700 italic tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-black uppercase tracking-widest text-primary-copper mb-1 leading-tight">{stat.label}</div>
                <div className="text-[10px] md:text-xs text-text-muted uppercase tracking-widest font-medium leading-tight">{stat.desc}</div>
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
