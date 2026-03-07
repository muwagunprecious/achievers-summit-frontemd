"use client";
import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, Send, Download, CreditCard, ChevronRight, ChevronLeft, Accessibility, User } from 'lucide-react';
import { usePaystackPayment } from 'react-paystack';

const ModalState = {
    FORM: 'form',
    PROCESSING: 'processing',
    PAYMENT: 'payment',
    VERIFYING: 'verifying',
    SUCCESS: 'success',
    ERROR: 'error'
};

const DISABILITY_OPTIONS = [
    'Visual Impairment',
    'Hearing Impairment',
    'Physical / Mobility Disability',
    'Cognitive / Intellectual Disability',
    'Speech Impairment',
    'Chronic Illness',
    'Psychosocial Disability',
    'Other'
];

const PERSONAL_ASSISTANCE_OPTIONS = [
    { value: 'none', label: 'No, I do not require personal assistance' },
    { value: 'bringing_own', label: 'Yes, I will be bringing my own personal assistant' },
    { value: 'need_provided', label: 'Yes, I would need assistance to be provided' }
];

export default function RegistrationModal({ isOpen, onClose, ticket, onComplete }) {
    const [formStep, setFormStep] = useState(1); // 1: personal, 2: demographics, 3: accessibility
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        // Demographics
        gender: '',
        city: '',
        country: '',
        // Accessibility
        disabilityTypes: [],
        signLanguageRequired: false,
        personalAssistance: 'none',
        sensoryRequirements: false,
        sensoryDetails: '',
        additionalAccessibility: ''
    });

    const [state, setState] = useState(ModalState.FORM);
    const [errorMessage, setErrorMessage] = useState('');
    const [createdTicket, setCreatedTicket] = useState(null);
    const [paymentReference, setPaymentReference] = useState('');

    const [configRef, setConfigRef] = useState('');

    const paystackConfig = {
        reference: configRef || ('REF_' + Math.floor(Math.random() * 1000000000 + 1)),
        email: formData.email,
        amount: Math.round((ticket?.price || 0) * 100),
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        metadata: {
            fullName: formData.fullName,
            phone: formData.phone,
            ticketType: ticket?.name
        }
    };

    const initializePayment = usePaystackPayment(paystackConfig);

    useEffect(() => {
        if (isOpen) {
            const newRef = 'REF_' + Math.floor(Math.random() * 1000000000 + 1);
            setConfigRef(newRef);
            setState(ModalState.FORM);
            setFormStep(1);
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

    const handlePaystackPayment = () => {
        initializePayment(handlePaymentSuccess, () => {
            console.log('💳 Paystack Window Closed');
        });
    };

    const handlePaymentSuccess = async (response) => {
        setPaymentReference(response.reference);
        setState(ModalState.VERIFYING);

        try {
            const ticketResponse = await fetch('/api/tickets/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    ticketType: ticket.name,
                    paymentReference: response.reference
                })
            });

            if (!ticketResponse.ok) {
                const errorData = await ticketResponse.json();
                throw new Error(errorData.error || errorData.details || 'Ticket creation failed');
            }

            const ticketData = await ticketResponse.json();

            setCreatedTicket({
                ticketId: ticketData.ticketNumber,
                fullName: formData.fullName,
                email: formData.email,
                ticketType: ticket.name,
                reference: response.reference,
                pdfBase64: ticketData.pdfBase64 || null
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
            try {
                const response = await fetch(`/api/payments/status?reference=${reference}`);
                const data = await response.json();

                if (data.status === 'SUCCESS') {
                    const ticketResponse = await fetch(`/api/tickets/search?query=${reference}`);
                    const ticketData = await ticketResponse.json();

                    if (ticketData && ticketData.length > 0) {
                        setCreatedTicket(ticketData[0]);
                        setState(ModalState.SUCCESS);
                        return;
                    }
                }

                if (data.status === 'FAILED') {
                    setState(ModalState.ERROR);
                    setErrorMessage('Payment verification failed.');
                    return;
                }

                attempts++;
                if (attempts < maxAttempts) {
                    setTimeout(() => {
                        setState(current => {
                            if (current !== ModalState.SUCCESS) {
                                poll();
                            }
                            return current;
                        });
                    }, 3000);
                } else {
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
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox' && name === 'disabilityTypes') {
            setFormData(prev => ({
                ...prev,
                disabilityTypes: checked
                    ? [...prev.disabilityTypes, value]
                    : prev.disabilityTypes.filter(d => d !== value)
            }));
        } else if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleRadioChange = (name, value) => {
        if (name === 'sensoryRequirements') {
            const boolVal = value === 'true';
            setFormData(prev => ({
                ...prev,
                sensoryRequirements: boolVal,
                sensoryDetails: boolVal ? prev.sensoryDetails : ''
            }));
        } else if (name === 'signLanguageRequired') {
            setFormData(prev => ({ ...prev, signLanguageRequired: value === 'true' }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const canProceedStep1 = formData.fullName && formData.email && formData.phone;
    const canProceedStep2 = true; // demographics are optional

    const handleNextStep = () => {
        if (formStep === 1 && canProceedStep1) setFormStep(2);
        else if (formStep === 2) setFormStep(3);
    };

    const handlePrevStep = () => {
        if (formStep > 1) setFormStep(formStep - 1);
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

                checkPaymentStatus(configRef);
                setState(ModalState.PAYMENT);
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

    // Shared input classes
    const inputClass = "w-full h-12 bg-black/3 border border-black/10 rounded-lg px-4 text-sm text-text-primary outline-none focus:border-primary-copper/50 transition-colors";
    const labelClass = "block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1.5";
    const selectClass = "w-full h-12 bg-black/3 border border-black/10 rounded-lg px-4 text-sm text-text-primary outline-none focus:border-primary-copper/50 transition-colors appearance-none cursor-pointer";

    // Step indicator
    const StepIndicator = () => (
        <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2, 3].map(step => (
                <div key={step} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        formStep === step ? 'bg-primary-copper text-white' :
                        formStep > step ? 'bg-primary-copper/20 text-primary-copper' :
                        'bg-black/5 text-text-muted'
                    }`}>
                        {formStep > step ? '✓' : step}
                    </div>
                    {step < 3 && <div className={`w-8 h-0.5 ${formStep > step ? 'bg-primary-copper/30' : 'bg-black/10'}`} />}
                </div>
            ))}
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-lg bg-white border border-black/10 rounded-xl shadow-[0_0_100px_rgba(120,58,40,0.1)] overflow-hidden max-h-[90vh] flex flex-col">

                {(state === ModalState.FORM || state === ModalState.SUCCESS || state === ModalState.ERROR || state === ModalState.PAYMENT) && (
                    <button
                        onClick={onClose}
                        style={{ backgroundColor: '#F8F6F4' }}
                        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full text-text-primary hover:bg-gray-200 transition-all z-20"
                    >
                        <X size={20} />
                    </button>
                )}

                <div className="p-8 overflow-y-auto flex-1">
                    {state === ModalState.FORM && (
                        <div className="animate-fade-in-up">
                            {/* Header */}
                            <div className="text-center mb-6">
                                <div className="inline-block px-4 py-1.5 rounded-full bg-primary-copper/10 border border-primary-copper/20 text-primary-copper font-bold text-[10px] tracking-[0.2em] uppercase mb-3">
                                    {ticket.name} • {ticket.price === 0 ? 'Free' : `₦${ticket.price.toLocaleString()}`}
                                </div>
                                <h2 className="text-2xl font-bold mb-1">Register for Your <span className="text-gradient">Pass</span></h2>
                                <p className="text-text-muted text-sm">
                                    {formStep === 1 && 'Enter your personal details'}
                                    {formStep === 2 && 'Tell us a bit about yourself'}
                                    {formStep === 3 && 'Help us make the event accessible'}
                                </p>
                            </div>

                            <StepIndicator />

                            <form onSubmit={handleSubmit}>
                                {/* Step 1: Personal Details */}
                                {formStep === 1 && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className={labelClass}>Full Name *</label>
                                            <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className={inputClass} placeholder="Enter your full name" />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Email Address *</label>
                                            <input type="email" name="email" required value={formData.email} onChange={handleChange} className={inputClass} placeholder="you@email.com" />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Phone Number *</label>
                                            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+234 800 000 0000" />
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleNextStep}
                                            disabled={!canProceedStep1}
                                            className="btn btn-primary w-full h-12 mt-2 disabled:opacity-40"
                                        >
                                            Continue <ChevronRight size={16} />
                                        </button>
                                    </div>
                                )}

                                {/* Step 2: Demographics */}
                                {formStep === 2 && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 mb-2 text-text-muted">
                                            <User size={16} />
                                            <span className="text-xs font-semibold uppercase tracking-wider">Demographics</span>
                                        </div>

                                        <div>
                                            <label className={labelClass}>Gender</label>
                                            <select name="gender" value={formData.gender} onChange={handleChange} className={selectClass}>
                                                <option value="">Prefer not to say</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="non-binary">Non-binary</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className={labelClass}>City</label>
                                                <input type="text" name="city" value={formData.city} onChange={handleChange} className={inputClass} placeholder="e.g. Lagos" />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Country</label>
                                                <input type="text" name="country" value={formData.country} onChange={handleChange} className={inputClass} placeholder="e.g. Nigeria" />
                                            </div>
                                        </div>

                                        <div className="flex gap-3 mt-2">
                                            <button type="button" onClick={handlePrevStep} className="btn btn-outline flex-1 h-12">
                                                <ChevronLeft size={16} /> Back
                                            </button>
                                            <button type="button" onClick={handleNextStep} className="btn btn-primary flex-1 h-12">
                                                Continue <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Accessibility */}
                                {formStep === 3 && (
                                    <div className="space-y-5">
                                        <div className="flex items-center gap-2 mb-2 text-text-muted">
                                            <Accessibility size={16} />
                                            <span className="text-xs font-semibold uppercase tracking-wider">Accessibility Needs</span>
                                        </div>

                                        {/* Disability Types - Multi-select checkboxes */}
                                        <div>
                                            <label className={labelClass}>Do you have any form of disability? (Select all that apply)</label>
                                            <div className="grid grid-cols-1 gap-2 mt-2">
                                                {DISABILITY_OPTIONS.map(option => (
                                                    <label key={option} className="flex items-center gap-3 p-3 bg-black/2 border border-black/8 rounded-lg cursor-pointer hover:border-primary-copper/30 transition-colors">
                                                        <input
                                                            type="checkbox"
                                                            name="disabilityTypes"
                                                            value={option}
                                                            checked={formData.disabilityTypes.includes(option)}
                                                            onChange={handleChange}
                                                            className="w-4 h-4 accent-primary-copper rounded"
                                                        />
                                                        <span className="text-sm text-text-primary">{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Sign Language Interpretation */}
                                        <div>
                                            <label className={labelClass}>Do you require Sign Language Interpretation?</label>
                                            <div className="flex gap-3 mt-2">
                                                {[{ val: 'true', label: 'Yes' }, { val: 'false', label: 'No' }].map(opt => (
                                                    <label key={opt.val} className={`flex-1 flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition-all text-sm font-medium ${
                                                        String(formData.signLanguageRequired) === opt.val
                                                            ? 'border-primary-copper bg-primary-copper/8 text-primary-copper'
                                                            : 'border-black/10 bg-black/2 text-text-muted hover:border-primary-copper/30'
                                                    }`}>
                                                        <input type="radio" name="signLanguageRequired" value={opt.val} checked={String(formData.signLanguageRequired) === opt.val} onChange={() => handleRadioChange('signLanguageRequired', opt.val)} className="sr-only" />
                                                        {opt.label}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Personal Assistance */}
                                        <div>
                                            <label className={labelClass}>Do you require Personal Assistance at the event?</label>
                                            <div className="space-y-2 mt-2">
                                                {PERSONAL_ASSISTANCE_OPTIONS.map(opt => (
                                                    <label key={opt.value} className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                                                        formData.personalAssistance === opt.value
                                                            ? 'border-primary-copper bg-primary-copper/8'
                                                            : 'border-black/10 bg-black/2 hover:border-primary-copper/30'
                                                    }`}>
                                                        <input type="radio" name="personalAssistance" value={opt.value} checked={formData.personalAssistance === opt.value} onChange={() => handleRadioChange('personalAssistance', opt.value)} className="sr-only" />
                                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                                            formData.personalAssistance === opt.value ? 'border-primary-copper' : 'border-black/20'
                                                        }`}>
                                                            {formData.personalAssistance === opt.value && <div className="w-2 h-2 rounded-full bg-primary-copper" />}
                                                        </div>
                                                        <span className="text-sm text-text-primary">{opt.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Sensory Requirements */}
                                        <div>
                                            <label className={labelClass}>Do you have any sensory requirements?</label>
                                            <div className="flex gap-3 mt-2">
                                                {[{ val: 'true', label: 'Yes' }, { val: 'false', label: 'No' }].map(opt => (
                                                    <label key={opt.val} className={`flex-1 flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition-all text-sm font-medium ${
                                                        String(formData.sensoryRequirements) === opt.val
                                                            ? 'border-primary-copper bg-primary-copper/8 text-primary-copper'
                                                            : 'border-black/10 bg-black/2 text-text-muted hover:border-primary-copper/30'
                                                    }`}>
                                                        <input type="radio" name="sensoryRequirements" value={opt.val} checked={String(formData.sensoryRequirements) === opt.val} onChange={() => handleRadioChange('sensoryRequirements', opt.val)} className="sr-only" />
                                                        {opt.label}
                                                    </label>
                                                ))}
                                            </div>
                                            {formData.sensoryRequirements && (
                                                <textarea
                                                    name="sensoryDetails"
                                                    value={formData.sensoryDetails}
                                                    onChange={handleChange}
                                                    rows={3}
                                                    className="w-full mt-3 bg-black/3 border border-black/10 rounded-lg p-4 text-sm text-text-primary outline-none focus:border-primary-copper/50 resize-none transition-colors"
                                                    placeholder="Please describe your sensory requirements..."
                                                />
                                            )}
                                        </div>

                                        {/* Additional Accessibility Notes */}
                                        <div>
                                            <label className={labelClass}>Any additional accessibility needs?</label>
                                            <textarea
                                                name="additionalAccessibility"
                                                value={formData.additionalAccessibility}
                                                onChange={handleChange}
                                                rows={3}
                                                className="w-full mt-1.5 bg-black/3 border border-black/10 rounded-lg p-4 text-sm text-text-primary outline-none focus:border-primary-copper/50 resize-none transition-colors"
                                                placeholder="Tell us anything else we should know to support your experience..."
                                            />
                                        </div>

                                        <div className="flex gap-3 mt-2">
                                            <button type="button" onClick={handlePrevStep} className="btn btn-outline flex-1 h-12">
                                                <ChevronLeft size={16} /> Back
                                            </button>
                                            <button type="submit" disabled={state === ModalState.PROCESSING} className="btn btn-primary flex-1 h-12 disabled:opacity-50">
                                                {state === ModalState.PROCESSING ? <Loader2 className="animate-spin" size={18} /> :
                                                    ticket.price > 0 ? <><CreditCard size={16} /> Pay ₦{ticket.price.toLocaleString()}</> : <><Send size={16} /> Get Ticket</>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    )}

                    {state === ModalState.PROCESSING && (
                        <div className="text-center py-20">
                            <Loader2 className="w-12 h-12 text-primary-copper animate-spin mx-auto mb-6" />
                            <h3 className="text-xl font-bold mb-2">Setting things up...</h3>
                            <p className="text-text-muted text-sm">Please wait while we prepare your session.</p>
                        </div>
                    )}

                    {state === ModalState.PAYMENT && (
                        <div className="text-center py-20">
                            <CreditCard className="w-12 h-12 text-primary-copper mx-auto mb-6 opacity-50" />
                            <h3 className="text-xl font-bold mb-4">Awaiting Payment</h3>
                            <p className="text-text-muted text-sm mb-10">If the payment window didn&apos;t open, click below:</p>
                            <button onClick={() => handlePaystackPayment()} className="btn btn-primary w-full h-12">
                                Open Payment Window
                            </button>
                        </div>
                    )}

                    {state === ModalState.VERIFYING && (
                        <div className="text-center py-20">
                            <Loader2 className="w-12 h-12 text-primary-copper animate-spin mx-auto mb-6" />
                            <h3 className="text-xl font-bold mb-2">Verifying...</h3>
                            <p className="text-text-muted text-sm">Confirming your transaction and generating ticket.</p>
                        </div>
                    )}

                    {state === ModalState.SUCCESS && (
                        <div className="text-center py-10">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                            <h3 className="text-2xl font-bold mb-2">You&apos;re all set! 🎉</h3>
                            <p className="text-text-muted text-sm mb-6">Your ticket has been sent to your email.</p>

                            <div className="bg-black/3 border border-black/10 rounded-lg p-6 mb-6">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">Ticket Number</p>
                                <p className="text-2xl font-bold text-primary-copper mb-4">{createdTicket?.ticketId || createdTicket?.ticketNumber}</p>

                                <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">Reference</p>
                                <p className="text-sm font-mono text-text-secondary">{createdTicket?.reference || createdTicket?.paymentReference}</p>
                            </div>

                            {createdTicket?.pdfBase64 ? (
                                <button onClick={handleDownload} className="btn btn-primary w-full h-12 mb-4">Download PDF</button>
                            ) : (
                                <p className="text-xs text-text-muted mb-6">Check your email for the printable PDF ticket.</p>
                            )}

                            <button onClick={onClose} className="text-text-muted text-xs font-semibold hover:text-text-primary transition-colors">Close</button>
                        </div>
                    )}

                    {state === ModalState.ERROR && (
                        <div className="text-center py-10">
                            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                            <h3 className="text-xl font-bold mb-4">Something went wrong</h3>
                            <p className="text-text-muted text-sm mb-10">{errorMessage}</p>
                            <button onClick={() => { setState(ModalState.FORM); setFormStep(1); }} className="btn btn-primary w-full h-12 mb-4">Try Again</button>
                            <button onClick={onClose} className="text-text-muted text-xs font-semibold hover:text-text-primary transition-colors">Close</button>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .text-gradient { background: linear-gradient(135deg, #783A28 0%, #B67E6D 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                .animate-fade-in-up { animation: fadeInUp 0.5s ease-out; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}
