"use client";
import React from 'react';
import { Check, Loader2 } from 'lucide-react';

export default function Tickets({ onBuy }) {
    const [categories, setCategories] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [loadingTicketId, setLoadingTicketId] = React.useState(null);

    React.useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch('/api/tickets/categories');
                const data = await response.json();
                if (Array.isArray(data)) setCategories(data);
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
            <section id="tickets" className="section bg-surface-alt flex items-center justify-center min-h-[400px]">
                <div className="flex items-center gap-3 text-text-muted">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm">Loading tickets…</span>
                </div>
            </section>
        );
    }

    return (
        <section id="tickets" className="section bg-surface-alt">
            <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
                <p className="section-label">Tickets</p>

                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-4">
                            Choose your experience
                        </h2>
                        <p className="text-text-secondary text-lg leading-relaxed">
                            Every pass includes access to keynotes, exhibition, and networking. Upgrade for masterclasses, deal rooms, and the award dinner.
                        </p>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((ticket) => (
                        <PassCard
                            key={ticket.id}
                            ticket={ticket}
                            onBuy={onBuy}
                            loadingTicketId={loadingTicketId}
                            setLoadingTicketId={setLoadingTicketId}
                            highlight={ticket.name === 'BUSINESS CLASS'}
                            dark={ticket.name === 'EXCLUSIVE BIZJET PASS'}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function PassCard({ ticket, onBuy, loadingTicketId, setLoadingTicketId, highlight, dark }) {
    const [showAll, setShowAll] = React.useState(false);

    const active = ticket.isEnabled && ticket.status === 'ACTIVE';
    const slotsLeft = ticket.capacity - (ticket._count?.tickets || 0);
    const isLimited = slotsLeft <= 10 && slotsLeft > 0;

    const features = ticket.features || [];
    const visibleCount = 4;
    const hasMore = features.length > visibleCount;
    const displayed = showAll ? features : features.slice(0, visibleCount);

    const price = ticket.price === 0
        ? 'Free'
        : `₦${ticket.price.toLocaleString()}`;

    const displayName = ticket.name
        .replace(' PASS', '')
        .split(' ')
        .map(w => w.charAt(0) + w.slice(1).toLowerCase())
        .join(' ');

    return (
        <div
            className={`relative rounded-2xl p-7 flex flex-col transition-all duration-200
                ${dark
                    ? 'bg-neutral-900 text-white'
                    : highlight
                        ? 'bg-white border-2 border-brand ring-1 ring-brand/10'
                        : 'bg-white border border-border'
                }
                ${!active ? 'opacity-50 pointer-events-none' : 'hover:-translate-y-0.5 hover:shadow-lg'}
            `}
        >
            {/* Sold out overlay */}
            {!active && (
                <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-white/60 backdrop-blur-sm">
                    <span className="px-4 py-1.5 bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-full -rotate-3">
                        Closed
                    </span>
                </div>
            )}

            {/* Top badges */}
            <div className="flex items-center gap-2 mb-5">
                {highlight && active && (
                    <span className="badge bg-brand text-white border-brand text-[11px]">Popular</span>
                )}
                {isLimited && active && (
                    <span className="badge bg-amber-50 text-amber-700 border-amber-200 text-[11px]">
                        {slotsLeft} left
                    </span>
                )}
            </div>

            {/* Name & price */}
            <h3 className={`text-lg font-semibold mb-1 ${dark ? 'text-white' : 'text-text'}`}>
                {displayName}
            </h3>
            <div className={`text-3xl font-bold tracking-tight mb-1 ${dark ? 'text-white' : 'text-text'}`}>
                {price}
            </div>
            {ticket.description && (
                <p className={`text-xs mb-6 ${dark ? 'text-white/50' : 'text-text-muted'}`}>
                    {ticket.description}
                </p>
            )}

            {/* Features */}
            <ul className="space-y-2.5 mb-8 flex-grow">
                {displayed.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                        <Check
                            size={15}
                            strokeWidth={2.5}
                            className={`mt-0.5 shrink-0 ${dark ? 'text-brand-light' : 'text-brand'}`}
                        />
                        <span className={`text-sm ${dark ? 'text-white/70' : 'text-text-secondary'}`}>{f}</span>
                    </li>
                ))}
            </ul>
            {hasMore && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className={`mb-6 text-xs font-medium underline underline-offset-2 ${
                        dark ? 'text-white/50 hover:text-white' : 'text-brand hover:text-brand-dark'
                    }`}
                >
                    {showAll ? 'Show less' : `+${features.length - visibleCount} more`}
                </button>
            )}

            {/* CTA */}
            <button
                onClick={async () => {
                    if (active) {
                        setLoadingTicketId(ticket.id);
                        await onBuy(ticket);
                        setLoadingTicketId(null);
                    }
                }}
                disabled={!active || loadingTicketId === ticket.id}
                className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                    ${dark
                        ? 'bg-white text-neutral-900 hover:bg-neutral-100'
                        : highlight
                            ? 'bg-brand text-white hover:bg-brand-dark'
                            : 'bg-surface-raised text-text hover:bg-brand hover:text-white'
                    }
                `}
            >
                {loadingTicketId === ticket.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    ticket.price === 0 ? 'Register free' : `Buy — ${price}`
                )}
            </button>
        </div>
    );
}
