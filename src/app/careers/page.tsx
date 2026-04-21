'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UnderDevelopmentModal from '@/components/UnderDevelopmentModal';
import ApplicationModal from '@/components/ApplicationModal';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDevModal, setShowDevModal] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null); // Changed type to Job | null
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const jobsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Job[];
        setJobs(jobsList);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApplyClick = (e: React.MouseEvent, job: Job) => {
    e.stopPropagation();
    setSelectedJob(job);
    setShowAppModal(true);
  };

  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const paginatedJobs = jobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      {/* Corporate Hero Section - Refined */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        {/* Soft background accents */}
        <div className="absolute top-0 left-0 w-full h-full bg-white -z-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/20 to-transparent -z-10" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50/30 rounded-full blur-3xl -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:40px_40px] opacity-[0.15] -z-10" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100/50 rounded-full mb-10"
            >
              <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Careers at GAMA</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-slate-900 mb-10 tracking-tight leading-[1.05]"
            >
              Help us engineer the <br />
              <span className="text-slate-400">new standard of flight.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col md:flex-row md:items-center gap-10"
            >
              <p className="text-lg text-slate-500 max-w-sm leading-relaxed font-medium">
                We are a mission-driven team building autonomous aerial systems that define the future of logistics.
              </p>
              <div className="hidden md:block h-12 w-[1px] bg-slate-200" />
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-slate-900">10+</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Hubs</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-slate-900">24/7</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Operational Focus</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Structured Job List Section */}
      <section className="py-24 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Open Opportunities</h2>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Operations</span>
              <div className="h-4 w-[1px] bg-slate-200" />
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{jobs.length} Positions</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
            {/* Header Row - Desktop Only */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-10 py-5 bg-slate-50/50 border-b border-slate-100">
              <div className="col-span-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role Title</div>
              <div className="col-span-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Department</div>
              <div className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</div>
              <div className="col-span-2 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right px-4">Type</div>
            </div>

            <div className="divide-y divide-slate-100">
              {loading ? (
                <div className="py-32 flex flex-col items-center justify-center">
                  <div className="w-8 h-8 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accessing Career Database</p>
                </div>
              ) : jobs.length === 0 ? (
                <div className="py-24 text-center">
                  <p className="text-slate-400 font-medium italic">All flight paths are currently filled. Follow us for updates.</p>
                </div>
              ) : (
                paginatedJobs.map((job) => (
                  <div key={job.id} className="group transition-all duration-300">
                    <div
                      onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 md:px-10 py-8 items-center cursor-pointer hover:bg-slate-50/80 transition-colors"
                    >
                      <div className="col-span-12 md:col-span-5">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {job.title}
                        </h3>
                      </div>
                      <div className="col-span-12 md:col-span-3">
                        <span className="inline-flex md:contents px-3 py-1 bg-slate-100 md:bg-transparent rounded-full md:rounded-none text-xs font-semibold text-slate-600 md:text-slate-500 uppercase md:normal-case">
                          {job.department}
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-2">
                        <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                          <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          {job.location}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-2 md:text-right flex items-center justify-between md:justify-end gap-6">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{job.type}</span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 
                          ${expandedJob === job.id ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'}
                        `}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedJob === job.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                          className="overflow-hidden bg-slate-50/30"
                        >
                          <div className="px-6 md:px-10 pb-12 pt-4">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                              <div className="lg:col-span-8">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-6">Detailed Description</h4>
                                <div
                                  className="html-content text-slate-600 leading-relaxed"
                                  dangerouslySetInnerHTML={{ __html: job.description }}
                                />
                              </div>
                              <div className="lg:col-span-4 border-l border-slate-100 pl-0 lg:pl-10 space-y-10">
                                <div>
                                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-6">Core Requirements</h4>
                                  <ul className="space-y-4">
                                    {job.requirements.map((req, i) => (
                                      <li key={i} className="flex gap-3 text-sm text-slate-600 font-medium leading-relaxed">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                                        {req}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <button
                                  onClick={(e) => handleApplyClick(e, job)}
                                  className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all hover:shadow-xl hover:shadow-slate-200 active:scale-[0.98]"
                                >
                                  Submit Application
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))
              )}
            </div>

            {/* Pagination UI - Simplified & Minimal */}
            {!loading && totalPages > 1 && (
              <div className="my-6 pt-3 border-t border-slate-100 flex items-center justify-center gap-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-900 transition-colors disabled:opacity-20"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6" /></svg>
                </button>

                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-full text-[13px] font-bold transition-all ${currentPage === i + 1 ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-900'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-900 transition-colors disabled:opacity-20"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18l6-6-6-6" /></svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Building for the Frontier Section */}
      <section className="py-32 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end mb-24">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-8 h-[1px] bg-blue-600" />
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Engineering Impact</span>
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                Building for the <br />
                <span className="text-slate-400 font-medium italic">unmapped frontier.</span>
              </h2>
	            </div>
	            <p className="text-lg text-slate-500 leading-relaxed max-w-lg pb-2">
	              We aren&apos;t just scaling technology; we are defining a new category of autonomous infrastructure. At GAMA, you&apos;ll solve problems that don&apos;t yet have an answer key.
	            </p>
	          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Technical Complexity",
                desc: "Solve high-stakes challenges in computer vision, edge computing, and redundant aerospace systems. We value engineering rigor over quick fixes.",
                tag: "Autonomy"
              },
              {
                title: "Global Reach",
                desc: "Our systems connect regional hubs and vital supply chains. Your work directly impacts mission-critical logistics across the globe.",
                tag: "Operations"
              },
              {
                title: "Accelerated Growth",
                desc: "We operate with extreme ownership. You'll lead projects from concept to flight, supported by a world-class team of industry experts.",
                tag: "Mentorship"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-10 bg-slate-50/50 rounded-[2rem] border border-slate-100 hover:border-blue-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500"
              >
                <div className="text-[9px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-6">{item.tag}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer onUnderDevelopment={() => setShowDevModal(true)} />
      {showDevModal && <UnderDevelopmentModal isOpen={showDevModal} onClose={() => setShowDevModal(false)} />}

      {showAppModal && selectedJob && (
        <ApplicationModal
          isOpen={showAppModal}
          onClose={() => setShowAppModal(false)}
          jobId={selectedJob.id}
          jobTitle={selectedJob.title}
        />
      )}
    </div>
  );
}
