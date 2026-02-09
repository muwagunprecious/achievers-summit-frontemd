"use client";
import React from 'react';
import { Check, Sparkle, Zap, Crown, Rocket, Star, Loader2 } from 'lucide-react';

const iconMap = {
    'REGULAR PASS': <Sparkle size={20} />,
    'ECONOMY PASS': <Rocket size={20} />,
    'BUSINESS CLASS PASS': <Zap size={20} />,
    'FIRST CLASS PASS': <Crown size={20} />,
    'EXCLUSIVE BIZJET PASS': <Star size={20} />,
};

const defaultIcon = <Sparkle size={20} />;

export default function Tickets({ onBuy }) {
    const [categories, setCategories] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [loadingTicketId, setLoadingTicketId] = React.useState(null);

    React.useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch('/api/tickets/categories');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setCategories(data);
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCategories();
    }, []);

    if (isLoading) {
        return (
            <section id="tickets" className="section bg-bg-deep flex items-center justify-center min-h-[400px]">
                <div className="text-white font-black tracking-widest animate-pulse">LOADING EXPERIENCES...</div>
            </section>
        );
    }

    return (
        <section id="tickets" className="pb-32 bg-bg-deep relative overflow-hidden" style={{ paddingTop: '90px' }}>
            <div className="container">
                <div className="text-center mb-24 max-w-4xl mx-auto">
                    <div className="text-primary-copper font-black text-xs tracking-widest uppercase mb-4">Registration Open</div>
                    <h2 className="text-5xl md:text-8xl text-white mb-8 italic">Get Your <span className="text-gradient font-black NOT-italic">Official Pass.</span></h2>
                    <p className="text-xl text-text-secondary font-light">
                        Get Your Ticket Now - 3,000 Free Regular Tickets and 2,000 Paid Executive Passes Available. Select your preferred experience Level and secure your seat instantly. Each pass is issued as a digital PDF delivered to your email.
                    </p>
                </div>

                {/* Top Row: 2 Tickets (Centered) */}
                {/* Top Row: 2 Tickets (Centered) */}
                <div className="flex flex-col md:flex-row justify-center items-stretch mb-10" style={{ gap: '120px' }}>
                    {categories.slice(0, 2).map((ticket) => (
                        <div key={ticket.id} className="w-full flex-shrink-0" style={{ maxWidth: '400px' }}>
                            <TicketCard
                                ticket={ticket}
                                onBuy={onBuy}
                                loadingTicketId={loadingTicketId}
                                setLoadingTicketId={setLoadingTicketId}
                            />
                        </div>
                    ))}
                </div>

                {/* Bottom Row: 3 Tickets */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
                    {categories.slice(2).map((ticket) => (
                        <TicketCard
                            key={ticket.id}
                            ticket={ticket}
                            onBuy={onBuy}
                            loadingTicketId={loadingTicketId}
                            setLoadingTicketId={setLoadingTicketId}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function TicketCard({ ticket, onBuy, loadingTicketId, setLoadingTicketId }) {
    const [showAll, setShowAll] = React.useState(false);

    const active = ticket.isEnabled && ticket.status === 'ACTIVE';
    const isPopular = ticket.name.includes('BUSINESS');
    const isLimited = ticket.name.includes('BIZJET');
    const slotsLeft = ticket.capacity - (ticket._count?.tickets || 0);
    const features = ticket.features || [];
    const hasMoreFeatures = features.length > 4;
    const displayedFeatures = showAll ? features : features.slice(0, 4);

    return (
        <div
            className={`group relative glass-panel p-10 flex flex-col h-full transition-all duration-700 border border-white/5 ${active ? 'hover:border-primary-copper/30' : 'opacity-40 grayscale'} ${isPopular && active ? 'shadow-2xl shadow-primary-copper/10' : ''}`}
            style={{ background: isPopular && active ? 'rgba(161, 136, 127, 0.03)' : 'rgba(255, 255, 255, 0.02)' }}
        >
            {!active && (
                <div className="absolute inset-0 z-20 flex items-center justify-center p-6 bg-midnight-black/40 backdrop-blur-md rounded-[40px]">
                    <div className="px-6 py-3 bg-red-500 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-2xl transform -rotate-12">
                        Category Closed
                    </div>
                </div>
            )}

            {isPopular && active && (
                <div className="absolute top-8 right-8 text-primary-copper animate-pulse">
                    <Sparkle size={20} strokeWidth={3} />
                </div>
            )}



            <div className="mb-12">
                <div className="w-14 h-14 glass-panel flex items-center justify-center text-primary-copper mb-8 group-hover:bg-primary-copper group-hover:text-white transition-all duration-500 rounded-2xl">
                    {iconMap[ticket.name] || defaultIcon}
                </div>
                <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-1">
                    {ticket.name.replace(' PASS', '')} <span className="text-primary-copper NOT-italic text-xs tracking-widest ml-2">PASS</span>
                </h3>
                {ticket.description && (
                    <div className={`text-xs font-bold uppercase tracking-widest mb-4 ${ticket.description.includes('Limited') ? 'text-primary-copper animate-pulse' : 'text-text-muted'}`}>
                        {ticket.description}
                    </div>
                )}
                {active && (
                    <div className="inline-block px-4 py-1.5 bg-primary-copper/10 border border-primary-copper/30 rounded-full mt-2">
                        <span className="text-lg font-black text-white tracking-widest">
                            {ticket.price === 0 ? 'COMPLIMENTARY' : `₦${ticket.price.toLocaleString()}`}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex-grow flex flex-col justify-between">
                <div className="mb-8">
                    <ul className="space-y-4">
                        {displayedFeatures.map((feature, idx) => (
                            <li key={idx} className="flex gap-4 items-start group/item">
                                <div className="flex-shrink-0 w-5 h-5 bg-primary-copper/10 rounded-full flex items-center justify-center border border-primary-copper/20 group-hover/item:bg-primary-copper group-hover/item:text-white transition-all duration-300">
                                    <Check size={10} className="text-primary-copper group-hover/item:text-white" strokeWidth={4} />
                                </div>
                                <span className="text-sm font-medium text-text-secondary group-hover/item:text-white transition-colors tracking-tight leading-relaxed">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    {hasMoreFeatures && (
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="text-primary-copper text-[10px] font-black uppercase tracking-widest mt-6 hover:underline flex items-center gap-2"
                        >
                            {showAll ? 'Show Less' : 'Read More Features'}
                        </button>
                    )}
                </div>

                <div className="mt-auto pt-6">
                    <button
                        onClick={async () => {
                            if (active) {
                                setLoadingTicketId(ticket.id);
                                await onBuy(ticket);
                                setLoadingTicketId(null);
                            }
                        }}
                        disabled={!active || loadingTicketId === ticket.id}
                        className={`btn w-full py-4 transition-all duration-500 flex items-center justify-center gap-3 ${isPopular && active ? 'btn-primary shadow-lg shadow-primary-copper/20' : 'btn-outline border-white/10 hover:border-white disabled:opacity-50 disabled:cursor-not-allowed'}`}
                    >
                        {loadingTicketId === ticket.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <span className="tracking-widest">{active ? 'GET MY TICKET' : 'Locked'}</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

