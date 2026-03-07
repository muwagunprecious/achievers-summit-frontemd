"use client";
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Home, Share2, ShieldCheck, MapPin, Calendar, Fingerprint } from 'lucide-react';

export default function TicketResult({ ticketData, onBack }) {
    if (!ticketData) return null;

    const handleDownload = () => {
        alert('Digital Pass Encrypted & Downloaded successfully!');
    };

    return (
        <div className="section bg-white min-h-screen flex flex-col items-center justify-center py-24 px-6 relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-copper/5 rounded-full blur-[180px]"></div>
                <div className="absolute inset-0 motif-bg opacity-5"></div>
            </div>

            <div className="text-center mb-20 animate-fade-in relative z-10">
                <div className="w-20 h-20 glass-panel flex items-center justify-center text-primary-copper mx-auto mb-8 shadow-2xl border border-black/5 animate-float">
                    <ShieldCheck size={40} strokeWidth={2} />
                </div>
                <h2 className="text-5xl md:text-7xl font-black mb-4 italic tracking-tighter">Pass <span className="text-gradient NOT-italic">Authenticated.</span></h2>
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-primary-copper/30 bg-primary-copper/5">
                    <Fingerprint size={14} className="text-primary-copper" />
                    <span className="text-primary-copper font-black uppercase tracking-[0.4em] text-[10px]">Official Digital Asset</span>
                </div>
            </div>

            <div className="ticket-card relative z-10 w-full max-w-2xl animate-fade-in">
                {/* Main Ticket Surface */}
                <div className="relative bg-[#F8F6F4] rounded-xs overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.08)] flex flex-col border border-black/5">

                    {/* Top Panel */}
                    <div className="bg-[#F0EBE6] p-12 relative overflow-hidden border-b border-black/5">
                        <div className="absolute inset-0 motif-bg opacity-10"></div>
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-primary-copper rounded-xs flex items-center justify-center font-black italic text-lg shadow-lg shadow-primary-copper/30 text-white">A</div>
                                    <span className="text-2xl font-black tracking-tighter uppercase">ACHIEVERS <span className="text-primary-copper">.</span></span>
                                </div>
                                <h3 className="text-4xl font-black italic tracking-widest">{ticketData.ticketType}</h3>
                            </div>
                            <div className="text-right">
                                <div className="glass-panel px-5 py-2.5 rounded-xs text-[10px] font-black uppercase tracking-[0.3em] border border-black/5 text-text-muted">
                                    Africa Edition 2026
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Panel */}
                    <div className="p-12 flex flex-col md:flex-row gap-16 items-center bg-[#F8F6F4]">
                        <div className="flex-grow w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                                <div>
                                    <p className="text-[10px] uppercase font-black text-text-muted tracking-[0.4em] mb-3">Delegate Name</p>
                                    <p className="text-3xl font-black uppercase italic tracking-tighter">{ticketData.fullName}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-black text-text-muted tracking-[0.4em] mb-3">Verification ID</p>
                                    <p className="text-2xl font-mono font-black text-primary-copper">{ticketData.ticketId}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-black text-text-muted tracking-[0.4em] mb-3">Pass Value</p>
                                    <p className="text-xl font-black italic tracking-tighter">
                                        {ticketData.ticketPrice === "0" ? 'Complimentary' : `₦${Number(ticketData.ticketPrice).toLocaleString()}`}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-10 mb-12 border-t border-black/5 pt-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 glass-panel flex items-center justify-center text-primary-copper rounded-xs">
                                        <Calendar size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] uppercase font-black text-text-muted tracking-[0.3em]">Timeline</p>
                                        <p className="text-sm font-bold uppercase tracking-widest">Mar 31 — Apr 01</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 glass-panel flex items-center justify-center text-primary-copper rounded-xs">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] uppercase font-black text-text-muted tracking-[0.3em]">Location</p>
                                        <p className="text-sm font-bold uppercase tracking-widest">Lagos, NI</p>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-panel p-6 rounded-xs border border-black/5 bg-white/60">
                                <p className="text-[10px] text-text-muted leading-relaxed font-bold uppercase tracking-widest">
                                    Pass grants full access to {ticketData.ticketType} protocols. Present encrypted QR at terminal ALPHA-1 for entry.
                                </p>
                            </div>
                        </div>

                        {/* QR Segment */}
                        <div className="flex-shrink-0 flex flex-col items-center">
                            <div className="p-8 bg-white rounded-xs shadow-2xl transition-all hover:scale-105">
                                <QRCodeSVG
                                    value={`auth_token:${ticketData.ticketId}`}
                                    size={150}
                                    level={"H"}
                                    includeMargin={false}
                                    fgColor="#1A1A1A"
                                />
                            </div>
                            <p className="mt-6 text-[9px] font-black uppercase tracking-[0.5em] text-text-muted opacity-50">Secure Auth Protocol</p>
                        </div>
                    </div>

                    <div className="bg-[#F0EBE6] py-5 text-center text-[10px] font-black uppercase tracking-[0.6em] text-text-muted/30 border-t border-black/5">
                        Verified Institutional Asset © 2026 Achievers
                    </div>
                </div>

                {/* Decorative Side Notches */}
                <div className="absolute top-[180px] -left-6 w-12 h-12 bg-white rounded-full border-r border-black/5"></div>
                <div className="absolute top-[180px] -right-6 w-12 h-12 bg-white rounded-full border-l border-black/5"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-16 relative z-10">
                <button onClick={handleDownload} className="btn btn-outline">
                    <Download size={18} />
                    Download Pass
                </button>
                <button className="btn btn-outline">
                    <Share2 size={18} />
                    Share
                </button>
                <button onClick={onBack} className="btn btn-primary">
                    <Home size={18} />
                    Back to Home
                </button>
            </div>

            <style jsx>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    border-radius: 40px;
                }
                .text-primary-copper { color: var(--primary-copper); }
            `}</style>
        </div>
    );
}
