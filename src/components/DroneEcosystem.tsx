'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Internal Sub-Component: IsometricLayer ---
interface IsometricLayerProps {
  zIndex: number;
  yOffset: number;
  isActive: boolean;
  isDimmed: boolean;
  color: string;
  type: 'ui' | 'circuit' | 'base';
}

const IsometricLayer: React.FC<IsometricLayerProps> = ({ zIndex, yOffset, isActive, isDimmed, color, type }) => {
  return (
    <motion.div
      initial={false}
      animate={{
        y: yOffset + (isActive ? -35 : 0),
        scale: isActive ? 1.12 : 1,
        opacity: isDimmed ? 0.25 : 1,
        rotateX: 62,
        rotateZ: -38
      }}
      transition={{ type: 'spring', stiffness: 180, damping: 24 }}
      style={{ zIndex, perspective: 1200 }}
      className="absolute w-80 h-80 flex items-center justify-center pointer-events-none"
    >
      {/* Outer Glow for Active State */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.15 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full"
          />
        )}
      </AnimatePresence>

      <div className={`relative w-[290px] h-[290px] bg-white/70 backdrop-blur-[12px] rounded-[3.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,1)] flex items-center justify-center overflow-hidden border border-white/50`}>

        {/* The Colored Body */}
        <div className={`w-[95%] h-[95%] rounded-[3rem] bg-gradient-to-br ${color} relative overflow-hidden flex items-center justify-center shadow-inner group`}>

          {/* 1. DASHBOARD UI DETAILS (CID) */}
          {type === 'ui' && (
            <div className="w-full h-full p-8 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  <div className="w-12 h-2.5 rounded-full bg-slate-900/10" />
                </div>
                <div className="w-5 h-5 rounded-lg bg-white/50 border border-white/70 shadow-sm" />
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="bg-white/40 rounded-2xl border border-white/60 flex flex-col p-3 gap-2 overflow-hidden relative shadow-sm">
                  <div className="w-full h-1.5 bg-blue-500/30 rounded-full" />
                  <div className="w-3/4 h-1.5 bg-blue-500/20 rounded-full" />
                  <motion.div
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 right-0 h-6 bg-gradient-to-b from-blue-400/30 to-transparent pointer-events-none"
                  />
                </div>
                <div className="bg-slate-900/5 rounded-2xl border border-slate-900/10 flex items-center justify-center">
                  <div className="w-12 h-12 border-[4px] border-blue-500/20 rounded-full border-t-blue-600 animate-spin" />
                </div>
                <div className="col-span-2 bg-white/30 rounded-2xl border border-white/60 flex items-center px-5 h-10 shadow-sm">
                  <div className="flex-1 h-2 bg-slate-200/50 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: ['30%', '90%', '50%', '85%'] }}
                      transition={{ duration: 5, repeat: Infinity }}
                      className="h-full bg-blue-600 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. ALGORITHM CIRCUIT DETAILS (AUTONOMOUS LOGIC) */}
          {type === 'circuit' && (
            <div className="w-full h-full p-6 relative flex items-center justify-center overflow-hidden">
              {/* Microgrid Background */}
              <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-15 p-4">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div key={i} className="border-[0.25px] border-indigo-900/20" />
                ))}
              </div>

              {/* Enhanced Drone Routing Path - Creating Route Feeling */}
              <svg className="absolute inset-0 w-full h-full p-8" viewBox="0 0 100 100">
                {/* The Full Planned Path (Subtle Reference) */}
                <path
                  d="M20,80 L20,40 L50,40 L50,60 L80,60 L80,20"
                  fill="transparent"
                  stroke="rgba(79, 70, 229, 0.05)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Dynamic Path Construction */}
                <motion.path
                  d="M20,80 L20,40 L50,40 L50,60 L80,60 L80,20"
                  fill="transparent"
                  stroke="rgba(99, 102, 241, 0.5)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop"
                  }}
                />

                {/* Fixed High-Tech Waypoints - No fading points as requested */}
                {[[20, 80], [20, 40], [50, 40], [50, 60], [80, 60], [80, 20]].map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt[0]} cy={pt[1]} r="1.2"
                    fill="#4f46e5"
                    className="opacity-40"
                  />
                ))}

                {/* The Tracking Drone "Pilot" Head */}
                <motion.g>
                  {/* Scanning Sweep */}
                  <circle r="8" fill="url(#grad-scanner)" className="opacity-20" />

                  {/* Drone Core */}
                  <circle r="3" fill="#4f46e5" className="shadow-[0_0_8px_rgba(79,70,229,0.8)]" />
                  <circle r="0.8" fill="white" />

                  {/* Directional Indicator */}
                  <path d="M-4,0 L4,0 M0,-4 L0,4" stroke="white" strokeWidth="0.5" opacity="0.5" />

                  <animateMotion
                    path="M20,80 L20,40 L50,40 L50,60 L80,60 L80,20"
                    dur="6s"
                    repeatCount="indefinite"
                    rotate="auto"
                  />
                </motion.g>

                <defs>
                  <radialGradient id="grad-scanner">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>
              </svg>


            </div>
          )}

          {/* 3. FIRMWARE SYSTEM DETAILS (SKYCORE) */}
          {type === 'base' && (
            <div className="w-full h-full p-10 flex flex-col gap-5">
              <div className="flex gap-3">
                <div className="w-10 h-3 bg-slate-900/20 rounded-full" />
                <div className="w-6 h-3 bg-slate-900/10 rounded-full" />
              </div>
              <div className="flex-1 flex flex-col gap-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-5 bg-white/30 rounded-xl flex items-center px-4 border border-white/50 overflow-hidden relative shadow-sm">
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: 'linear' }}
                      className="absolute h-full w-24 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    />
                    <div className="w-1/3 h-1.5 bg-slate-400/30 rounded-full" />
                  </div>
                ))}
              </div>
              <div className="h-12 w-full bg-slate-900/5 rounded-2xl border border-slate-900/5 flex items-center justify-around px-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-slate-400/30" />
                ))}
              </div>
            </div>
          )}

          {/* Premium Overlays */}
          <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
        </div>

        {/* Outer Edge Polish */}
        <div className="absolute inset-0 border border-white rounded-[3.5rem] shadow-[inset_0_2px_2px_rgba(255,255,255,1)]" />
      </div>

      {/* Realistic Dynamic Shadow */}
      <motion.div
        animate={{
          scale: isActive ? 1.45 : 1.15,
          opacity: isDimmed ? 0.01 : (isActive ? 0.12 : 0.05),
          y: isActive ? 25 : 0
        }}
        className="absolute bottom-[-15%] w-[100%] h-24 bg-black blur-[50px] rounded-full transform rotateX(85deg) -z-10"
      />
    </motion.div>
  );
};

// --- Main Component ---
export default function DroneEcosystem() {
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const layers = [
    {
      id: 1,
      title: "Mission CID's",
      subtitle: "Control Interface Dashboard",
      description: "Advanced multi-drone mission control with sub-100ms telemetry relay and real-time AR pilot assistance.",
      side: "right",
      yPos: -170,
      color: "from-blue-500/5 to-blue-600/15",
      accent: "bg-blue-600",
      type: "ui" as const,
    },
    {
      id: 2,
      title: "Auto-Nav Pilot",
      subtitle: "Autonomous Flight & Patrol",
      description: "Auto-Nav Pilot is Gama’s autonomous flight intelligence. It anticipates city dynamics, optimizes routes in real time, and turns every mission into a safe, calm, and repeatable flight routine.",
      side: "left",
      yPos: 0,
      color: "from-indigo-500/5 to-indigo-600/15",
      accent: "bg-indigo-500",
      type: "circuit" as const,
    },
    {
      id: 3,
      title: "System Status",
      subtitle: "Secure & Reliable",
      description: "All our systems are managed with autonomous enhancements, ensuring guaranteed security. Gama is committed to secure and reliable service.",
      side: "right",
      yPos: 170,
      color: "from-slate-400/5 to-slate-600/15",
      accent: "bg-slate-500",
      type: "base" as const,
    }
  ];

  return (
    <div className="min-h-screen w-full bg-white text-slate-900 overflow-hidden flex flex-col relative select-none">
      {/* Background Polish */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#000 1.2px, transparent 1.2px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-100/40 to-indigo-100/40 rounded-full blur-[140px] -z-10" />

      <main className="flex-1 flex flex-col items-center justify-center relative px-4 md:px-6 py-12 md:py-32">
        <div className="relative w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-0">

          {/* Isometric Stack Component */}
          <div className="relative isometric-container w-full max-w-[320px] md:max-w-[550px] aspect-square flex items-center justify-center lg:order-2">
            {layers.map((layer) => (
              <IsometricLayer
                key={layer.id}
                zIndex={60 - (layer.id * 10)}
                yOffset={isMobile ? layer.yPos * 0.6 : layer.yPos}
                isActive={hoveredLayer === layer.id}
                isDimmed={hoveredLayer !== null && hoveredLayer !== layer.id}
                color={layer.color}
                type={layer.type}
              />
            ))}
          </div>

          {/* Sidebar Annotation Blocks */}
          <div className="flex flex-col gap-8 w-full lg:contents lg:order-1">
            {layers.map((layer) => (
              <motion.div
                key={`info-${layer.id}`}
                onMouseEnter={() => setHoveredLayer(layer.id)}
                onMouseLeave={() => setHoveredLayer(null)}
                onClick={() => setHoveredLayer(hoveredLayer === layer.id ? null : layer.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: hoveredLayer === null || hoveredLayer === layer.id ? 1 : 0.4,
                  y: isMobile ? 0 : layer.yPos + 70,
                  scale: hoveredLayer === layer.id ? 1.05 : 1
                }}
                className={`lg:absolute w-full lg:w-[320px] z-30 group cursor-default transition-all duration-500 lg:-translate-y-1/2 
                  ${layer.side === 'left'
                    ? 'lg:text-right lg:right-[calc(50%+260px)]'
                    : 'lg:text-left lg:left-[calc(50%+260px)]'
                  }
                  ${hoveredLayer === layer.id ? 'bg-slate-50 lg:bg-transparent p-6 rounded-2xl lg:p-0' : ''}
                `}
              >
                <div className={`flex flex-col ${layer.side === 'left' ? 'lg:items-end' : 'lg:items-start'}`}>
                  <div className={`flex items-center gap-4 mb-3 md:mb-4 ${layer.side === 'left' ? 'lg:flex-row-reverse' : ''}`}>
                    <div className={`w-1 h-6 md:h-7 ${layer.accent} rounded-full shadow-lg`} />
                    <div className="flex flex-col">
                      <span className="text-[9px] md:text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">Architecture Layer 0{layer.id}</span>
                      <h3 className="text-xl md:text-3xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                        {layer.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-500 text-[12px] md:text-[13px] leading-relaxed font-medium lg:max-w-[280px]">
                    {layer.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 8s ease infinite;
          background-size: 200% auto;
        }
      `}} />
    </div>
  );
}
