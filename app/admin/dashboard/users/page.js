import React from 'react';
import { Search, Download, Filter, Mail, User, Ticket as TicketIcon, Calendar } from 'lucide-react';
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

async function getDelegates() {
    try {
        const [normalTickets, eventTickets] = await Promise.all([
            prisma.ticket.findMany({
                include: {
                    user: true,
                    category: true
                },
                orderBy: { purchaseDate: 'desc' }
            }),
            prisma.eventTicket.findMany({
                orderBy: { purchaseDate: 'desc' }
            })
        ]);

        const mappedNormal = normalTickets.map(t => ({
            id: t.ticketNumber,
            name: t.user.name,
            email: t.user.email,
            ticket: t.category.name,
            date: new Date(t.purchaseDate).toLocaleDateString(),
            rawDate: t.purchaseDate
        }));

        const mappedEvent = eventTickets.map(t => ({
            id: t.ticketId,
            name: t.fullName,
            email: t.email,
            ticket: t.ticketType,
            date: new Date(t.purchaseDate).toLocaleDateString(),
            rawDate: t.purchaseDate
        }));

        return [...mappedNormal, ...mappedEvent].sort((a, b) =>
            new Date(b.rawDate) - new Date(a.rawDate)
        );
    } catch (error) {
        console.error("Failed to fetch delegates:", error);
        return [];
    }
}

export default async function DelegateManagement() {
    const delegates = await getDelegates();

    return (
        <div className="space-y-10 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div>
                    <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-2">DELEGATE <span className="text-gradient NOT-italic">REGISTRY</span></h1>
                    <p className="text-text-muted text-sm font-bold uppercase tracking-[0.3em]">Authorized access to verified attendee data.</p>
                </div>
                <button
                    className="btn btn-outline flex items-center gap-3 !py-4 !px-8 !text-[10px] border-white/10 hover:border-primary-copper/50"
                >
                    <Download size={16} />
                    <span>EXPORT DATA PROTOCOL</span>
                </button>
            </div>

            {/* Controls - Note: Search/Filter would need client interaction or URL params for full functionality */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 relative group">
                    <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary-copper transition-colors" />
                    <input
                        type="text"
                        placeholder="SEARCH BY NAME OR EMAIL..."
                        className="w-full h-16 bg-white/5 border-2 border-white/5 focus:border-primary-copper/30 focus:bg-white/10 rounded-2xl pl-16 pr-6 outline-none text-white font-bold tracking-widest transition-all"
                    />
                </div>
                <div className="relative group">
                    <Filter size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary-copper transition-colors" />
                    <select
                        className="w-full h-16 bg-white/5 border-2 border-white/5 focus:border-primary-copper/30 focus:bg-white/10 rounded-2xl pl-16 pr-6 outline-none text-white font-black text-xs uppercase tracking-widest appearance-none cursor-pointer"
                        defaultValue="All"
                    >
                        <option value="All" className="bg-midnight-obsidian">ALL TIERS</option>
                        <option value="VIP PASS" className="bg-midnight-obsidian">VIP PASS</option>
                        <option value="EXECUTIVE TIER" className="bg-midnight-obsidian">EXECUTIVE TIER</option>
                        <option value="DELEGATE PASS" className="bg-midnight-obsidian">DELEGATE PASS</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="glass-panel rounded-[40px] border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/2">
                                <th className="px-10 py-6 text-[10px] font-black text-primary-copper uppercase tracking-[0.4em]">Delegate Entry</th>
                                <th className="px-10 py-6 text-[10px] font-black text-primary-copper uppercase tracking-[0.4em]">Authorized Email</th>
                                <th className="px-10 py-6 text-[10px] font-black text-primary-copper uppercase tracking-[0.4em]">Access Tier</th>
                                <th className="px-10 py-6 text-[10px] font-black text-primary-copper uppercase tracking-[0.4em]">Reg. Date</th>
                                <th className="px-10 py-6 text-[10px] font-black text-primary-copper uppercase tracking-[0.4em]">Protocol</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {delegates.length > 0 ? delegates.map((d, i) => (
                                <tr key={i} className="hover:bg-white/2 transition-colors group">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-text-muted group-hover:bg-primary-copper group-hover:text-white transition-all">
                                                <User size={18} />
                                            </div>
                                            <div>
                                                <p className="text-white font-black text-[13px] uppercase tracking-tight">{d.name}</p>
                                                <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">UID: {d.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-sm font-medium text-text-secondary">
                                        <div className="flex items-center gap-3">
                                            <Mail size={14} className="text-text-muted" />
                                            <span className="tracking-wide">{d.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/5">
                                            <TicketIcon size={12} className="text-primary-copper" />
                                            <span className="text-[9px] font-black text-white uppercase tracking-widest">{d.ticket}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-3 text-text-muted">
                                            <Calendar size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">{d.date}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <button className="text-[10px] font-black text-primary-copper uppercase tracking-[0.2em] hover:underline">View Pass</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="px-10 py-20 text-center text-text-muted font-bold uppercase tracking-widest opacity-50">
                                        NO DELEGATE RECORDS FOUND IN SECURE DATABASE.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
// Final syntax fix applied
