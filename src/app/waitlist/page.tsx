'use client';

import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UnderDevelopmentModal from "@/components/UnderDevelopmentModal";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { submitWaitlist, resetSubmitState } from '@/store/waitlistSlice';

export default function WaitlistFormPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error } = useSelector((state: RootState) => state.waitlist);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    companyName: '',
    email: '',
    phone: '',
    industry: '',
    region: '',
    interest: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(submitWaitlist(formData));
  };

  return (
    <div className="min-h-screen bg-[#F4F4F3] text-gray-900 flex flex-col font-sans">

      {/* Navbar Setup */}
      <div className="relative z-50">
        <div className="h-16 md:h-20 bg-[#F4F4F3] w-full fixed top-0 left-0 z-40"></div>
        <Navbar />
      </div>

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-6 pt-24 pb-24 flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-24 relative z-10">

        {/* Left Side: Typography heavy, exactly like the reference */}
        <div className="w-full lg:w-5/12 pt-8 lg:sticky lg:top-32">

          <h1 className="text-4xl md:text-[3.5rem] font-bold text-[#111111] leading-[1.05] tracking-tight mb-8">
            The Future of Your Business Starts Here
          </h1>

          <p className="text-[15px] font-medium text-[#333333] leading-[1.6] mb-12 max-w-[420px]">
            Gama is building the next standard in autonomous delivery. We help businesses and public institutions move critical goods with greater speed, precision, and reliability. Share a few details, and we will be in touch shortly.          </p>

          <div className="space-y-6 text-[15px] font-medium text-[#333333]">
            <p>
              <strong className="font-bold text-[#111111]">Job candidates:</strong> See our{' '}
              <button onClick={() => setIsModalOpen(true)} className="underline underline-offset-2 hover:text-black transition-colors decoration-gray-400">Careers</button> page
            </p>

            <p>
              <strong className="font-bold text-[#111111]">Property owners:</strong> See our{' '}
              <button onClick={() => setIsModalOpen(true)} className="underline underline-offset-2 hover:text-black transition-colors decoration-gray-400">Property Owners</button> page
            </p>

            <p className="leading-[1.6]">
              <strong className="font-bold text-[#111111]">Press inquiries:</strong> See our{' '}
              <button onClick={() => setIsModalOpen(true)} className="underline underline-offset-2 hover:text-black transition-colors decoration-gray-400">Newsroom</button> or email{' '}
              <a href="mailto:media@gamadrones.com" className="underline underline-offset-2 hover:text-black transition-colors decoration-gray-400">media@gamadrones.com</a>
            </p>
          </div>
        </div>

        {/* Right Side: The Form - Matches layout, labels, and sizing exactly */}
        <div className="w-full lg:w-7/12 max-w-[640px] lg:max-w-none pt-8">
          <div className="w-full bg-white rounded-xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100 relative">
            {error && (
               <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-sm text-center font-medium">
                 {error}
               </div>
            )}
            
            {loading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-20 flex items-center justify-center rounded-xl">
                 <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {success ? (
              <div className="py-16 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-5">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#111111] mb-2">Information Submitted</h3>
                <p className="text-[15px] text-[#555555] max-w-[320px] mb-8">
                  Thank you for your interest. A member of our team will contact you soon.
                </p>
                <button
                  onClick={() => {
                    dispatch(resetSubmitState());
                    setFormData({
                      firstName: '', lastName: '', jobTitle: '', companyName: '',
                      email: '', phone: '', industry: '', region: '', interest: '', message: ''
                    });
                  }}
                  className="bg-[#2A2A2A] text-white px-6 py-3 rounded text-[13px] font-bold hover:bg-black transition-colors"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Row 1: First Name / Last Name */}
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-[12px] font-bold text-[#111111]">First name<span className="text-red-500 ml-0.5">*</span></label>
                    <input
                      required
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#DDDDDD] rounded px-3.5 py-2.5 text-[15px] text-[#111111] focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-[12px] font-bold text-[#111111]">Last name<span className="text-red-500 ml-0.5">*</span></label>
                    <input
                      required
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#DDDDDD] rounded px-3.5 py-2.5 text-[15px] text-[#111111] focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Job Title / Company Name */}
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-[12px] font-bold text-[#111111]">Job title<span className="text-red-500 ml-0.5">*</span></label>
                    <input
                      required
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#DDDDDD] rounded px-3.5 py-2.5 text-[15px] text-[#111111] focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-[12px] font-bold text-[#111111]">Company name<span className="text-red-500 ml-0.5">*</span></label>
                    <input
                      required
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#DDDDDD] rounded px-3.5 py-2.5 text-[15px] text-[#111111] focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                {/* Row 3: Email / Phone */}
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-[12px] font-bold text-[#111111]">Email<span className="text-red-500 ml-0.5">*</span></label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#DDDDDD] rounded px-3.5 py-2.5 text-[15px] text-[#111111] focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-[12px] font-bold text-[#111111]">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#DDDDDD] rounded px-3.5 py-2.5 text-[15px] text-[#111111] focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                {/* Industry */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-bold text-[#111111]">Industry</label>
                  <div className="relative">
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#DDDDDD] rounded px-3.5 py-3 text-[15px] text-[#555555] focus:outline-none focus:border-black transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled hidden>Please Select</option>
                      <option value="healthcare">Healthcare & Medical</option>
                      <option value="logistics">Logistics & E-commerce</option>
                      <option value="government">Government & Defense</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Region */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-bold text-[#111111]">Region<span className="text-red-500 ml-0.5">*</span></label>
                  <div className="relative">
                    <select
                      name="region"
                      required
                      value={formData.region}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#DDDDDD] rounded px-3.5 py-3 text-[15px] text-[#555555] focus:outline-none focus:border-black transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled hidden>Please Select</option>
                      <option value="North America">North America</option>
                      <option value="Europe">Europe</option>
                      <option value="MENA">MENA (Middle East & N. Africa)</option>
                      <option value="Asia">Asia Pacific</option>
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Interest Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-bold text-[#111111]">Tell us more about why you're interested in Gama.<span className="text-red-500 ml-0.5">*</span></label>
                  <div className="relative">
                    <select
                      name="interest"
                      required
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#DDDDDD] rounded px-3.5 py-3 text-[15px] text-[#555555] focus:outline-none focus:border-black transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled hidden>Please Select</option>
                      <option value="fleet">Deploying an autonomous fleet</option>
                      <option value="partnership">Technology Partnership</option>
                      <option value="investment">Investment / Media</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Textarea */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-bold text-[#111111]">What are you looking to do with on-demand delivery?</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-white border border-[#DDDDDD] rounded px-3.5 py-3 text-[15px] text-[#111111] focus:outline-none focus:border-black transition-colors resize-y min-h-[100px]"
                  />
                </div>

                {/* Terms text */}
                <div className="text-[11px] leading-[1.6] text-[#666666] mt-2 mb-2">
                  By clicking “Submit Information,” you agree to receive communications and promotions from Gama. Our{' '}
                  <button type="button" onClick={() => setIsModalOpen(true)} className="underline underline-offset-2 hover:text-black transition-colors">Privacy Policy</button>{' '}
                  explains how we collect, use, and disclose personal information. This site is protected by reCAPTCHA and the Google{' '}
                  <button type="button" onClick={() => setIsModalOpen(true)} className="underline underline-offset-2 hover:text-black transition-colors">Privacy Policy</button>{' '}
                  and{' '}
                  <button type="button" onClick={() => setIsModalOpen(true)} className="underline underline-offset-2 hover:text-black transition-colors">Terms</button>{' '}
                  apply.
                </div>

                {/* Submit button */}
                <div>
                  <button
                    type="submit"
                    className="bg-[#2A2A2A] hover:bg-black text-[13px] text-white font-bold py-3.5 px-6 rounded transition-colors inline-block"
                  >
                    Submit Information
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <div className="relative z-20 mt-auto bg-white">
        <Footer onUnderDevelopment={() => setIsModalOpen(true)} />
      </div>

      <div className="fixed z-[1000]">
        <UnderDevelopmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
}
