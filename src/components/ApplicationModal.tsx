'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobTitle: string;
}

const CHUNK_SIZE = 800000; // ~800KB chunks to stay safe within 1MB limit

export default function ApplicationModal({ isOpen, onClose, jobId, jobTitle }: ApplicationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size exceeds 5MB limit.');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload your CV.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Create main application document
      const appRef = await addDoc(collection(db, 'applications'), {
        ...formData,
        jobId,
        jobTitle,
        fileName: file.name,
        fileType: file.type,
        createdAt: serverTimestamp(),
        status: 'pending'
      });

      // 2. Read file and chunk it
      const base64Data = await readFileAsBase64(file);
      const totalChunks = Math.ceil(base64Data.length / CHUNK_SIZE);
      
      // We'll use a batch for better performance if possible, 
      // but Firestore batches have a 500 operation limit. 
      // For CVs, chunks won't exceed a few dozen.
      const chunksCollection = collection(db, `applications/${appRef.id}/chunks`);
      
      for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, base64Data.length);
        const chunk = base64Data.substring(start, end);
        
        await addDoc(chunksCollection, {
          index: i,
          data: chunk,
          total: totalChunks
        });
      }

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({ fullName: '', email: '', phone: '', message: '' });
        setFile(null);
      }, 3000);

    } catch (err) {
      console.error("Error submitting application:", err);
      setError('An error occurred while submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 backdrop-blur-[2px] bg-slate-900/10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl shadow-slate-900/5 overflow-hidden border border-slate-100"
        >
          {/* Header - More minimal */}
          <div className="px-12 pt-12 pb-6 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Apply for Position</h2>
              <p className="text-[13px] font-medium text-slate-400 mt-1.5">{jobTitle}</p>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-50 text-slate-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="px-12 pb-12">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 text-balance">Application Received</h3>
                <p className="text-[13px] text-slate-400 font-medium">Thank you. Our team will be in touch shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                      <input 
                        required
                        type="text"
                        className="w-full bg-white border-b border-slate-200 py-2.5 focus:outline-none focus:border-blue-600 transition-colors font-medium text-[13px] text-slate-900 placeholder:text-slate-200"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                      <input 
                        required
                        type="email"
                        className="w-full bg-white border-b border-slate-200 py-2.5 focus:outline-none focus:border-blue-600 transition-colors font-medium text-[13px] text-slate-900 placeholder:text-slate-200"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                    <input 
                      required
                      type="tel"
                      className="w-full bg-white border-b border-slate-200 py-2.5 focus:outline-none focus:border-blue-600 transition-colors font-medium text-[13px] text-slate-900 placeholder:text-slate-200"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Introduction</label>
                    <textarea 
                      rows={2}
                      className="w-full bg-white border-b border-slate-200 py-2.5 focus:outline-none focus:border-blue-600 transition-colors font-medium text-[13px] text-slate-900 resize-none placeholder:text-slate-200"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Share a brief introduction..."
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Curriculum Vitae (CV)</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="group cursor-pointer"
                    >
                      <input 
                        type="file" 
                        className="hidden" 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                      />
                      {!file ? (
                        <div className="flex items-center gap-4 py-3.5 px-6 bg-slate-50 rounded-2xl group-hover:bg-slate-100 transition-colors border border-dashed border-slate-200">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400 border border-slate-100 shadow-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                          </div>
                          <span className="text-[12px] font-bold text-slate-500 tracking-tight">Upload PDF or DOCX</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between py-3.5 px-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                          <div className="flex items-center gap-3 text-blue-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="font-bold text-[12px] tracking-tight truncate max-w-[180px]">{file.name}</span>
                          </div>
                          <button 
                            className="text-slate-400 hover:text-red-500 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFile(null);
                            }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>
                      )}
                    </div>
                    {error && <p className="text-red-500 text-[9px] font-bold uppercase tracking-widest ml-1">{error}</p>}
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-4 bg-slate-900 text-white rounded-[1.25rem] font-bold text-[13px] hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group shadow-lg shadow-slate-200"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Applying...</span>
                      </>
                    ) : (
                      <span>Apply Now</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
