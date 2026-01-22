'use client';

import { motion, AnimatePresence } from 'framer-motion';

const UnderDevelopmentModal = ({
    isOpen,
    onClose,
    title = "System Update",
    description = "This module is currently undergoing enhancement. Our engineering team is integrating new features.",
    theme = "blue"
}: {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    theme?: "blue" | "rose"
}) => {
    const isRose = theme === "rose";
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className={`absolute inset-0 backdrop-blur-sm transition-all ${isRose ? 'bg-rose-900/10' : 'bg-slate-900/30'}`}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Texture Effect */}
                        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                        {/* Gradient Blobs */}
                        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 ${isRose ? 'bg-rose-400/20' : 'bg-blue-400/10'}`} />
                        <div className={`absolute bottom-0 left-0 w-32 h-32 rounded-full blur-[40px] translate-y-1/2 -translate-x-1/2 ${isRose ? 'bg-orange-400/20' : 'bg-indigo-400/10'}`} />

                        <div className="relative p-8 flex flex-col items-center text-center">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-white transform rotate-3 ${isRose ? 'bg-gradient-to-tr from-rose-50 to-orange-50' : 'bg-gradient-to-tr from-blue-50 to-indigo-50'}`}>
                                {isRose ? (
                                    <svg className="w-7 h-7 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ) : (
                                    <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-8">
                                {description}
                            </p>

                            <button
                                onClick={onClose}
                                className={`w-full py-3 px-6 text-white text-sm font-medium rounded-xl transition-all duration-200 transform active:scale-[0.98] shadow-lg ${isRose ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/20' : 'bg-slate-900 hover:bg-slate-800 shadow-slate-900/20'}`}
                            >
                                {isRose ? 'Got it!' : 'Close Interface'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default UnderDevelopmentModal;
