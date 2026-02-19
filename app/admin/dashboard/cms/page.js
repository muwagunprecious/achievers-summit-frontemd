"use client";
import React, { useState, useEffect } from 'react';
import {
    Plus, Trash2, Save, MoveUp, MoveDown,
    MessageSquare, Users, Building2, GraduationCap,
    CheckCircle2, AlertCircle, Loader2, Globe
} from 'lucide-react';

export default function CMSPage() {
    const [activeTab, setActiveTab] = useState('faq'); // faq, units, institutions, statuses
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    const [faqs, setFaqs] = useState([]);
    const [units, setUnits] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            setLoading(true);
            const [faqRes, unitRes, instRes, statusRes] = await Promise.all([
                fetch('/api/faq'),
                fetch('/api/units'),
                fetch('/api/institutions'),
                fetch('/api/ambassador-status')
            ]);

            if (faqRes.ok) setFaqs(await faqRes.json());
            if (unitRes.ok) setUnits(await unitRes.json());
            if (instRes.ok) setInstitutions(await instRes.json());
            if (statusRes.ok) setStatuses(await statusRes.json());
        } catch (error) {
            console.error('Error fetching CMS data:', error);
            setMessage({ type: 'error', text: 'Failed to load data.' });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (type, item) => {
        setSaving(true);
        try {
            const apiMap = { faq: '/api/faq', unit: '/api/units', institution: '/api/institutions', status: '/api/ambassador-status' };
            const method = item.id ? 'PUT' : 'POST';
            const response = await fetch(apiMap[type], {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            });
            if (response.ok) {
                setMessage({ type: 'success', text: `${type.toUpperCase()} saved successfully!` });
                fetchAllData();
                setTimeout(() => setMessage(null), 3000);
            }
        } catch (error) {
            setMessage({ type: 'error', text: `Failed to save ${type}.` });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (type, id) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        try {
            const apiMap = { faq: '/api/faq', unit: '/api/units', institution: '/api/institutions', status: '/api/ambassador-status' };
            const response = await fetch(`${apiMap[type]}?id=${id}`, { method: 'DELETE' });
            if (response.ok) {
                setMessage({ type: 'success', text: `${type.toUpperCase()} deleted.` });
                fetchAllData();
                setTimeout(() => setMessage(null), 3000);
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Delete failed.' });
        }
    };

    const addItem = (type, itemData = {}) => {
        if (type === 'faq') setFaqs([{ question: '', answer: '', order: 0, isEnabled: true }, ...faqs]);
        if (type === 'unit') setUnits([{ name: '', section: itemData?.section || 'PRODUCT', order: 0 }, ...units]);
        if (type === 'institution') setInstitutions([{ name: '', isLagos: true, order: 0 }, ...institutions]);
        if (type === 'status') setStatuses([{ label: '', category: 'Academic', order: 0 }, ...statuses]);
    };

    const renderFAQTab = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-white uppercase tracking-tighter italic">FAQ <span className="text-primary-copper NOT-italic">MANAGEMENT</span></h3>
                <button onClick={() => addItem('faq')} className="btn btn-primary px-6 py-2 rounded-xl flex items-center gap-2 text-xs font-black tracking-widest transition-all active:scale-95">
                    <Plus size={16} /> ADD QUESTION
                </button>
            </div>
            <div className="space-y-4">
                {faqs.map((faq, idx) => (
                    <div key={faq.id || `new-${idx}`} className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-primary-copper/20 transition-all duration-500 group">
                        <div className="flex gap-6 items-start">
                            <div className="flex-1 space-y-4">
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-primary-copper/50 transition-all font-bold placeholder:text-white/20"
                                    placeholder="Question"
                                    value={faq.question}
                                    onChange={(e) => {
                                        const newList = [...faqs];
                                        newList[idx].question = e.target.value;
                                        setFaqs(newList);
                                    }}
                                />
                                <textarea
                                    className="w-full h-24 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-primary-copper/50 transition-all resize-none placeholder:text-white/20 leading-relaxed"
                                    placeholder="Answer"
                                    value={faq.answer}
                                    onChange={(e) => {
                                        const newList = [...faqs];
                                        newList[idx].answer = e.target.value;
                                        setFaqs(newList);
                                    }}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <button onClick={() => handleSave('faq', faq)} className="w-12 h-12 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all">
                                    <Save size={18} />
                                </button>
                                <button onClick={() => handleDelete('faq', faq.id)} className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderUnitsTab = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-white uppercase tracking-tighter italic">VOLUNTEER <span className="text-primary-copper NOT-italic">UNITS</span></h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {['PRODUCT', 'SERVICE'].map(section => (
                    <div key={section} className="space-y-6">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-xs font-black text-primary-gold uppercase tracking-[0.4em] flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary-copper animate-pulse"></div>
                                {section === 'PRODUCT' ? 'TECHNICAL' : 'SERVICE'} UNITS
                            </h4>
                            <button onClick={() => addItem('unit', { section })} className="w-8 h-8 rounded-lg bg-primary-copper/10 text-primary-copper flex items-center justify-center hover:bg-primary-copper hover:text-white transition-all">
                                <Plus size={16} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {units.filter(u => u.section === section).map((unit, idx) => (
                                <div key={unit.id || `new-${section}-${idx}`} className="flex gap-3 group">
                                    <input
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-xs text-white outline-none focus:border-primary-gold/50 transition-all"
                                        value={unit.name}
                                        onChange={(e) => {
                                            const newList = [...units];
                                            const itemIdx = newList.findIndex(u => u === unit);
                                            newList[itemIdx].name = e.target.value;
                                            setUnits(newList);
                                        }}
                                    />
                                    <button onClick={() => handleSave('unit', unit)} className="text-green-500 hover:scale-110 transition-transform"><Save size={18} /></button>
                                    <button onClick={() => handleDelete('unit', unit.id)} className="text-red-500 hover:scale-110 transition-transform"><Trash2 size={18} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );

    const renderInstitutionsTab = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-white uppercase tracking-tighter italic">INSTITUTION <span className="text-primary-copper NOT-italic">DIRECTORY</span></h3>
                <button onClick={() => addItem('institution')} className="btn btn-primary px-6 py-2 rounded-xl flex items-center gap-2 text-xs font-black tracking-widest transition-all active:scale-95">
                    <Plus size={16} /> ADD INSTITUTION
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {[true, false].map(isLagos => (
                    <div key={isLagos ? 'lagos' : 'other'} className="space-y-6">
                        <h4 className="text-xs font-black text-primary-gold uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary-gold animate-pulse"></div>
                            {isLagos ? 'LAGOS' : 'OUTSIDE LAGOS'}
                        </h4>
                        <div className="space-y-4">
                            {institutions.filter(i => i.isLagos === isLagos).map((inst, idx) => (
                                <div key={inst.id || `new-inst-${idx}`} className="flex gap-3 group">
                                    <input
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-xs text-white outline-none focus:border-primary-gold/50 transition-all"
                                        value={inst.name}
                                        onChange={(e) => {
                                            const newList = [...institutions];
                                            const itemIdx = newList.findIndex(i => i === inst);
                                            newList[itemIdx].name = e.target.value;
                                            setInstitutions(newList);
                                        }}
                                    />
                                    <button onClick={() => handleSave('institution', inst)} className="text-green-500 hover:scale-110 transition-transform"><Save size={18} /></button>
                                    <button onClick={() => handleDelete('institution', inst.id)} className="text-red-500 hover:scale-110 transition-transform"><Trash2 size={18} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderStatusesTab = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-white uppercase tracking-tighter italic">AMBASSADOR <span className="text-primary-copper NOT-italic">ROLES</span></h3>
                <button onClick={() => addItem('status')} className="btn btn-primary px-6 py-2 rounded-xl flex items-center gap-2 text-xs font-black tracking-widest transition-all active:scale-95">
                    <Plus size={16} /> ADD ROLE
                </button>
            </div>
            <div className="grid grid-cols-1 gap-6">
                {statuses.map((stat, idx) => (
                    <div key={stat.id || `new-status-${idx}`} className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-16 h-16 rounded-2xl bg-primary-copper/10 text-primary-copper flex items-center justify-center">
                            {stat.category === 'Academic' ? <GraduationCap size={24} /> : <Building2 size={24} />}
                        </div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-text-muted uppercase tracking-widest">Display Label</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-sm text-white outline-none focus:border-primary-copper/50"
                                    value={stat.label}
                                    onChange={(e) => {
                                        const newList = [...statuses];
                                        newList[idx].label = e.target.value;
                                        setStatuses(newList);
                                    }}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-text-muted uppercase tracking-widest">Internal Category Mapping</label>
                                <select
                                    className="w-full h-[52px] bg-white/5 border border-white/10 rounded-xl px-6 text-sm text-white outline-none focus:border-primary-copper/50"
                                    value={stat.category}
                                    onChange={(e) => {
                                        const newList = [...statuses];
                                        newList[idx].category = e.target.value;
                                        setStatuses(newList);
                                    }}
                                >
                                    <option value="Academic" className="bg-bg-deep">Academic (Student Logic)</option>
                                    <option value="Legacy" className="bg-bg-deep">Legacy (Professional Logic)</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-4 border-l border-white/10 pl-6 h-12 items-center">
                            <button onClick={() => handleSave('status', stat)} className="text-green-500 hover:scale-110 transition-transform"><Save size={20} /></button>
                            <button onClick={() => handleDelete('status', stat.id)} className="text-red-500 hover:scale-110 transition-transform"><Trash2 size={20} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    if (loading) return (
        <div className="min-h-[600px] flex flex-col items-center justify-center gap-6">
            <Loader2 className="animate-spin text-primary-copper" size={64} />
            <p className="text-text-muted text-xs font-black uppercase tracking-[0.5em] animate-pulse">Syncing Content Engine...</p>
        </div>
    );

    return (
        <div className="space-y-12 animate-fade-in pb-20">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-primary-gold/10 rounded-[32px] flex items-center justify-center text-primary-gold relative group transition-all duration-700 hover:scale-105">
                        <div className="absolute inset-0 bg-primary-gold/20 rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Globe size={40} className="relative z-10" />
                    </div>
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-black text-white italic uppercase tracking-tighter leading-none mb-3">CONTENT <span className="text-gradient NOT-italic text-primary-copper">CORE</span></h1>
                        <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            Centralized Media & Data Control Center
                        </p>
                    </div>
                </div>

                <div className="flex bg-white/5 p-2 rounded-2xl border border-white/5 backdrop-blur-xl shrink-0 h-16">
                    {[
                        { id: 'faq', label: 'FAQ', icon: MessageSquare },
                        { id: 'units', label: 'Units', icon: Users },
                        { id: 'institutions', label: 'Institutions', icon: Building2 },
                        { id: 'statuses', label: 'Roles', icon: GraduationCap },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${activeTab === tab.id ? 'bg-primary-copper text-white shadow-xl shadow-primary-copper/30' : 'text-text-muted hover:text-white hover:bg-white/5'}`}
                        >
                            <tab.icon size={16} /> <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {message && (
                <div className={`p-6 rounded-[32px] flex items-center justify-between border animate-slide-up ${message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-500 shadow-[0_0_40px_rgba(34,197,94,0.1)]' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                            {message.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                        </div>
                        <span className="text-xs font-black uppercase tracking-[0.2em]">{message.text}</span>
                    </div>
                    <button onClick={() => setMessage(null)} className="text-[10px] font-black uppercase tracking-widest underline opacity-50 hover:opacity-100 transition-opacity">Dismiss</button>
                </div>
            )}

            <div className="min-h-[600px]">
                {activeTab === 'faq' && renderFAQTab()}
                {activeTab === 'units' && renderUnitsTab()}
                {activeTab === 'institutions' && renderInstitutionsTab()}
                {activeTab === 'statuses' && renderStatusesTab()}
            </div>

            <style jsx>{`
                .glass-panel { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(24px); }
                .text-gradient {
                    background: linear-gradient(135deg, var(--primary-copper) 0%, var(--primary-gold) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                @keyframes slide-up {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
}
