"use client";
import React, { useState, useEffect } from 'react';
import {
    ChevronRight, ChevronLeft, Send, CheckCircle2,
    User, Mail, Phone, MapPin, Briefcase, Info, AlertCircle, Zap, Users, Loader2
} from 'lucide-react';
import Navbar from './Navbar';

const Steps = [
    { title: 'Personal Info', icon: <User size={18} /> },
    { title: 'Unit Selection', icon: <Briefcase size={18} /> },
    { title: 'Availability', icon: <Info size={18} /> },
    { title: 'Finished', icon: <CheckCircle2 size={18} /> }
];

export default function VolunteerForm({ onBack }) {
    const [step, setStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone1: '',
        state: '',
        lga: '',
        phone2: '',
        unitSection: '', // PRODUCT or SERVICE
        unitSubSection: '',
        whyVolunteer: '',
        availableWorkshop: null, // true/false
        unavailableWhy: ''
    });

    const [units, setUnits] = useState([]);
    const [loadingUnits, setLoadingUnits] = useState(true);

    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const response = await fetch('/api/units');
                if (response.ok) {
                    const data = await response.json();
                    setUnits(data);
                }
            } catch (err) {
                console.error('Error fetching units:', err);
            } finally {
                setLoadingUnits(false);
            }
        };
        fetchUnits();
    }, []);

    const productUnits = units.filter(u => u.section === 'PRODUCT').map(u => u.name);
    const serviceUnits = units.filter(u => u.section === 'SERVICE').map(u => u.name);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        if (step < Steps.length - 1) setStep(step + 1);
    };

    const handlePrev = () => {
        if (step > 0) setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/community/volunteer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to submit application');
            }

            setStep(3); // Success step
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg-deep py-20">
            <Navbar isHidden={true} />

            <div className="container max-w-2xl mx-auto pt-20">
                {/* Header */}
                <div className="mb-12 flex items-center justify-between">
                    <button onClick={onBack} className="flex items-center gap-4 bg-white hover:bg-white/90 px-6 py-3 rounded-xs transition-all group shadow-[0_10px_30px_rgba(255,255,255,0.1)] active:scale-95">
                        <div className="w-10 h-10 rounded-xs bg-black/5 flex items-center justify-center transition-all">
                            <ChevronLeft size={20} className="text-black" />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-black">Back</span>
                    </button>
                    <div className="text-right">
                        <div className="text-primary-copper font-black text-[9px] tracking-[0.4em] uppercase mb-2 opacity-60">Recruitment Portal</div>
                        <h2 className="text-text-primary text-2xl font-black italic uppercase tracking-tighter">Volunteer <span className="text-primary-copper">Form</span></h2>
                    </div>
                </div>

                {/* Progress Bar */}
                {step < 3 && (
                    <div className="mb-16">
                        <div className="flex justify-between items-center relative gap-4">
                            {Steps.slice(0, 3).map((s, i) => (
                                <div key={i} className="flex flex-col items-center gap-4 relative z-10 group flex-1">
                                    <div className={`w-14 h-14 rounded-xs flex items-center justify-center transition-all duration-700 border ${step >= i ? 'bg-primary-copper text-white border-primary-copper shadow-[0_0_30px_rgba(210,164,120,0.4)]' : 'bg-black/[0.03] text-black/30 border-black/10'}`}>
                                        {React.cloneElement(s.icon, { size: 22 })}
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className={`text-[8px] font-black uppercase tracking-[0.3em] mb-1 transition-colors ${step >= i ? 'text-primary-copper' : 'text-black/20'}`}>Step 0{i + 1}</span>
                                        <span className={`text-[10px] font-black uppercase tracking-wider transition-colors ${step >= i ? 'text-text-primary' : 'text-black/20'}`}>{s.title}</span>
                                    </div>
                                </div>
                            ))}
                            <div className="absolute top-7 left-10 right-10 h-[2px] bg-black/5 -z-0 rounded-full overflow-hidden">
                                <div className="h-full bg-primary-copper transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(210,164,120,0.8)]" style={{ width: `${(step / 2) * 100}%` }}></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Form Content */}
                <div className="glass-panel p-1 md:p-1.5 rounded-xs border border-black/10 bg-black/[0.01] backdrop-blur-3xl relative overflow-hidden group shadow-2xl">
                    <div className="bg-white rounded-xs p-10 md:p-14 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-copper/5 rounded-full blur-[100px] -mr-32 -mt-32 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/2 rounded-full blur-[100px] -ml-32 -mb-32"></div>

                        {error && (
                            <div className="mb-10 p-6 rounded-xs bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-5 animate-shake">
                                <AlertCircle size={24} className="flex-shrink-0" />
                                <p className="text-xs font-black uppercase tracking-widest leading-relaxed">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="relative z-10">
                            {step === 0 && (
                                <div className="space-y-10 animate-fade-in-up">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-muted pl-2">Full Name <span className="text-primary-copper">*</span></label>
                                            <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-xs px-8 text-black outline-none focus:border-primary-copper/50 focus:bg-white/[0.05] transition-all font-medium text-sm placeholder:text-white/10" placeholder="E.g. John Doe" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-muted pl-2">Email Address <span className="text-primary-copper">*</span></label>
                                            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-xs px-8 text-black outline-none focus:border-primary-copper/50 focus:bg-white/[0.05] transition-all font-medium text-sm placeholder:text-white/10" placeholder="john@example.com" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-muted pl-2">Phone No 1 (Call) <span className="text-primary-copper">*</span></label>
                                            <input type="tel" name="phone1" required value={formData.phone1} onChange={handleChange} className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-xs px-8 text-black outline-none focus:border-primary-copper/50 focus:bg-white/[0.05] transition-all font-medium text-sm placeholder:text-white/10" placeholder="+234..." />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-muted pl-2">Phone No 2 (WhatsApp) <span className="text-primary-copper">*</span></label>
                                            <input type="tel" name="phone2" required value={formData.phone2} onChange={handleChange} className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-xs px-8 text-black outline-none focus:border-primary-copper/50 focus:bg-white/[0.05] transition-all font-medium text-sm placeholder:text-white/10" placeholder="+234..." />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-muted pl-2">State of Residence <span className="text-primary-copper">*</span></label>
                                            <input type="text" name="state" required value={formData.state} onChange={handleChange} className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-xs px-8 text-black outline-none focus:border-primary-copper/50 focus:bg-white/[0.05] transition-all font-medium text-sm placeholder:text-white/10" placeholder="Lagos" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-muted pl-2">L.G.A of Residence <span className="text-primary-copper">*</span></label>
                                            <input type="text" name="lga" required value={formData.lga} onChange={handleChange} className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-xs px-8 text-black outline-none focus:border-primary-copper/50 focus:bg-white/[0.05] transition-all font-medium text-sm placeholder:text-white/10" placeholder="Ikeja" />
                                        </div>
                                    </div>
                                    <div className="pt-8">
                                        <button type="button" onClick={handleNext} disabled={!formData.fullName || !formData.email || !formData.phone1 || !formData.state} className="btn btn-primary w-full h-14 disabled:opacity-50">
                                            <span>Continue</span>
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 1 && (
                                <div className="space-y-10 animate-fade-in-up">
                                    <h3 className="text-text-primary text-xl font-black italic uppercase italic tracking-tighter leading-tight">SELECT YOUR SECTION</h3>
                                    <p className="text-text-muted text-xs font-light italic opacity-60 text-center leading-relaxed max-w-sm mx-auto">Kindly select the section of the unit you wish to serve in (either Product or Service unit).</p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, unitSection: 'PRODUCT', unitSubSection: '' }))}
                                            className={`p-10 rounded-xs border-2 transition-all duration-700 group flex flex-col items-center gap-6 relative overflow-hidden ${formData.unitSection === 'PRODUCT' ? 'bg-primary-copper/10 border-primary-copper shadow-[0_0_30px_rgba(210,164,120,0.1)]' : 'bg-primary-copper/5 border-primary-copper/20 hover:border-primary-copper/40'}`}
                                        >
                                            <div className={`w-20 h-20 rounded-[28px] flex items-center justify-center transition-all duration-700 ${formData.unitSection === 'PRODUCT' ? 'bg-primary-copper text-white scale-110 shadow-[0_10px_20px_rgba(210,164,120,0.3)]' : 'bg-black/5 text-primary-copper group-hover:bg-black/10'}`}>
                                                <Zap size={32} />
                                            </div>
                                            <div className="text-center">
                                                <span className="text-lg font-black uppercase tracking-tighter text-text-primary italic">Product Units</span>
                                            </div>
                                            {formData.unitSection === 'PRODUCT' && <div className="absolute top-4 right-4 text-primary-copper animate-pulse"><CheckCircle2 size={24} /></div>}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, unitSection: 'SERVICE', unitSubSection: '' }))}
                                            className={`p-10 rounded-xs border-2 transition-all duration-700 group flex flex-col items-center gap-6 relative overflow-hidden ${formData.unitSection === 'SERVICE' ? 'bg-primary-copper/10 border-primary-copper shadow-[0_0_30px_rgba(210,164,120,0.1)]' : 'bg-primary-copper/5 border-primary-copper/20 hover:border-primary-copper/40'}`}
                                        >
                                            <div className={`w-20 h-20 rounded-[28px] flex items-center justify-center transition-all duration-700 ${formData.unitSection === 'SERVICE' ? 'bg-primary-copper text-white scale-110 shadow-[0_10px_20px_rgba(210,164,120,0.3)]' : 'bg-black/5 text-primary-copper group-hover:bg-black/10'}`}>
                                                <Users size={32} />
                                            </div>
                                            <div className="text-center">
                                                <span className="text-lg font-black uppercase tracking-tighter text-text-primary italic">Service Units</span>
                                            </div>
                                            {formData.unitSection === 'SERVICE' && <div className="absolute top-4 right-4 text-primary-copper animate-pulse"><CheckCircle2 size={24} /></div>}
                                        </button>
                                    </div>

                                    {formData.unitSection && (
                                        <div className="animate-fade-in space-y-6 pt-6">
                                            <div className="flex items-center gap-4 mb-2">
                                                <div className="h-[1px] flex-grow bg-black/10"></div>
                                                <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-black/30 whitespace-nowrap">Specific Specialization</label>
                                                <div className="h-[1px] flex-grow bg-black/10"></div>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[340px] overflow-y-auto pr-4 custom-scrollbar p-2">
                                                {(formData.unitSection === 'PRODUCT' ? productUnits : serviceUnits).map((unit, i) => (
                                                    <button
                                                        key={i}
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, unitSubSection: unit }))}
                                                        className={`px-6 py-5 rounded-xs border-2 text-[10px] font-black uppercase tracking-widest text-center transition-all duration-500 flex items-center justify-center min-h-[70px] ${formData.unitSubSection === unit ? 'bg-primary-copper text-white border-primary-copper shadow-[0_10px_20px_rgba(210,164,120,0.2)] scale-[1.02]' : 'bg-black/[0.02] border-black/5 text-black/40 hover:border-black/20 hover:text-text-primary'}`}
                                                    >
                                                        {unit}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-4 pt-8">
                                        <button type="button" onClick={handlePrev} className="btn btn-outline w-14 h-14 !p-0">
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button type="button" onClick={handleNext} disabled={!formData.unitSubSection} className="btn btn-primary flex-grow h-14 disabled:opacity-50">
                                            <span>Continue</span>
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-12 animate-fade-in-up">
                                    <div className="space-y-4">
                                        <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-text-muted pl-2">Personal Statement <span className="text-primary-copper">*</span></label>
                                        <textarea name="whyVolunteer" required value={formData.whyVolunteer} onChange={handleChange} className="w-full h-44 bg-white border border-white/10 rounded-xs p-8 text-black outline-none focus:border-primary-copper/50 focus:bg-white transition-all font-medium text-sm placeholder:text-black/30 resize-none leading-relaxed" placeholder="Tell us why you're passionate about joining the Achievers Summit community..." />
                                    </div>

                                    <div className="space-y-6">
                                        <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-text-muted text-center leading-relaxed max-w-md mx-auto">Will you be available to attend the Volunteer Workshop scheduled for the 27th of February at Alausa, Ikeja, Lagos? <span className="text-primary-copper">*</span></label>
                                        <div className="flex gap-8">
                                            <button
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, availableWorkshop: true, unavailableWhy: '' }))}
                                                className={`flex-1 h-20 rounded-xs border-2 font-black text-xs uppercase tracking-[0.4em] transition-all duration-500 relative flex items-center justify-center group ${formData.availableWorkshop === true ? 'bg-green-500/10 border-green-500 text-green-500 shadow-[0_10px_30px_rgba(34,197,94,0.2)]' : 'bg-black/[0.03] border-black/5 text-black/20 hover:border-black/20'}`}
                                            >
                                                YES
                                                {formData.availableWorkshop === true && <CheckCircle2 size={20} className="absolute right-6 opacity-30 group-hover:opacity-100 transition-opacity" />}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, availableWorkshop: false }))}
                                                className={`flex-1 h-20 rounded-xs border-2 font-black text-xs uppercase tracking-[0.4em] transition-all duration-500 relative flex items-center justify-center group ${formData.availableWorkshop === false ? 'bg-red-500/10 border-red-500 text-red-500 shadow-[0_10px_30px_rgba(239,68,68,0.2)]' : 'bg-black/[0.03] border-black/5 text-black/20 hover:border-black/20'}`}
                                            >
                                                NO
                                                {formData.availableWorkshop === false && <AlertCircle size={20} className="absolute right-6 opacity-30 group-hover:opacity-100 transition-opacity" />}
                                            </button>
                                        </div>
                                    </div>

                                    {formData.availableWorkshop === false && (
                                        <div className="animate-fade-in space-y-4">
                                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-text-muted pl-2">Reason for Unavailability <span className="text-primary-copper">*</span></label>
                                            <textarea name="unavailableWhy" required value={formData.unavailableWhy} onChange={handleChange} className="w-full h-32 bg-black/[0.03] border border-black/10 rounded-xs p-8 text-text-primary outline-none focus:border-primary-copper/50 focus:bg-black/[0.05] transition-all font-medium text-sm placeholder:text-black/10 resize-none leading-relaxed" placeholder="Please provide details..." />
                                        </div>
                                    )}

                                    <div className="p-8 rounded-xs bg-primary-copper/5 border-2 border-primary-copper/10 flex gap-6 items-start relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-copper/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                                        <Info className="flex-shrink-0 text-primary-copper mt-1" size={24} />
                                        <div className="text-[10px] text-text-muted leading-relaxed uppercase font-black tracking-[0.2em] relative z-10">
                                            Kindly check your mail from <span className="text-text-primary">February 20th</span> for notification on application status (check spam folder too). Selected Volunteers are meant to immediately sign the <span className="text-text-primary">'Volunteer Agreement'</span> emailed to them from the 20th of February 2026.
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-8">
                                        <button type="button" onClick={handlePrev} className="btn btn-outline w-14 h-14 !p-0" disabled={isSubmitting}>
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button type="submit" disabled={isSubmitting || formData.availableWorkshop === null || !formData.whyVolunteer} className="btn btn-primary flex-grow h-14 disabled:opacity-50">
                                            <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
                                            {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="py-16 animate-fade-in-up text-center space-y-12">
                                    <div className="w-32 h-32 bg-green-500/10 rounded-xs border-4 border-green-500/20 flex items-center justify-center text-green-500 mx-auto shadow-[0_0_80px_rgba(34,197,94,0.15)] relative group">
                                        <div className="absolute inset-0 bg-green-500/5 rounded-xs animate-ping opacity-30"></div>
                                        <CheckCircle2 size={64} className="relative z-10 group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="space-y-6">
                                        <h3 className="text-5xl font-black text-text-primary italic uppercase tracking-tighter leading-tight">APPLICATION <br /><span className="text-primary-copper">SUCCESSFUL.</span></h3>
                                        <p className="text-text-secondary text-base font-light leading-relaxed max-w-sm mx-auto italic opacity-70">
                                            Your expression of interest has been received. Our team will review your profile for the 2026 Summit.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                        <div className="p-8 rounded-xs bg-black/[0.03] border border-black/10 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-copper/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-1000"></div>
                                            <h4 className="text-[10px] font-black text-primary-copper uppercase tracking-[0.4em] mb-4">Review Timeline</h4>
                                            <p className="text-xs text-text-secondary font-medium leading-relaxed">Systematic review of all applicants begins <span className="text-text-primary">Feb 15th</span>. Final decisions communicated by <span className="text-text-primary">Feb 20th</span>.</p>
                                        </div>
                                        <div className="p-8 rounded-xs bg-black/[0.03] border border-black/10 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-black/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-1000"></div>
                                            <h4 className="text-[10px] font-black text-text-primary uppercase tracking-[0.4em] mb-4">Onboarding</h4>
                                            <p className="text-xs text-text-secondary font-medium leading-relaxed">If selected, you must sign the <span className="text-text-primary">Volunteer Agreement</span> within 48 hours to confirm placement.</p>
                                        </div>
                                    </div>

                                    <button onClick={onBack} className="w-full h-16 rounded-xs border-2 border-black/10 hover:border-black/20 hover:bg-black/5 text-text-muted hover:text-text-primary font-black text-[10px] tracking-[0.4em] transition-all uppercase">
                                        Exit Recruitment Portal
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .glass-panel { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(48px); overflow: hidden; }
                .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
                .animate-fade-in { animation: fadeIn 0.6s ease-out both; }
                .animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes shake {
                    10%, 90% { transform: translate3d(-1px, 0, 0); }
                    20%, 80% { transform: translate3d(2px, 0, 0); }
                    30%, 50%, 70% { transform: translate3d(-3px, 0, 0); }
                    40%, 60% { transform: translate3d(3px, 0, 0); }
                }
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); border-radius: 20px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(210, 164, 120, 0.3); border-radius: 20px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(210, 164, 120, 0.5); }
                .btn { cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
            `}</style>
        </div>
    );
}
