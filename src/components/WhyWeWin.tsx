'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhyWeWin() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const items = [
    {
      id: 1,
      title: 'LCE Battery Tech',
      description: 'More range, more payload, more flights per day, without compromise.',
      details: [
        'Provides lower carbon emissions and a reduced carbon footprint for a more sustainable world.',
        'Makes aerial delivery operations more practical, continuous, and scalable.',
        'Delivers long cycle life and stable charge/discharge performance through a durable cell architecture.',
        'Supports high-intensity operations with fast-charging capability and high peak power output.',
        'Minimizes overheating and performance degradation risks through advanced thermal management and safety architecture.',
        'Enables longer range and higher payload capacity at the same weight thanks to high energy density.',
      ],
      stats: [
        { label: 'Energy Density', value: '30%' },
        { label: 'Flight Range', value: '40%' },
        { label: 'Charging Speed', value: '2x' },
      ],
    },
    {
      id: 2,
      title: "We're bringing intelligence to flight",
      description: 'Navigation that anticipates the city, decisions that stay calm under pressure, and a fleet brain that turns every mission into a repeatable routine.',
      details: [
        'Anticipatory navigation that understands city dynamics and adapts routes in real time.',
        'Calm, fail-safe decision-making that maintains stability even under high-pressure scenarios.',
        'A centralized fleet brain that standardizes missions and continuously improves performance.',
        'Real-time risk assessment that proactively avoids unsafe airspace, weather, and obstacles.',
        'Learning-based optimization that reduces flight time, energy consumption, and operational cost with every mission.',
        'Built-in safety intelligence that enforces autonomous limits, fail-safe behaviors, and regulatory compliance by design.',
      ],
      stats: [
        { label: 'Autonomy Level', value: '90%' },
        { label: 'Faster Routes', value: '25%' },
        { label: 'Safety Rating', value: 'Zero Incidents' },
      ],
    },
    {
      id: 3,
      title: 'MENA/EMEA edge',
      description: 'Region-native execution and partnerships, positioned to scale fastest where demand is accelerating.',
      details: [
        'Region-native execution built around local regulations, infrastructure, and operational realities.',
        'Strong regional partnerships that enable rapid deployment and scalable growth in high-demand markets.',
        'Early positioning in emerging cities optimized for aerial logistics and last-mile delivery.',
        'Fast adaptation and low operational friction in regions where demand is accelerating the fastest.',
        'An integrated technology, operations, and business model designed specifically for MENA and EMEA markets.',
      ],
      stats: [
        { label: 'Market Coverage', value: '15+ countries' },
        { label: 'Local Partners', value: '+15' },
        { label: 'Deployment Speed', value: '2x faster' },
      ],
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Information display */}
          <div className="lg:sticky lg:top-32 h-fit opacity-90">
            <AnimatePresence mode="wait">
              {selectedItem === null ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-slate-300 text-base"
                >
                  Select an item to learn more
                </motion.div>
              ) : (
                <motion.div
                  key={selectedItem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {(() => {
                    const item = items.find(item => item.id === selectedItem);
                    if (!item) return null;

                    return (
                      <>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-4 leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-sm text-slate-500 leading-relaxed mb-8">
                            {item.description}
                          </p>
                        </div>

                        {item.stats && (
                          <div className="grid grid-cols-3 gap-6 pb-8 border-b border-slate-100">
                            {item.stats.map((stat, index) => (
                              <div key={index} className="text-center">
                                <div className="text-xl font-semibold text-blue-500 mb-1.5">
                                  {stat.value}
                                </div>
                                <div className="text-sm text-slate-400 tracking-wide">
                                  {stat.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {item.details && (
                          <div className="space-y-4 pt-2">
                            <h4 className="text-xs font-medium text-slate-600 mb-5">
                              Key Features
                            </h4>
                            <ul className="space-y-4">
                              {item.details.map((detail, index) => (
                                <li key={index} className="flex items-start gap-3.5">
                                  <div className="w-1 h-1 rounded-full bg-blue-400/60 mt-2.5 flex-shrink-0" />
                                  <span className="text-xs text-slate-600 leading-relaxed">
                                    {detail}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right side - Title and items */}
          <div className="flex flex-col">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-16 leading-tight">
              Why can you win with us?
            </h2>

            <div className="space-y-3">
              {items.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                  className="w-full text-left p-5 rounded-3xl bg-white/40 backdrop-blur-lg shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:bg-white/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${selectedItem === item.id
                        ? 'bg-blue-400/15 border border-blue-400/30'
                        : 'bg-slate-50/60 border border-slate-200/40'
                        }`}>
                        <motion.div
                          animate={{ rotate: selectedItem === item.id ? 45 : 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className={`text-xl font-light transition-colors ${selectedItem === item.id ? 'text-blue-500' : 'text-slate-500'
                            }`}
                        >
                          +
                        </motion.div>
                      </div>
                      <span className="text-base font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                        {item.title}
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
