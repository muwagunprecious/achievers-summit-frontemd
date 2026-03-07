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
import ProgramDetails from '../components/ProgramDetails';
import FAQ from '../components/FAQ';

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

      {/* <BoldMinds /> */}

      <AboutSummit />

      <ProgramDetails />

      {/* Impact at a Glance */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-16 text-left border-l-4 border-primary-copper pl-6">
            <h2 className="text-3xl font-extrabold text-text-primary tracking-tight mb-2 uppercase">
              Impact at a Glance
            </h2>
            <p className="text-text-muted text-lg font-medium max-w-2xl leading-relaxed">
              Measuring the scale and global reach of the Achievers Summit 2026. Data verified by Emmanuel Agida International.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { value: '5,000+', label: 'Physical Attendees' },
              { value: '25,000+', label: 'Virtual Audience' },
              { value: '200+', label: 'International Delegates' },
              { value: '50+', label: 'Exhibitors' },
              { value: '20+', label: 'Countries Represented' },
              { value: '20+', label: 'Global Speakers' },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 p-10 rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex flex-col">
                  <span className="text-5xl font-extrabold text-text-primary mb-3 tracking-tighter">
                    {stat.value}
                  </span>
                  <span className="text-text-muted text-sm font-semibold uppercase tracking-widest">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-right">
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.2em]">
              Projected Statistics © 2026 Achievers Summit
            </p>
          </div>
        </div>
      </section>

      <Speakers />

      <ExhibitionStand />

      <Tickets onBuy={handleBuy} />

      <FAQ />

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
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(24px);
            border: 1px solid rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </main>
  );
}
