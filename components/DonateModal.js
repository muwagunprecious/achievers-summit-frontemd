"use client";
import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, CreditCard, Heart } from 'lucide-react';
import { usePaystackPayment } from 'react-paystack';

const ModalState = {
    FORM: 'form',
    PROCESSING: 'processing',
    PAYMENT: 'payment',
    VERIFYING: 'verifying',
    SUCCESS: 'success',
    ERROR: 'error'
};

export default function DonateModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        amount: ''
    });

    const [state, setState] = useState(ModalState.FORM);
    const [errorMessage, setErrorMessage] = useState('');
    const [paymentReference, setPaymentReference] = useState('');
    const [configRef, setConfigRef] = useState('');

    const paystackConfig = {
        reference: configRef || ('DON_' + Math.floor(Math.random() * 1000000000 + 1)),
        email: formData.email,
        amount: Math.round(parseFloat(formData.amount || 0) * 100),
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        metadata: {
            fullName: formData.fullName,
            donation: true
        }
    };

    const initializePayment = usePaystackPayment(paystackConfig);

    useEffect(() => {
        if (isOpen) {
            const newRef = 'DON_' + Math.floor(Math.random() * 1000000000 + 1);
            setConfigRef(newRef);
            setState(ModalState.FORM);
            setErrorMessage('');
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handlePaystackPayment = () => {
        if (!paystackConfig.publicKey) {
            setErrorMessage('Payment configuration error: Public Key is missing.');
            setState(ModalState.ERROR);
            return;
        }

        initializePayment(
            (response) => {
                setPaymentReference(response.reference);
                setState(ModalState.SUCCESS);
            },
            () => {
                console.log('💳 Donation Window Closed');
                if (state !== ModalState.SUCCESS) {
                    setState(ModalState.FORM);
                }
            }
        );
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const amountNum = parseFloat(formData.amount);

        if (!formData.fullName || !formData.email || !formData.amount) return;

        if (amountNum < 1000) {
            setErrorMessage('Minimum donation amount is ₦1,000');
            setState(ModalState.ERROR);
            return;
        }

        setState(ModalState.PAYMENT);
        handlePaystackPayment(configRef);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-lg bg-white border border-black/10 rounded-xs shadow-[0_0_100px_rgba(210,164,120,0.15)] overflow-hidden">

                {(state === ModalState.FORM || state === ModalState.SUCCESS || state === ModalState.ERROR || state === ModalState.PAYMENT) && (
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-black/5 border border-black/10 text-text-primary hover:bg-black/10 transition-all z-20"
                    >
                        <X size={20} />
                    </button>
                )}

                <div className="p-10">
                    {state === ModalState.FORM && (
                        <div className="animate-fade-in-up">
                            <div className="text-center mb-10">
                                <div className="inline-block px-4 py-1.5 rounded-full bg-primary-copper/10 border border-primary-copper/20 text-primary-copper font-black text-[10px] tracking-[0.3em] uppercase mb-4">
                                    Support Our Vision
                                </div>
                                <h2 className="text-3xl font-black italic text-text-primary mb-2">Donate <span className="text-gradient">Now.</span></h2>
                                <p className="text-text-muted text-sm font-light italic">Your contribution empowers the next generation.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Full Name *</label>
                                    <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full h-14 bg-black/3 border border-black/10 rounded-xs px-6 text-text-primary outline-none focus:border-primary-copper/50" placeholder="Full Name" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Email *</label>
                                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full h-14 bg-black/3 border border-black/10 rounded-xs px-6 text-text-primary outline-none focus:border-primary-copper/50" placeholder="Email Address" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Amount (₦) *</label>
                                    <input type="number" name="amount" required min="1000" value={formData.amount} onChange={handleChange} className="w-full h-14 bg-black/3 border border-black/10 rounded-xs px-6 text-text-primary outline-none focus:border-primary-copper/50" placeholder="Min. 1,000" />
                                </div>

                                <button type="submit" className="btn btn-primary w-full h-14">
                                    <Heart size={18} /> Proceed to Donate
                                </button>
                            </form>
                        </div>
                    )}

                    {state === ModalState.PAYMENT && (
                        <div className="text-center py-20">
                            <CreditCard className="w-12 h-12 text-primary-copper mx-auto mb-6 opacity-50" />
                            <h3 className="text-2xl font-black italic text-text-primary mb-4">AWAITING PAYMENT</h3>
                            <p className="text-text-muted text-sm mb-10 italic">Please complete your donation in the Paystack window.</p>
                            <button onClick={() => handlePaystackPayment()} className="btn btn-primary w-full h-14">
                                Reopen Payment Window
                            </button>
                        </div>
                    )}

                    {state === ModalState.SUCCESS && (
                        <div className="text-center py-10">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                            <h3 className="text-3xl font-black italic text-text-primary mb-2">THANK YOU! ❤️</h3>
                            <p className="text-text-muted text-sm mb-6 italic">Your generous donation has been received successfully.</p>

                            <div className="bg-black/3 border border-black/10 rounded-xs p-6 mb-8">
                                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">Transaction Reference</p>
                                <p className="text-sm font-mono text-text-secondary">{paymentReference}</p>
                            </div>

                            <button onClick={onClose} className="btn btn-primary w-full h-14">Close</button>
                        </div>
                    )}

                    {state === ModalState.ERROR && (
                        <div className="text-center py-10">
                            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                            <h3 className="text-2xl font-black italic text-text-primary mb-4">FAILED</h3>
                            <p className="text-text-muted text-sm mb-10 italic">{errorMessage}</p>
                            <button onClick={() => setState(ModalState.FORM)} className="btn btn-primary w-full h-14 mb-4">Try Again</button>
                            <button onClick={onClose} className="text-text-muted text-xs font-semibold hover:text-text-primary transition-colors">Close</button>
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
