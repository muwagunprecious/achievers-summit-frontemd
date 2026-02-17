"use client";
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: "What is the Achievers Summit conference and why is everyone talking about it?",
        answer: "The Achievers Summit is one of Emmanuel Agida International (EAi) flagship leadership and entrepreneurship platform’s where Africa’s emerging leaders, entrepreneurs, and change-makers come together to learn, connect, and level up.\nThink of learning, connecting, and growing all in one place."
    },
    {
        question: "Who can attend the Achievers Summit conference?",
        answer: "Are you passionate about growth, and making an impact in shaping Africa’s future? This Summit is for YOU. Whether you’re a student, creative, young professional, entrepreneur, innovator, policymaker, or corporate leader."
    },
    {
        question: "Do I need to already be “made” to attend?",
        answer: "The Achievers summit conference is for anyone becoming an achiever, not just those who are already made."
    },
    {
        question: "What makes the Achievers Summit conference Unique/special?",
        answer: "This is more than just talks. This is a mix of leadership, entrepreneurship, policy, creativity, and real opportunities. A forum where ideas will meet action and people meet opportunities.\nYou’ll leave not just inspired but ready to act. You definitely don’t want to miss it!"
    },
    {
        question: "When and where will the Achievers summit conference hold?",
        answer: "The Achievers summit conference will be held in Lagos, Nigeria on 11th - 12th August, 2026. Time and final venue details will be officially announced to attendees."
    },
    {
        question: "What tangible value will I get from attending?",
        answer: "You stand the chance to gain practical skills, connections, mentorship, insights into policy and business, career pathways, and get direct access to decision makers, the impact is enormous.\nThis is where your next big move can start. Come see for yourself!"
    },
    {
        question: "Who are the speakers and mentors?",
        answer: "A list of experienced leaders across business, governance, innovation, and the creative economy. People actively shaping Africa’s narrative. Visit; www.achieverssummit.com.ng/speakers for more updates coming soon."
    },
    {
        question: "Can I volunteer for this conference?",
        answer: "Yes. We're seeking result driven volunteers for structured roles. Individuals looking to gain hands-on experience and behind the scene access to a high-impact Summit. Visit; www.achieverssummit.com.ng to volunteer."
    },
    {
        question: "Is there an ambassadorship opportunity?",
        answer: "Yes. Passionate young leaders can apply to become Achievers Summit Ambassadors via; www.achieversummit.com.ng/community"
    },
    {
        question: "Will there be networking opportunity?",
        answer: "Certainly. The summit is designed for meaningful connections and collaborations. Expect meaningful conversations and collaborations with mentors, investors, policymakers, and attendees during the conference."
    },
    {
        question: "Is there a nomination opportunity at The Achievers Summit?",
        answer: "Yes. The Summit allows the public to nominate outstanding young leaders and changemakers for recognition. Nominations can be submitted via; www.achieverssummit.com.ng"
    },
    {
        question: "Is entry free or paid?",
        answer: "There are different ticket classes— (from REGULAR to EXCLUSIVE BIZJET), you can choose what works for you. Your ticket class gives access to Keynote & plenary sessions, masterclasses, exhibition arena, deal rooms, a Private Dinner & Award Night, and the conference full experience. Secure your spot now!"
    },
    {
        question: "How do I register?",
        answer: "To register, visit www.achieverssummit.com.ng. Please note there is limited slots capacity of 5000+ Physical Attendees & 25000+Virtual Audience. So hurry now to secure your spot."
    },
    {
        question: "Can I attend even if I’m not in Lagos?",
        answer: "Yes. There are virtual participation options for attendees outside Lagos or Nigeria. The 2026 edition blends physical participation with digital amplification. You can join from anywhere."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section id="faq" className="py-24 bg-bg-deep relative overflow-hidden">
            <div className="container relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="text-primary-copper font-black text-xs tracking-widest uppercase mb-4">Common Questions</div>
                    <h2 className="text-4xl md:text-5xl text-white mb-6 italic leading-tight uppercase font-black tracking-tighter">
                        Frequently <span className="text-gradient NOT-italic block">Asked.</span>
                    </h2>
                    <p className="text-text-secondary text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                        Curious about the summit? We've compiled the most important details for our 2026 attendees.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`relative overflow-hidden transition-all duration-700 rounded-[24px] border border-white/10 ${openIndex === index ? 'shadow-2xl shadow-primary-copper/20' : ''}`}
                            style={{
                                background: openIndex === index ? 'rgba(120, 58, 40, 0.15)' : 'rgba(0, 0, 0, 0.4)',
                                backdropFilter: 'blur(40px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(40px) saturate(180%)'
                            }}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between text-left group p-8 md:p-10 gap-6 bg-transparent border-none outline-none appearance-none"
                            >
                                <span className={`text-xl md:text-2xl font-black italic tracking-tighter uppercase transition-all duration-500 ${openIndex === index ? 'text-white' : 'text-white/90 group-hover:text-white'}`}>
                                    {faq.question}
                                </span>
                                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border ${openIndex === index ? 'rotate-180 bg-primary-copper border-primary-copper text-white shadow-lg shadow-primary-copper/40' : 'bg-white/5 border-white/10 text-white group-hover:bg-white/10'}`}>
                                    <ChevronDown size={24} />
                                </div>
                            </button>

                            <div
                                className={`transition-all duration-700 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="px-8 md:px-10 pb-12">
                                    <div className="text-text-secondary text-lg md:text-xl leading-relaxed whitespace-pre-line font-medium border-l border-white/20 pl-8">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <div className="inline-flex flex-col items-center">
                        <p className="text-text-muted text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                            <HelpCircle size={16} className="text-primary-copper" />
                            Still have more questions?
                        </p>
                        <a
                            href="mailto:info@achieverssummit.com.ng"
                            className="btn btn-primary !py-4 !px-12 !text-xs tracking-[0.4em] shadow-2xl shadow-primary-copper/30 transition-all font-black"
                        >
                            CONTACT SUPPORT
                        </a>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .text-gradient {
                    background: linear-gradient(135deg, #783A28 0%, #4A2419 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
            `}</style>
        </section>
    );
}
