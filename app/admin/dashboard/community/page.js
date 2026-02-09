"use client";
import React, { useState, useEffect } from 'react';
import {
    Search, Heart, User, Mail, Phone, MapPin,
    Briefcase, GraduationCap, CheckCircle2, Clock,
    MoreHorizontal, XCircle, Filter, Download,
    MessageCircle, Building2
} from 'lucide-react';

export default function CommunityManagement() {
    const [activeTab, setActiveTab] = useState('volunteers'); // 'volunteers' or 'ambassadors'
    const [volunteers, setVolunteers] = useState([]);
    const [ambassadors, setAmbassadors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const endpoint = activeTab === 'volunteers' ? '/api/community/volunteers' : '/api/community/ambassadors';
            const response = await fetch(endpoint);
            if (response.ok) {
                const data = await response.json();
                if (activeTab === 'volunteers') setVolunteers(data || []);
                else setAmbassadors(data || []);
            }
        } catch (error) {
            console.error(`Error fetching ${activeTab}:`, error);
        } finally {
            setLoading(false);
        }
    };

    // Note: Proxied API URL for frontend
    // The GET endpoints were added to backend/routes/community.js
    // I need to make sure they are proxied in the frontend as well or called directly if possible.
    // Looking at previous patterns, I should probably create app/api/community/volunteers/route.js and ambassadors/route.js

    const filteredData = (activeTab === 'volunteers' ? volunteers : ambassadors).filter(item =>
        item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.unitSubSection && item.unitSubSection.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const getStatusStyle = (status) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'APPROVED': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'REJECTED': return 'bg-red-500/10 text-red-500 border-red-500/20';
            default: return 'bg-white/5 text-text-muted border-white/5';
        }
    };

    return (
        <div className="space-y-12 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-2">COMMUNITY <span className="text-gradient NOT-italic text-primary-copper">PIPELINE</span></h1>
                    <p className="text-text-muted text-sm font-bold uppercase tracking-[0.3em]">Review and manage volunteer and ambassador applications.</p>
                </div>

                <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
                    <button
                        onClick={() => setActiveTab('volunteers')}
                        className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'volunteers' ? 'bg-primary-copper text-white shadow-lg shadow-primary-copper/20' : 'text-text-muted hover:text-white'}`}
                    >
                        Volunteers
                    </button>
                    <button
                        onClick={() => setActiveTab('ambassadors')}
                        className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'ambassadors' ? 'bg-primary-copper text-white shadow-lg shadow-primary-copper/20' : 'text-text-muted hover:text-white'}`}
                    >
                        Ambassadors
                    </button>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="relative group w-full md:max-w-md">
                    <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary-copper transition-colors" />
                    <input
                        type="text"
                        placeholder={`SEARCH ${activeTab.toUpperCase()}...`}
                        className="w-full h-14 bg-white/5 border-2 border-white/5 focus:border-primary-copper/30 focus:bg-white/10 rounded-2xl pl-16 pr-6 outline-none text-white text-xs font-bold tracking-widest transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <button className="flex-1 md:flex-none h-14 px-8 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-3 text-text-muted hover:text-white transition-all group">
                        <Filter size={16} className="group-hover:text-primary-copper transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Filter</span>
                    </button>
                    <button className="flex-1 md:flex-none h-14 px-8 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-3 text-text-muted hover:text-white transition-all group">
                        <Download size={16} className="group-hover:text-primary-copper transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Export CSV</span>
                    </button>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="min-h-[400px] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-copper shadow-[0_0_20px_rgba(210,164,120,0.5)]"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {filteredData.length > 0 ? filteredData.map((item) => (
                        <div key={item.id} className="glass-panel p-8 rounded-[40px] border border-white/5 hover:border-primary-copper/30 transition-all duration-500 overflow-hidden group">
                            <div className="flex flex-col lg:flex-row gap-10">
                                {/* Left: Profile */}
                                <div className="flex items-center gap-6 lg:w-1/3">
                                    <div className={`w-20 h-20 rounded-[28px] flex items-center justify-center text-white shadow-lg flex-shrink-0 transition-all group-hover:scale-105 duration-500 ${activeTab === 'volunteers' ? 'bg-primary-copper shadow-primary-copper/20' : 'bg-blue-600 shadow-blue-600/20'}`}>
                                        {activeTab === 'volunteers' ? <Heart size={32} /> : <GraduationCap size={32} />}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter truncate leading-none mb-3">{item.fullName}</h4>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                                                <Mail size={12} className="text-primary-copper" />
                                                <span className="truncate">{item.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                                                <MapPin size={12} className="text-primary-copper" />
                                                <span>{item.state}, {item.lga}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Center: Specific Details */}
                                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-8 border-l border-white/5 lg:pl-10">
                                    {activeTab === 'volunteers' ? (
                                        <>
                                            <div>
                                                <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] mb-2">Unit Assignment</p>
                                                <div className="space-y-1">
                                                    <span className="text-xs font-black text-white uppercase tracking-widest block">{item.unitSubSection}</span>
                                                    <span className="text-[9px] font-bold text-primary-copper uppercase tracking-widest bg-primary-copper/10 px-2 py-0.5 rounded-md inline-block">{item.unitSection}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] mb-2">Workshop Attendance</p>
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${item.availableWorkshop ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                                                    <span className="text-xs font-black text-white uppercase tracking-widest">{item.availableWorkshop ? 'CONFIRMED' : 'UNAVAILABLE'}</span>
                                                </div>
                                                {item.unavailableWhy && <p className="text-[10px] text-text-muted mt-1 italic">"{item.unavailableWhy}"</p>}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] mb-2">Status & Institution</p>
                                                <div className="space-y-1">
                                                    <span className="text-xs font-black text-white uppercase tracking-widest block">{item.institution || item.outsideLagosInst || 'N/A'}</span>
                                                    <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest bg-blue-400/10 px-2 py-0.5 rounded-md inline-block">{item.status}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] mb-2">Activation Program</p>
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${item.availableActivation ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                                                    <span className="text-xs font-black text-white uppercase tracking-widest">{item.availableActivation ? 'AVAILABLE' : 'UNAVAILABLE'}</span>
                                                </div>
                                                {item.unavailableWhy && <p className="text-[10px] text-text-muted mt-1 italic">"{item.unavailableWhy}"</p>}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Right: Status & Actions */}
                                <div className="flex lg:flex-col items-center justify-between lg:justify-center gap-6 lg:w-48 lg:border-l border-white/5 lg:pl-10">
                                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${getStatusStyle(activeTab === 'volunteers' ? item.status : item.applicationStatus)}`}>
                                        <span className="text-[9px] font-black uppercase tracking-widest">{activeTab === 'volunteers' ? item.status : item.applicationStatus}</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-all">
                                            <MessageCircle size={18} />
                                        </button>
                                        <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-all">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Expandable/Motivation area */}
                            <div className="mt-8 pt-8 border-t border-white/5 h-0 overflow-hidden group-hover:h-auto transition-all duration-700">
                                <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] mb-3">Motivation / Professional Background</p>
                                <p className="text-sm font-light text-text-secondary leading-relaxed italic pr-12">
                                    "{item.whyVolunteer || item.profGraduateInfo}"
                                </p>
                                <div className="flex gap-8 mt-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                                            <Phone size={14} />
                                        </div>
                                        <span className="text-xs font-bold text-white tracking-widest uppercase">{item.phone1}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                                            <MessageCircle size={14} />
                                        </div>
                                        <span className="text-xs font-bold text-white tracking-widest uppercase">{item.phone2}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="glass-panel p-20 rounded-[40px] border border-white/5 text-center opacity-50 flex flex-col items-center">
                            <XCircle size={48} className="mb-6 text-text-muted" />
                            <p className="text-sm font-bold text-text-muted uppercase tracking-[0.4em]">NO {activeTab.toUpperCase()} APPLICATIONS FOUND.</p>
                        </div>
                    )}
                </div>
            )}

            <style jsx>{`
                .glass-panel { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(24px); }
                .text-gradient {
                    background: linear-gradient(135deg, var(--primary-copper) 0%, var(--primary-gold) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--primary-copper); }
            `}</style>
        </div>
    );
}
