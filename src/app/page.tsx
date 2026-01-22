'use client';

import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import TextSection from "@/components/TextSection";
import ProcessSection from "@/components/ProcessSection";
import DroneEcosystem from "@/components/DroneEcosystem";
import WhyWeWin from "@/components/WhyWeWin";
import DeliveryService from "@/components/DeliveryService";
import InnovationSection from "@/components/InnovationSection";
import ImageSection from "@/components/ImageSection";
import Footer from "@/components/Footer";
import UnderDevelopmentModal from "@/components/UnderDevelopmentModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/hero_bg.png)',
        }}
      >
        {/* Navbar - positioned absolutely over hero */}
        <div className="absolute top-0 left-0 w-full z-20">
          <Navbar />
        </div>

        <div className="relative z-10 max-w-5xl px-6 md:px-16 py-24 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-4 leading-tight max-w-4xl">
            A safer, more sustainable sky.
          </h1>
          <p className="text-lg md:text-xl text-black mb-8 max-w-2xl">
            We are shaping the future with our safe and high-quality technologies. A sustainable sky is possible with autonomous drone deliveries.
          </p>

        </div>
      </section>


      {/* Text Section */}
      <TextSection />

      {/* Process Section */}
      <ProcessSection />

      {/* Engineering Partner Section */}

      {/* Drone Ecosystem Section */}
      <DroneEcosystem />

      {/* Why We Win Section */}
      <WhyWeWin />

      {/* Delivery Service Section */}
      <DeliveryService />

      {/* Innovation Section */}
      <InnovationSection />

      {/* Image Section */}
      <ImageSection />

      {/* Footer */}
      <Footer onUnderDevelopment={() => setIsModalOpen(true)} />

      {/* Global Under Development Modal */}
      <div className="fixed z-[1000]">
        <UnderDevelopmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
}
