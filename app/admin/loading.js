import React from 'react';

export default function Loading() {
    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin w-10 h-10 border-2 border-primary-copper border-t-transparent rounded-full"></div>
                <div className="text-primary-copper font-black text-xs tracking-[0.3em] uppercase animate-pulse">
                    LOADING DASHBOARD...
                </div>
            </div>
        </div>
    );
}
