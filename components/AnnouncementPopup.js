"use client";
import { useState, useEffect } from 'react';
import { X, Bell } from 'lucide-react';

export default function AnnouncementPopup() {
    const [popup, setPopup] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        fetchActivePopup();
    }, []);

    const fetchActivePopup = async () => {
        try {
            const response = await fetch('/api/popups');
            const data = await response.json();

            if (data.popups && data.popups.length > 0) {
                const latestPopup = data.popups[0];
                setPopup(latestPopup);
                setIsVisible(true);

                // Auto-dismiss after duration
                if (latestPopup.duration > 0) {
                    setTimeout(() => {
                        setIsVisible(false);
                    }, latestPopup.duration);
                }
            }
        } catch (error) {
            console.error('Failed to fetch popup:', error);
        }
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible || !popup) return null;

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-fade-in">
            <div className="bg-white border-2 border-primary-copper/20 rounded-xs p-8 max-w-md w-full relative shadow-[0_0_80px_rgba(120,58,40,0.1)] animate-scale-in">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/5 hover:bg-black/10 rounded-full transition-all text-text-primary border border-black/10"
                >
                    <X size={16} />
                </button>

                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-copper/10 rounded-full flex items-center justify-center">
                        <Bell className="text-primary-copper" size={20} />
                    </div>
                    <h3 className="text-xl font-black text-text-primary uppercase italic tracking-tight">{popup.title}</h3>
                </div>

                <p className="text-text-muted leading-relaxed mb-6 whitespace-pre-line">
                    {popup.body}
                </p>

                {popup.ctaText && popup.ctaLink && (
                    <a
                        href={popup.ctaLink}
                        className="btn btn-primary w-full"
                    >
                        {popup.ctaText}
                    </a>
                )}
            </div>
        </div>
    );
}
