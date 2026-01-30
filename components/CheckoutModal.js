"use client";
import { useState, useEffect, useMemo } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, Send, Download, CreditCard } from 'lucide-react';
import api from '@/lib/api';

const ModalState = {
    FORM: 'form',
    PROCESSING: 'processing',
    PAYMENT: 'payment',
    VERIFYING: 'verifying',
    SUCCESS: 'success',
    ERROR: 'error'
};

export default function RegistrationModal({ isOpen, onClose, ticket, onComplete }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: ''
    });

    const [state, setState] = useState(ModalState.FORM);
    const [errorMessage, setErrorMessage] = useState('');
    const [createdTicket, setCreatedTicket] = useState(null);
    const [paymentReference, setPaymentReference] = useState('');

    // Stabilize the reference
    const [configRef, setConfigRef] = useState('');

    useEffect(() => {
        if (isOpen) {
            setConfigRef('REF_' + Math.floor(Math.random() * 1000000000 + 1));
            setState(ModalState.FORM);
            setErrorMessage('');
            setCreatedTicket(null);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handlePaystackPayment = (ref) => {
        if (!window.PaystackPop) {
            console.error('Paystack SDK not loaded');
            setErrorMessage('Payment system is still loading. Please wait a moment and try again.');
            setState(ModalState.ERROR);
            return;
        }

        const handler = window.PaystackPop.setup({
            key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
            email: formData.email,
            amount: Math.round((ticket?.price || 0) * 100),
            ref: ref || configRef,
            metadata: {
                fullName: formData.fullName,
                phone: formData.phone,
                ticketType: ticket?.name
            },
            callback: function (response) {
                // MUST be a regular function, NOT async - Paystack validation rejects async
                console.log('💳 Paystack Success Callback:', response);
                handlePaymentSuccess(response);
            },
            onClose: function () {
                console.log('💳 Paystack Window Closed');
            }
        });

        handler.openIframe();
    };

    // Async handler called from the sync Paystack callback
    const handlePaymentSuccess = async (response) => {
        setPaymentReference(response.reference);
        setState(ModalState.VERIFYING);

        try {
            console.log('🎫 Creating ticket directly (local dev fallback)...');

            // Create ticket directly via API
            const ticketResponse = await fetch('/api/tickets/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    ticketType: ticket.name,
                    paymentReference: response.reference
                })
            });

            if (!ticketResponse.ok) {
                const errorData = await ticketResponse.json();
                console.error('❌ Ticket creation API error:', errorData);
                throw new Error(errorData.error || errorData.details || 'Ticket creation failed');
            }

            const ticketData = await ticketResponse.json();
            console.log('✅ Ticket created:', ticketData);

            setCreatedTicket({
                ticketId: ticketData.ticketNumber,
                fullName: formData.fullName,
                email: formData.email,
                ticketType: ticket.name,
                reference: response.reference,
                pdfBase64: null
            });
            setState(ModalState.SUCCESS);
        } catch (error) {
            console.error('❌ Direct ticket creation failed:', error);
            checkPaymentStatus(response.reference);
        }
    };

    const checkPaymentStatus = async (reference) => {
        let attempts = 0;
        const maxAttempts = 20;

        const poll = async () => {
            // Stop polling if we've already reached success or error state elsewhere
            // Use setState with a function to check current state safely if needed, 
            // but for a simple modal, checking the state variable is usually sufficient
            // if we ensure we don't proceed if success is already reached.

            try {
                const response = await fetch(`/api/payments/status?reference=${reference}`);
                const data = await response.json();

                if (data.status === 'SUCCESS') {
                    const ticketResponse = await fetch(`/api/tickets/search?query=${reference}`);
                    const ticketData = await ticketResponse.json();

                    if (ticketData && ticketData.length > 0) {
                        setCreatedTicket(ticketData[0]);
                        setState(ModalState.SUCCESS);
                        return; // Stop polling on success
                    }
                }

                if (data.status === 'FAILED') {
                    setState(ModalState.ERROR);
                    setErrorMessage('Payment verification failed.');
                    return;
                }

                attempts++;
                if (attempts < maxAttempts) {
                    // Only continue polling if we haven't reached success yet
                    setTimeout(() => {
                        // Re-check state inside the timeout to avoid overwriting success
                        setState(current => {
                            if (current !== ModalState.SUCCESS) {
                                poll();
                            }
                            return current;
                        });
                    }, 3000);
                } else {
                    // Only show timeout error if we haven't already succeeded
                    setState(current => {
                        if (current !== ModalState.SUCCESS) {
                            setErrorMessage('Verification timed out. Check your email or contact support.');
                            return ModalState.ERROR;
                        }
                        return current;
                    });
                }
            } catch (error) {
                console.error('Error polling status:', error);
                setTimeout(poll, 3000);
            }
        };

        poll();
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.fullName || !formData.email || !formData.phone) return;

        if (ticket.price > 0) {
            setState(ModalState.PROCESSING);

            try {
                const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
                if (!publicKey) throw new Error('Payment configuration error.');

                const initResponse = await fetch('/api/payments/initialize', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        reference: configRef,
                        email: formData.email,
                        fullName: formData.fullName,
                        phone: formData.phone,
                        amount: ticket.price,
                        ticketType: ticket.name
                    })
                });

                if (!initResponse.ok) throw new Error('Failed to initialize transaction');

                console.log('✅ DB initialized. Triggering Paystack...');
                checkPaymentStatus(configRef);
                setState(ModalState.PAYMENT);

                // Trigger Paystack
                handlePaystackPayment(configRef);

            } catch (error) {
                console.error('Initialization error:', error);
                setState(ModalState.ERROR);
                setErrorMessage(error.message);
            }
            return;
        }

        // Free Ticket Flow
        setState(ModalState.PROCESSING);
        try {
            const response = await fetch('/api/tickets/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, ticketType: ticket.name })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            setCreatedTicket(data);
            setState(ModalState.SUCCESS);
        } catch (error) {
            setState(ModalState.ERROR);
            setErrorMessage(error.message);
        }
    };

    const handleDownload = () => {
        if (!createdTicket?.pdfBase64) return;
        const link = document.createElement('a');
        link.href = `data:application/pdf;base64,${createdTicket.pdfBase64}`;
        link.download = `Achievers_Summit_Ticket_${createdTicket.ticketId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-lg bg-midnight-black border border-white/10 rounded-[40px] shadow-[0_0_100px_rgba(210,164,120,0.15)] overflow-hidden">

                {(state === ModalState.FORM || state === ModalState.SUCCESS || state === ModalState.ERROR || state === ModalState.PAYMENT) && (
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all z-20"
                    >
                        <X size={20} />
                    </button>
                )}

                <div className="p-10">
                    {state === ModalState.FORM && (
                        <div className="animate-fade-in-up">
                            <div className="text-center mb-10">
                                <div className="inline-block px-4 py-1.5 rounded-full bg-primary-copper/10 border border-primary-copper/20 text-primary-copper font-black text-[10px] tracking-[0.3em] uppercase mb-4">
                                    {ticket.name} • {ticket.price === 0 ? 'Free' : `₦${ticket.price.toLocaleString()}`}
                                </div>
                                <h2 className="text-3xl font-black italic text-white mb-2">Get Your <span className="text-gradient">Ticket.</span></h2>
                                <p className="text-text-muted text-sm font-light italic">Enter your details to proceed.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Full Name *</label>
                                    <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white outline-none focus:border-primary-copper/50" placeholder="Full Name" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Email *</label>
                                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white outline-none focus:border-primary-copper/50" placeholder="Email" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Phone *</label>
                                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white outline-none focus:border-primary-copper/50" placeholder="Phone" />
                                </div>

                                <button type="submit" disabled={state === ModalState.PROCESSING} className="btn btn-primary w-full h-16 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 italic">
                                    {state === ModalState.PROCESSING ? <Loader2 className="animate-spin" /> : <><CreditCard /> PAY ₦{ticket.price.toLocaleString()}</>}
                                </button>
                            </form>
                        </div>
                    )}

                    {state === ModalState.PROCESSING && (
                        <div className="text-center py-20">
                            <Loader2 className="w-12 h-12 text-primary-copper animate-spin mx-auto mb-6" />
                            <h3 className="text-2xl font-black italic text-white mb-2">INITIALIZING...</h3>
                            <p className="text-text-muted text-sm">Please wait while we set up your session.</p>
                        </div>
                    )}

                    {state === ModalState.PAYMENT && (
                        <div className="text-center py-20">
                            <CreditCard className="w-12 h-12 text-primary-copper mx-auto mb-6 opacity-50" />
                            <h3 className="text-2xl font-black italic text-white mb-4">AWAITING PAYMENT</h3>
                            <p className="text-text-muted text-sm mb-10 italic">If the payment window didn't open, click below:</p>
                            <button onClick={() => handlePaystackPayment()} className="btn btn-primary w-full h-16 text-[10px] font-black uppercase tracking-widest italic shadow-2xl">
                                OPEN PAYMENT WINDOW
                            </button>
                        </div>
                    )}

                    {state === ModalState.VERIFYING && (
                        <div className="text-center py-20">
                            <Loader2 className="w-12 h-12 text-primary-copper animate-spin mx-auto mb-6" />
                            <h3 className="text-2xl font-black italic text-white mb-2">VERIFYING...</h3>
                            <p className="text-text-muted text-sm italic">Confirming your transaction and generating ticket.</p>
                        </div>
                    )}

                    {state === ModalState.SUCCESS && (
                        <div className="text-center py-10">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                            <h3 className="text-3xl font-black italic text-white mb-2">SUCCESS! 🎉</h3>
                            <p className="text-text-muted text-sm mb-6 italic">Your ticket has been sent to your email.</p>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Ticket Number</p>
                                <p className="text-2xl font-black text-primary-copper mb-4">{createdTicket?.ticketId || createdTicket?.ticketNumber}</p>

                                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Reference</p>
                                <p className="text-sm font-mono text-white/60">{createdTicket?.reference || createdTicket?.paymentReference}</p>
                            </div>

                            {createdTicket?.pdfBase64 ? (
                                <button onClick={handleDownload} className="btn btn-primary w-full h-14 text-[10px] font-black uppercase tracking-widest mb-4">DOWNLOAD PDF</button>
                            ) : (
                                <p className="text-xs text-white/30 italic mb-6">Check your email for the printable PDF ticket.</p>
                            )}

                            <button onClick={onClose} className="text-white/40 text-[10px] font-black uppercase">CLOSE</button>
                        </div>
                    )}

                    {state === ModalState.ERROR && (
                        <div className="text-center py-10">
                            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                            <h3 className="text-2xl font-black italic text-white mb-4">FAILED</h3>
                            <p className="text-text-muted text-sm mb-10 italic">{errorMessage}</p>
                            <button onClick={() => setState(ModalState.FORM)} className="btn btn-primary w-full h-14 text-[10px] font-black uppercase mb-4">TRY AGAIN</button>
                            <button onClick={onClose} className="text-white/40 text-[10px] font-black uppercase">CLOSE</button>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .text-gradient { background: linear-gradient(135deg, #A1887F 0%, #D2A478 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                .animate-fade-in-up { animation: fadeInUp 0.5s ease-out; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}
