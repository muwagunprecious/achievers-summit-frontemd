"use client";
import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Home, Building2, ShieldCheck } from 'lucide-react';

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
            <div className="min-h-screen bg-surface flex items-center justify-center text-text">
                <p>Loading booking details...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface flex flex-col items-center justify-center py-24 px-6">
            <div className="text-center mb-12">
                <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center text-brand mx-auto mb-6">
                    <Building2 size={32} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-text mb-2">Exhibition confirmed</h2>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-medium">
                    <ShieldCheck size={14} />
                    <span>Space reserved</span>
                </div>
            </div>

            <div className="w-full max-w-2xl card overflow-hidden">
                {/* Top Panel */}
                <div className="bg-surface-alt p-8 md:p-10 border-b border-border">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 bg-brand rounded-md flex items-center justify-center text-white text-sm font-bold">A</div>
                                <span className="font-bold text-text tracking-tight">Achievers Summit</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-text">{standType} Stand</h3>
                        </div>
                        <span className="badge">Africa Edition 2026</span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex flex-col md:flex-row gap-10 items-center">
                    <div className="flex-grow w-full">
                        <div className="grid sm:grid-cols-2 gap-6 mb-8">
                            <div>
                                <p className="text-xs text-text-secondary font-medium mb-1">Organization</p>
                                <p className="font-semibold text-text truncate">{orgName}</p>
                            </div>
                            <div>
                                <p className="text-xs text-text-secondary font-medium mb-1">Contact person</p>
                                <p className="font-semibold text-text truncate">{contactName}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
                            <div>
                                <p className="text-xs text-text-secondary font-medium mb-1">Booking ID</p>
                                <p className="font-mono font-bold text-brand">{bookingId}</p>
                            </div>
                            <div>
                                <p className="text-xs text-text-secondary font-medium mb-1">Event date</p>
                                <p className="font-semibold text-text">Aug 11201312, 2026</p>
                            </div>
                        </div>
                    </div>

                    <div className="shrink-0 flex flex-col items-center">
                        <div className="p-4 bg-white rounded-xl border border-border shadow-sm">
                            <QRCodeSVG
                                value={`type:booking|id:${bookingId}|org:${orgName}`}
                                size={120}
                                level={"H"}
                                includeMargin={false}
                                fgColor="#1A1A1A"
                            />
                        </div>
                        <p className="mt-3 text-xs text-text-secondary">Setup access</p>
                    </div>
                </div>

                <div className="bg-surface-alt py-3 text-center text-xs text-text-secondary border-t border-border">
                    Official Exhibitor Pass 00a9 2026
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-10">
                <button onClick={() => window.print()} className="btn border-border text-text hover:bg-surface-alt">
                    <Download size={16} /> Save permit
                </button>
                <button onClick={handleBack} className="btn bg-brand text-white hover:bg-brand-dark border-brand hover:border-brand-dark">
                    <Home size={16} /> Back to home
                </button>
            </div>
        </div>
    );
}

export default function BookingConfirmationPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center text-text">Loading...</div>}>
            <BookingConfirmationContent />
        </Suspense>
    );
}
