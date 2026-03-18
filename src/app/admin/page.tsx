'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchWaitlists, WaitlistData } from '@/store/adminWaitlistSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuth } from '@/context/AuthContext';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy, Timestamp } from 'firebase/firestore';

interface Job {
  id?: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  createdAt: any;
}

interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  jobId: string;
  jobTitle: string;
  fileName: string;
  fileType: string;
  status: string;
  createdAt: any;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data: waitlistData, loading: waitlistLoading, error: waitlistError } = useSelector((state: RootState) => state.adminWaitlist);
  const { user, loading: authLoading } = useAuth();

  // Navigation State
  const [activeTab, setActiveTab] = useState<'waitlist' | 'jobs' | 'applications'>('waitlist');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Jobs State
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [jobForm, setJobForm] = useState<Omit<Job, 'id' | 'createdAt'>>({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: ['']
  });

  // Selected Request State for Modal
  const [selectedRequest, setSelectedRequest] = useState<WaitlistData | null>(null);

  // Applications State
  const [applications, setApplications] = useState<Application[]>([]);
  const [appsLoading, setAppsLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [cvReconstructing, setCvReconstructing] = useState(false);

  useEffect(() => {
    if (user && activeTab === 'waitlist') {
      dispatch(fetchWaitlists());
    }
    if (user && activeTab === 'jobs') {
      fetchJobs();
    }
    if (user && activeTab === 'applications') {
      fetchApplications();
    }
  }, [user, activeTab, dispatch]);

  const fetchApplications = async () => {
    setAppsLoading(true);
    try {
      const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const appsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Application[];
      setApplications(appsList);
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setAppsLoading(false);
    }
  };

  const handleDeleteApplication = async (appId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this application? This will also remove all CV chunks.")) return;

    try {
      // 1. Delete chunks sub-collection
      const chunksRef = collection(db, `applications/${appId}/chunks`);
      const chunksSnap = await getDocs(chunksRef);
      const deletePromises = chunksSnap.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);

      // 2. Delete main application document
      await deleteDoc(doc(db, 'applications', appId));
      
      setApplications(prev => prev.filter(app => app.id !== appId));
      if (selectedApp?.id === appId) setSelectedApp(null);
    } catch (err) {
      console.error("Error deleting application:", err);
      alert("Failed to delete application.");
    }
  };

  const fetchJobs = async () => {
    setJobsLoading(true);
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
      setJobsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setAuthError(err.message || 'Invalid credentials');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  const handleCreateOrUpdateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingJob?.id) {
        await updateDoc(doc(db, 'jobs', editingJob.id), {
          ...jobForm,
          updatedAt: Timestamp.now()
        });
      } else {
        await addDoc(collection(db, 'jobs'), {
          ...jobForm,
          createdAt: Timestamp.now()
        });
      }
      setIsJobModalOpen(false);
      setEditingJob(null);
      setJobForm({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: [''] });
      fetchJobs();
    } catch (err) {
      console.error("Error saving job:", err);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (confirm('Are you sure you want to delete this job posting?')) {
      try {
        await deleteDoc(doc(db, 'jobs', id));
        fetchJobs();
      } catch (err) {
        console.error("Error deleting job:", err);
      }
    }
  };

  const handleDownloadCV = async (app: Application) => {
    setCvReconstructing(true);
    try {
      const chunksRef = collection(db, `applications/${app.id}/chunks`);
      const chunksSnap = await getDocs(chunksRef);
      const chunks = chunksSnap.docs
        .map(doc => doc.data() as { index: number, data: string })
        .sort((a, b) => a.index - b.index);
      
      const fullBase64 = chunks.map(c => c.data).join('');
      
      // Convert base64 to blob
      const res = await fetch(fullBase64);
      const blob = await res.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = app.fileName || 'cv_download';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Error downloading CV:", err);
      alert("Failed to reconstruct CV. Please try again.");
    } finally {
      setCvReconstructing(false);
    }
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // If NOT authenticated, show login form
  if (!user) {
    return (
      <div className="min-h-screen bg-[#F4F4F3] flex flex-col items-center justify-center p-4 md:p-6 font-sans text-gray-900">
        <div className="w-full max-w-[420px] bg-white p-8 md:p-12 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center">

          <div className="flex justify-center mb-10 w-full relative">
            <Link href="/" className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors" title="Back to Home">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </Link>
            <img src="/gama-logo.png" alt="GAMA" className="h-10 md:h-12 w-auto" />
          </div>

          <div className="w-full mb-8 text-center text-left">
            <h1 className="text-2xl font-bold text-[#111111] mb-2">Control Panel</h1>
            <p className="text-[14px] font-medium text-[#555555]">Sign in to access secure resources.</p>
          </div>

          {authError && (
            <div className="w-full mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded text-[13px] text-center font-bold">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5 w-full">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-[#111111]">Email<span className="text-red-500 ml-0.5">*</span></label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-[#DDDDDD] rounded px-3.5 py-3 text-[15px] text-[#111111] focus:outline-none focus:border-black transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-[#111111]">Password<span className="text-red-500 ml-0.5">*</span></label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-[#DDDDDD] rounded px-3.5 py-3 text-[15px] text-[#111111] focus:outline-none focus:border-black transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2A2A2A] hover:bg-black text-[14px] text-white font-bold py-3.5 px-6 rounded transition-colors mt-4"
            >
              Secure login
            </button>
          </form>

          <p className="text-[11px] font-medium text-gray-400 mt-10 text-center">
            Restricted Access. System monitored.
          </p>
        </div>
      </div>
    );
  }

  // If authenticated, show dashboard
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900 flex flex-col">
      {/* Admin Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-8">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </button>
            <img src="/gama-logo.png" alt="GAMA" className="h-7 md:h-8 w-auto" />
            <span className="hidden xs:inline-block text-[10px] md:text-sm font-bold bg-slate-100 text-slate-600 px-2 md:px-3 py-1 rounded-full uppercase tracking-wider">
              Control Panel
            </span>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => {
                if (activeTab === 'waitlist') dispatch(fetchWaitlists());
                if (activeTab === 'jobs') fetchJobs();
                if (activeTab === 'applications') fetchApplications();
              }}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              <span className="hidden sm:inline">Refresh Data</span>
            </button>
            <div className="hidden sm:block w-px h-5 bg-slate-200"></div>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12 w-full flex flex-col lg:flex-row gap-8 relative">
        {/* Sidebar Overlay - Mobile */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar Navigation */}
        <aside className={`
          fixed inset-y-0 left-0 w-64 bg-white z-40 lg:relative lg:inset-0 transform lg:transform-none transition-transform duration-300 ease-in-out lg:bg-transparent lg:w-64 shrink-0
          ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-6 lg:p-0">
            <div className="lg:hidden flex items-center justify-between mb-8">
              <img src="/gama-logo.png" alt="GAMA" className="h-6 w-auto" />
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-slate-400"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => { setActiveTab('waitlist'); setIsMobileMenuOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm w-full text-left transition-colors ${activeTab === 'waitlist' ? 'bg-black text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <svg className={`w-5 h-5 ${activeTab === 'waitlist' ? 'text-gray-400' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                Waitlist Requests
              </button>
              <button
                onClick={() => { setActiveTab('jobs'); setIsMobileMenuOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm w-full text-left transition-colors ${activeTab === 'jobs' ? 'bg-black text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <svg className={`w-5 h-5 ${activeTab === 'jobs' ? 'text-gray-400' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Job Postings
              </button>
              <button
                onClick={() => { setActiveTab('applications'); setIsMobileMenuOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm w-full text-left transition-colors ${activeTab === 'applications' ? 'bg-black text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <svg className={`w-5 h-5 ${activeTab === 'applications' ? 'text-gray-400' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                Applications
              </button>
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[600px]">

          {/* Header */}
          <div className="px-6 md:px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between bg-white border-b border-slate-100 gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                {activeTab === 'waitlist' ? 'Waitlist Requests' : activeTab === 'jobs' ? 'Job Postings' : 'Job Applications'}
              </h2>
              <p className="text-xs md:text-sm text-slate-500 mt-1 font-medium">
                {activeTab === 'waitlist'
                  ? 'Manage and review incoming pre-order applications'
                  : activeTab === 'jobs' 
                    ? 'Manage career opportunities at GAMA Drones'
                    : 'Review candidate submissions and CVs'}
              </p>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-3 md:gap-4">
              {activeTab === 'jobs' && (
                <button
                  onClick={() => {
                    setEditingJob(null);
                    setJobForm({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: [''] });
                    setIsJobModalOpen(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-colors shadow-sm whitespace-nowrap"
                >
                  <span className="hidden xs:inline">+ </span>New Job
                </button>
              )}
              <div className="bg-slate-900 text-white px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold shadow-sm">
                Total: {activeTab === 'waitlist' ? (waitlistData?.length || 0) : activeTab === 'jobs' ? jobs.length : applications.length}
              </div>
            </div>
          </div>

          {/* Table Area */}
          <div className="flex-1 overflow-x-auto">
            {activeTab === 'waitlist' ? (
              <>
                {waitlistLoading ? (
                  <div className="h-full w-full flex flex-col items-center justify-center py-32 text-slate-400">
                    <div className="w-8 h-8 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin mb-4" />
                    <p className="font-medium text-sm">Loading requests...</p>
                  </div>
                ) : waitlistError ? (
                  <div className="h-full w-full flex flex-col items-center justify-center p-12 text-center">
                    <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Error Loading Data</h3>
                    <p className="text-slate-500 mb-6 text-sm">{waitlistError}</p>
                    <button onClick={() => dispatch(fetchWaitlists())} className="px-4 py-2 bg-slate-900 text-white rounded text-sm font-medium hover:bg-slate-800">Try Again</button>
                  </div>
                ) : waitlistData && waitlistData.length === 0 ? (
                  <div className="h-full w-full flex flex-col items-center justify-center py-32 text-center px-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                      <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <h3 className="text-base font-bold text-slate-700 mb-1">No requests yet</h3>
                    <p className="text-sm text-slate-500">When users submit the waitlist form, they will appear here.</p>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left">Contact Info</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left">Company</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left">Primary Interest</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left">Location</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 bg-white">
                      {waitlistData && waitlistData.map((request, idx) => (
                        <tr
                          key={request.id || idx}
                          onClick={() => setSelectedRequest(request)}
                          className="hover:bg-slate-50 transition-colors group cursor-pointer"
                        >
                          <td className="px-6 md:px-8 py-4 align-middle">
                            <div className="font-bold text-slate-900 text-[14px] group-hover:text-black transition-colors truncate max-w-[120px] xs:max-w-none">{request.firstName} {request.lastName}</div>
                            <div className="text-[12px] text-slate-500 mt-0.5 truncate max-w-[120px] xs:max-w-none">{request.email}</div>
                          </td>
                          <td className="hidden sm:table-cell px-8 py-4 align-middle">
                            <div className="font-semibold text-slate-800 text-[14px]">{request.companyName}</div>
                          </td>
                          <td className="hidden md:table-cell px-8 py-4 align-middle">
                            <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#F4F4F3] border border-slate-200 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                              {request.interest === 'fleet' ? 'Fleet Deploy' :
                                request.interest === 'partnership' ? 'Partnership' :
                                  request.interest === 'investment' ? 'Investment' : request.interest || 'Unknown'}
                            </span>
                          </td>
                          <td className="hidden lg:table-cell px-8 py-4 align-middle">
                            <div className="text-[14px] text-slate-800 font-medium">{request.region || 'N/A'}</div>
                          </td>
                          <td className="px-6 md:px-8 py-4 align-middle text-right">
                            <div className="text-[12px] md:text-[13px] text-slate-500 font-medium whitespace-nowrap">
                              {request.createdAt ? new Date(request.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recent'}
                            </div>
                            <div className="mt-1 text-slate-900 lg:opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end gap-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider">View</span>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            ) : activeTab === 'jobs' ? (
              <>
                {jobsLoading ? (
                  <div className="h-full w-full flex flex-col items-center justify-center py-32 text-slate-400">
                    <div className="w-8 h-8 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin mb-4" />
                    <p className="font-medium text-sm">Loading jobs...</p>
                  </div>
                ) : jobs.length === 0 ? (
                  <div className="h-full w-full flex flex-col items-center justify-center py-32 text-center px-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                      <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <h3 className="text-base font-bold text-slate-700 mb-1">No job postings yet</h3>
                    <p className="text-sm text-slate-500">Add your first job listing to start recruiting.</p>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                          <th className="px-6 md:px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left">Job Title</th>
                          <th className="hidden sm:table-cell px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left">Department</th>
                          <th className="hidden lg:table-cell px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left">Location</th>
                          <th className="px-6 md:px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 bg-white">
                      {jobs.map((job) => (
                        <tr key={job.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-6 md:px-8 py-4 align-middle">
                            <div className="font-bold text-slate-900 text-[14px] truncate max-w-[150px] xs:max-w-none">{job.title}</div>
                            <div className="text-[12px] text-slate-500 mt-0.5">{job.type}</div>
                            <div className="sm:hidden text-[11px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">{job.department}</div>
                          </td>
                          <td className="hidden sm:table-cell px-8 py-4 align-middle">
                            <div className="font-semibold text-slate-800 text-[14px]">{job.department}</div>
                          </td>
                          <td className="hidden lg:table-cell px-8 py-4 align-middle">
                            <div className="text-[14px] text-slate-800 font-medium">{job.location}</div>
                          </td>
                          <td className="px-6 md:px-8 py-4 align-middle text-right">
                            <div className="flex justify-end gap-3">
                              <button
                                onClick={() => {
                                  setEditingJob(job);
                                  setJobForm({
                                    title: job.title,
                                    department: job.department,
                                    location: job.location,
                                    type: job.type,
                                    description: job.description,
                                    requirements: job.requirements
                                  });
                                  setIsJobModalOpen(true);
                                }}
                                className="text-blue-600 hover:text-blue-800 text-[12px] font-bold uppercase tracking-wider"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => job.id && handleDeleteJob(job.id)}
                                className="text-red-600 hover:text-red-800 text-[12px] font-bold uppercase tracking-wider"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            ) : (
              <>
                {appsLoading ? (
                  <div className="h-full w-full flex flex-col items-center justify-center py-32 text-slate-400">
                    <div className="w-8 h-8 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin mb-4" />
                    <p className="font-medium text-sm">Loading applications...</p>
                  </div>
                ) : applications.length === 0 ? (
                  <div className="h-full w-full flex flex-col items-center justify-center py-32 text-center px-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                      <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </div>
                    <h3 className="text-base font-bold text-slate-700 mb-1">No applications yet</h3>
                    <p className="text-sm text-slate-500">When candidates apply for jobs, they will appear here.</p>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                          <th className="px-6 md:px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left">Candidate</th>
                          <th className="hidden sm:table-cell px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left">Job Position</th>
                          <th className="hidden md:table-cell px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left">CV Artifact</th>
                          <th className="px-6 md:px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left text-right">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 bg-white">
                      {applications.map((app) => (
                        <tr
                          key={app.id}
                          onClick={() => setSelectedApp(app)}
                          className="hover:bg-slate-50 transition-colors group cursor-pointer"
                        >
                          <td className="px-6 md:px-8 py-4 align-middle">
                            <div className="flex items-center gap-3">
                              <div className="hidden xs:flex w-8 h-8 rounded-full bg-slate-100 items-center justify-center text-slate-400 text-[10px] font-bold">
                                {app.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                              </div>
                              <div className="truncate max-w-[120px] xs:max-w-none">
                                <div className="font-bold text-slate-900 text-[14px] group-hover:text-black transition-colors">{app.fullName}</div>
                                <div className="text-[12px] text-slate-500 mt-0.5">{app.email}</div>
                                <div className="sm:hidden mt-1.5 inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[9px] font-bold uppercase tracking-wider">
                                  {app.jobTitle}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="hidden sm:table-cell px-8 py-4 align-middle">
                            <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-[11px] font-bold uppercase tracking-wider mb-1">
                              {app.jobTitle}
                            </div>
                            <div className="hidden lg:block text-[11px] text-slate-400 font-medium whitespace-nowrap">ID: {app.jobId.substring(0, 8)}</div>
                          </td>
                          <td className="hidden md:table-cell px-8 py-4 align-middle">
                            <div className="flex items-center gap-2 text-slate-600">
                              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                              <span className="text-[13px] font-medium truncate max-w-[150px]">{app.fileName || 'CV Document'}</span>
                            </div>
                          </td>
                          <td className="px-6 md:px-8 py-4 align-middle text-right">
                            <div className="flex items-center justify-end gap-4">
                              <div className="text-[13px] text-slate-500 font-medium whitespace-nowrap">
                                {app.createdAt?.seconds ? new Date(app.createdAt.seconds * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recent'}
                              </div>
                              <button
                                onClick={(e) => handleDeleteApplication(app.id, e)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                                title="Delete Application"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Enhanced Modal for Request Details */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-100 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 md:px-8 py-4 md:py-6 border-b border-slate-50 bg-white sticky top-0 z-10">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Request File</h3>
              <button
                onClick={() => setSelectedRequest(null)}
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 transition-colors border border-slate-100"
                title="Close Modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 overflow-y-auto flex-1 bg-[#FAFAFA]">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Contact Information</p>
                  <p className="text-lg font-bold text-slate-900">{selectedRequest?.firstName} {selectedRequest?.lastName}</p>
                  <a href={`mailto:${selectedRequest?.email}`} className="text-[14px] font-medium text-slate-500 hover:text-black mt-1 block transition-colors">{selectedRequest?.email}</a>
                  <p className="text-[14px] font-medium text-slate-500 mt-1">{selectedRequest?.phone || 'No phone provided'}</p>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Organization</p>
                  <p className="text-lg font-bold text-slate-900">{selectedRequest?.companyName}</p>
                  <p className="text-[14px] font-medium text-slate-500 mt-1">{selectedRequest?.jobTitle}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded uppercase tracking-wider">{selectedRequest?.industry || 'Unknown'}</span>
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded uppercase tracking-wider">{selectedRequest?.region || 'Unknown'}</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Primary Interest</p>
                <div className="inline-flex items-center px-4 py-2 rounded-xl bg-slate-900 text-[13px] font-bold text-white shadow-sm">
                  {selectedRequest?.interest === 'fleet' ? 'Deploying an autonomous fleet' :
                    selectedRequest?.interest === 'partnership' ? 'Technology Partnership' :
                      selectedRequest?.interest === 'investment' ? 'Investment / Media' : selectedRequest?.interest || 'Other'}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Message / Requirements</p>
                <div className="bg-white border border-slate-100 rounded-2xl p-6 text-[15px] font-medium text-slate-700 leading-relaxed min-h-[120px] shadow-sm whitespace-pre-wrap">
                  {selectedRequest?.message ? (
                    `"${selectedRequest.message}"`
                  ) : (
                    <span className="text-slate-400 italic">No additional message provided.</span>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Received Date</span>
                <span className="text-sm font-bold text-slate-600">
                  {selectedRequest?.createdAt ? new Date(selectedRequest.createdAt).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' }) : 'Unknown date'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Job Application Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-100 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            
            <div className="flex items-center justify-between px-6 md:px-8 py-4 md:py-6 border-b border-slate-50 bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3 md:gap-4">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Application</h3>
                <div className="hidden xs:block bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider truncate max-w-[150px]">
                  {selectedApp.jobTitle}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDeleteApplication(selectedApp.id)}
                  className="p-2 md:px-4 md:py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  <span className="hidden md:inline">Delete</span>
                </button>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 transition-colors border border-slate-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto flex-1 bg-[#FAFAFA]">
              <div className="block xs:hidden mb-6">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Applied Position</p>
                <div className="inline-flex bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl text-[12px] font-bold">
                  {selectedApp.jobTitle}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Candidate</p>
                  <p className="text-lg font-bold text-slate-900">{selectedApp.fullName}</p>
                  <a href={`mailto:${selectedApp.email}`} className="text-[14px] font-medium text-slate-500 hover:text-black mt-1 block transition-colors">{selectedApp.email}</a>
                  <p className="text-[14px] font-medium text-slate-500 mt-1">{selectedApp.phone}</p>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Position</p>
                  <p className="text-lg font-bold text-slate-900">{selectedApp.jobTitle}</p>
                  <p className="text-[12px] text-slate-400 font-medium mt-1 uppercase tracking-wider">ID: {selectedApp.jobId}</p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">CV Artifact (Firestore Chunks)</p>
                <div className="bg-white border border-slate-100 rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between shadow-sm gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">{selectedApp.fileName}</p>
                      <p className="text-[10px] md:text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{selectedApp.fileType}</p>
                    </div>
                  </div>
                  <button 
                    disabled={cvReconstructing}
                    onClick={() => handleDownloadCV(selectedApp)}
                    className="flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-3 sm:py-2.5 rounded-xl text-[12px] font-bold hover:bg-black transition-all disabled:opacity-50 w-full sm:w-auto"
                  >
                    {cvReconstructing ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Reconstructing...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4-4v12" /></svg>
                        <span>Download CV</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Cover Message</p>
                <div className="bg-white border border-slate-100 rounded-2xl p-6 text-[15px] font-medium text-slate-700 leading-relaxed min-h-[120px] shadow-sm whitespace-pre-wrap">
                  {selectedApp.message ? (
                    `"${selectedApp.message}"`
                  ) : (
                    <span className="text-slate-400 italic">No message provided.</span>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Application Date</span>
                <span className="text-sm font-bold text-slate-600">
                   {selectedApp.createdAt?.seconds ? new Date(selectedApp.createdAt.seconds * 1000).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' }) : 'Unknown'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Job Posting Modal */}
      {isJobModalOpen && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-100 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 md:px-8 py-4 md:py-6 border-b border-slate-50 bg-white sticky top-0 z-10">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                {editingJob ? 'Edit Job Posting' : 'New Job Posting'}
              </h3>
              <button
                onClick={() => setIsJobModalOpen(false)}
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 transition-colors border border-slate-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleCreateOrUpdateJob} className="p-6 md:p-8 overflow-y-auto flex-1 bg-[#FAFAFA] space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-slate-500 uppercase">Job Title</label>
                  <input
                    type="text"
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-slate-500 uppercase">Department</label>
                  <input
                    type="text"
                    value={jobForm.department}
                    onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-slate-500 uppercase">Location</label>
                  <input
                    type="text"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-slate-500 uppercase">Job Type</label>
                  <select
                    value={jobForm.type}
                    onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Remote</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-500 uppercase">Detailed Description (HTML Supported)</label>
                <textarea
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors h-32 resize-none"
                  placeholder="<p>Job description here...</p>"
                  required
                />
              </div>

              <div className="space-y-4">
                <label className="text-[12px] font-bold text-slate-500 uppercase block">Requirements</label>
                {jobForm.requirements.map((req, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => {
                        const newReqs = [...jobForm.requirements];
                        newReqs[idx] = e.target.value;
                        setJobForm({ ...jobForm, requirements: newReqs });
                      }}
                      className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="e.g. 5+ years experience in Rust"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newReqs = jobForm.requirements.filter((_, i) => i !== idx);
                        setJobForm({ ...jobForm, requirements: newReqs });
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setJobForm({ ...jobForm, requirements: [...jobForm.requirements, ''] })}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest"
                >
                  + Add Requirement
                </button>
              </div>

              <div className="pt-6 border-t border-slate-200 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                >
                  {editingJob ? 'Save Changes' : 'Post Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
