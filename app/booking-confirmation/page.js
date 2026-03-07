"use client";
import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Home, Share2, ShieldCheck, MapPin, Calendar, Fingerprint, Building2 } from 'lucide-react';

function BookingConfirmationContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const bookingId = searchParams.get('id');
    const orgName = searchParams.get('org');
    const standType = searchParams.get('type');
    const contactName = searchParams.get('contact');

    const handleBack = () => router.push('/');

    if (!bookingId) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center text-text-primary">
                <p>Loading booking details...</p>
            </div>
        );
    }

    return (
        <div className="section bg-white min-h-screen flex flex-col items-center justify-center py-24 px-6 relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-copper/5 rounded-full blur-[180px]"></div>
                <div className="absolute inset-0 motif-bg opacity-5"></div>
            </div>

            <div className="text-center mb-16 animate-fade-in relative z-10">
                <div className="w-20 h-20 glass-panel flex items-center justify-center text-primary-copper mx-auto mb-8 shadow-2xl border border-black/10 animate-float">
                    <Building2 size={40} strokeWidth={2} />
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-text-primary mb-4 italic tracking-tighter">Exhibition <span className="text-gradient NOT-italic">Confirmed.</span></h2>
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-primary-copper/30 bg-primary-copper/5">
                    <ShieldCheck size={14} className="text-primary-copper" />
                    <span className="text-primary-copper font-black uppercase tracking-[0.4em] text-[10px]">Space Reserved</span>
                </div>
            </div>

            <div className="ticket-card relative z-10 w-full max-w-2xl animate-fade-in">
                {/* Main Ticket Surface */}
                <div className="relative bg-[#F8F6F4] rounded-xs overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] flex flex-col border border-black/5">

                    {/* Top Panel */}
                    <div className="bg-[#F0EBE6] p-10 md:p-12 text-white relative overflow-hidden border-b border-black/5">
                        <div className="absolute inset-0 motif-bg opacity-10"></div>
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-primary-copper rounded-xs flex items-center justify-center font-black italic text-lg shadow-lg shadow-primary-copper/30">A</div>
                                    <span className="text-xl font-black tracking-tighter uppercase">ACHIEVERS <span className="text-primary-copper">.</span></span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-text-primary italic tracking-widest uppercase">{standType} CLASS</h3>
                            </div>
                            <div className="text-right">
                                <div className="glass-panel px-5 py-2.5 rounded-xs text-[10px] font-black uppercase tracking-[0.3em] border border-black/10 text-text-muted">
                                    Africa Edition 2026
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Panel */}
                    <div className="p-10 md:p-12 flex flex-col md:flex-row gap-12 items-center bg-[#F8F6F4]">
                        <div className="flex-grow w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                <div>
                                    <p className="text-[10px] uppercase font-black text-text-muted tracking-[0.4em] mb-2">Organization</p>
                                    <p className="text-xl font-black text-text-primary uppercase italic tracking-tighter truncate">{orgName}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-black text-text-muted tracking-[0.4em] mb-2">Protocol Contact</p>
                                    <p className="text-lg font-bold text-text-primary uppercase tracking-widest truncate">{contactName}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8 mb-10 border-t border-black/5 pt-8">
                                <div>
                                    <p className="text-[10px] uppercase font-black text-text-muted tracking-[0.4em] mb-2">Booking ID</p>
                                    <p className="text-lg font-mono font-black text-primary-copper">{bookingId}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-black text-text-muted tracking-[0.4em] mb-2">Check-in</p>
                                    <p className="text-sm font-bold text-text-primary uppercase tracking-widest">Mar 30, 2026</p>
                                </div>
                            </div>

                            <div className="glass-panel p-6 rounded-xs border border-black/5 bg-white/[0.02]">
                                <p className="text-[9px] text-text-muted leading-relaxed font-bold uppercase tracking-widest">
                                    This confirms your reservation for a {standType} Exhibition Space. Initiate setup at Zone B-12 upon arrival.
                                </p>
                            </div>
                        </div>

                        {/* QR Segment */}
                        <div className="flex-shrink-0 flex flex-col items-center">
                            <div className="p-6 bg-white rounded-xs shadow-2xl transition-all hover:scale-105">
                                <QRCodeSVG
                                    value={`type:booking|id:${bookingId}|org:${orgName}`}
                                    size={140}
                                    level={"H"}
                                    includeMargin={false}
                                    fgColor="#1A1A1A"
                                />
                            </div>
                            <p className="mt-4 text-[8px] font-black uppercase tracking-[0.5em] text-text-muted opacity-50">Setup Access</p>
                        </div>
                    </div>

                    <div className="bg-[#F0EBE6] py-4 text-center text-[9px] font-black uppercase tracking-[0.6em] text-black/20 border-t border-black/5">
                        Official Exhibitor Pass © 2026
                    </div>
                </div>

                {/* Decorative Side Notches */}
                <div className="absolute top-[160px] -left-6 w-12 h-12 bg-white rounded-full border-r border-black/5"></div>
                <div className="absolute top-[160px] -right-6 w-12 h-12 bg-white rounded-full border-l border-black/5"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-16 relative z-10">
                <button onClick={() => window.print()} className="btn btn-outline !border-black/10 hover:!border-black/30 !px-8 flex items-center gap-2">
                    <Download size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Save Permit</span>
                </button>
                <button onClick={handleBack} className="btn btn-primary !px-10 flex items-center gap-2">
                    <Home size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Back to Home</span>
                </button>
            </div>

            <style jsx>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(0, 0, 0, 0.08);
                    border-radius: 40px;
                }
                .text-primary-copper { color: var(--primary-copper); }
            `}</style>
        </div>
    );
}

export default function BookingConfirmationPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BookingConfirmationContent />
        </Suspense>
    );
}
