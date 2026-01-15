"use client";
import React from 'react';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';

export default function AboutSummit() {
    return (
        <section id="about-summit" className="py-32 bg-midnight-black relative overflow-hidden border-t border-white/5">
            <div className="motif-bg opacity-5"></div>

            <div className="container relative z-10">
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-tight mt-2">
                    "Redefining the <br />
                    <span className="text-gradient NOT-italic">African Narrative"</span>
                </h3>
            </div>
        </div>
                        </div >

        {/* Decorative background element */ }
        < div className = "absolute -bottom-6 -right-6 w-32 h-32 border border-white/5 rounded-[48px] -z-10" ></div >
                    </div >
                </div >
            </div >

        <style jsx>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(40px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                }
                .text-gradient {
                    background: linear-gradient(to right, #ffffff, var(--primary-copper));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
        </section >
    );
}
