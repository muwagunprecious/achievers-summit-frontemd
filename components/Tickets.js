"use client";
import React from 'react';
import { Check, Star, Crown, Rocket, Zap, Loader2, Gem } from 'lucide-react';

const tierConfig = {
    'REGULAR': {
        icon: <Star size={24} />,
        style: 'standard',
    },
    'ECONOMY': {
        icon: <Rocket size={24} />,
        style: 'standard',
    },
    'BUSINESS CLASS': {
        icon: <Zap size={24} />,
        style: 'recommended',
    },
    'FIRST CLASS PASS': {
        icon: <Crown size={24} />,
        style: 'standard',
    },
    'EXCLUSIVE BIZJET PASS': {
        icon: <Gem size={24} />,
        style: 'premium',
    },
};

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
            <section id="tickets" className="py-24 bg-[#F8F6F4] flex items-center justify-center min-h-[400px]">
                <div className="flex items-center gap-3 text-text-muted">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm font-medium tracking-wide">Loading passes...</span>
                </div>
            </section>
        );
    }

    const topRow = categories.slice(0, 3);
    const bottomRow = categories.slice(3);

    return (
        <section id="tickets" className="py-24 lg:py-32 bg-[#F8F6F4] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-4">
                        Select your pass
                    </h2>
                    <p className="text-text-muted text-lg max-w-2xl">
                        Join us in redefining the African narrative. Secure your spot to connect, learn, and grow with over 5,000 leaders.
                    </p>
                </div>

                {/* Cards Container */}
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 md:p-10 lg:p-12">

                    {/* Top Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {topRow.map((ticket) => (
                            <PassCard
                                key={ticket.id}
                                ticket={ticket}
                                onBuy={onBuy}
                                loadingTicketId={loadingTicketId}
                                setLoadingTicketId={setLoadingTicketId}
                            />
                        ))}
                    </div>

                    {/* Bottom Row */}
                    {bottomRow.length > 0 && (
                        <div className={`grid grid-cols-1 gap-6 lg:gap-8 mt-6 lg:mt-8 ${bottomRow.length === 2 ? 'md:grid-cols-2' : bottomRow.length === 1 ? 'md:grid-cols-1 max-w-md mx-auto' : 'md:grid-cols-3'}`}>
                            {bottomRow.map((ticket) => (
                                <PassCard
                                    key={ticket.id}
                                    ticket={ticket}
                                    onBuy={onBuy}
                                    loadingTicketId={loadingTicketId}
                                    setLoadingTicketId={setLoadingTicketId}
                                />
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}

function PassCard({ ticket, onBuy, loadingTicketId, setLoadingTicketId }) {
    const [showAll, setShowAll] = React.useState(false);

    const active = ticket.isEnabled && ticket.status === 'ACTIVE';
    const config = tierConfig[ticket.name] || { icon: <Star size={24} />, style: 'standard' };
    const isPremium = config.style === 'premium';
    const isRecommended = config.style === 'recommended';
    const slotsLeft = ticket.capacity - (ticket._count?.tickets || 0);
    const isLimited = slotsLeft <= 10 && slotsLeft > 0;

    const features = ticket.features || [];
    const visibleCount = 4;
    const hasMore = features.length > visibleCount;
    const displayedFeatures = showAll ? features : features.slice(0, visibleCount);

    const priceLabel = ticket.price === 0
        ? 'Free'
        : `₦${ticket.price.toLocaleString()}`;

    const displayName = ticket.name
        .replace(' PASS', '')
        .split(' ')
        .map(w => w.charAt(0) + w.slice(1).toLowerCase())
        .join(' ');

    return (
        <div
            className={`rounded-2xl p-8 flex flex-col transition-all duration-300 relative
                ${isPremium
                    ? 'bg-primary-copper text-white shadow-2xl shadow-primary-copper/30 hover:-translate-y-1'
                    : isRecommended
                        ? 'bg-white border-2 border-primary-copper/20 hover:border-primary-copper shadow-sm hover:shadow-xl hover:shadow-primary-copper/10 hover:-translate-y-1'
                        : 'bg-gray-50 hover:-translate-y-1'
                }
                ${!active ? 'opacity-50 grayscale pointer-events-none' : ''}`
            }
        >
            {/* Sold Out / Closed overlay */}
            {!active && (
                <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-white/60 backdrop-blur-sm">
                    <span className="px-5 py-2 bg-red-500 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg -rotate-6">
                        Closed
                    </span>
                </div>
            )}

            {/* Recommended badge */}
            {isRecommended && active && (
                <div className="absolute -top-3.5 right-8 bg-primary-copper text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Recommended
                </div>
            )}

            {/* Limited badge */}
            {isPremium && active && isLimited && (
                <div className="absolute -top-3.5 right-8 bg-secondary-gold text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Only {slotsLeft} left
                </div>
            )}

            {/* Icon */}
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-8 ${
                isPremium
                    ? 'bg-white/10 border border-white/10 backdrop-blur-sm text-white'
                    : isRecommended
                        ? 'bg-gray-50 border border-gray-100 text-primary-copper'
                        : 'bg-white shadow-sm text-primary-copper'
            }`}>
                {config.icon}
            </div>

            {/* Title */}
            <div className="mb-6">
                <h3 className={`text-2xl md:text-3xl font-bold mb-1 leading-tight ${isPremium ? 'text-white' : 'text-text-primary'}`}>
                    {displayName}<br />
                    <span className={`text-lg font-normal ${isPremium ? 'text-white/70' : 'text-text-muted'}`}>Pass</span>
                </h3>
                {ticket.description && (
                    <p className={`text-xs mt-2 font-medium ${isPremium ? 'text-white/60' : 'text-text-muted'}`}>
                        {ticket.description}
                    </p>
                )}
            </div>

            {/* Features */}
            <div className={`text-sm leading-relaxed mb-8 flex-grow ${isPremium ? 'text-white/80' : 'text-text-secondary'}`}>
                <ul className="space-y-3">
                    {displayedFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                            <Check
                                size={16}
                                strokeWidth={2.5}
                                className={`mt-0.5 shrink-0 ${
                                    isPremium ? 'text-white/90' : 'text-primary-copper'
                                }`}
                            />
                            <span className={idx === 0 && isRecommended ? 'font-medium text-text-primary' : ''}>
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>
                {hasMore && (
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className={`mt-4 text-xs font-semibold underline underline-offset-2 ${
                            isPremium ? 'text-white/70 hover:text-white' : 'text-primary-copper hover:text-primary-copper-dark'
                        } transition-colors`}
                    >
                        {showAll ? 'Show less' : `+${features.length - visibleCount} more benefits`}
                    </button>
                )}
            </div>

            {/* CTA Button */}
            <div className="mt-auto pt-2">
                <button
                    onClick={async () => {
                        if (active) {
                            setLoadingTicketId(ticket.id);
                            await onBuy(ticket);
                            setLoadingTicketId(null);
                        }
                    }}
                    disabled={!active || loadingTicketId === ticket.id}
                    className={`w-full font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 ${
                        isPremium
                            ? 'bg-white hover:bg-gray-50 text-primary-copper font-bold shadow-lg'
                            : 'bg-primary-copper hover:bg-primary-copper-dark text-white shadow-lg shadow-primary-copper/20'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {loadingTicketId === ticket.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <>
                            {ticket.price === 0 ? 'Select for Free' : `Buy for ${priceLabel}`}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
