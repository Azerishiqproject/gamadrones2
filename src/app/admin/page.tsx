'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchWishlists, WishlistData } from '@/store/adminWishlistSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { verifyAdmin } from './actions';

export default function AdminDashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.adminWishlist);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Selected Request State for Modal
  const [selectedRequest, setSelectedRequest] = useState<WishlistData | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    try {
      const response = await verifyAdmin(username, password);
      
      if (response.success) {
        setIsAuthenticated(true);
        dispatch(fetchWishlists());
      } else {
        setAuthError(response.error || 'Invalid credentials');
      }
    } catch (err) {
      setAuthError('Authentication failed. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  // If NOT authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F4F4F3] flex flex-col items-center justify-center p-6 font-sans text-gray-900">
        <div className="w-full max-w-[420px] bg-white p-10 md:p-12 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center">
          
          <div className="flex justify-center mb-10 w-full relative">
            <Link href="/" className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors" title="Back to Home">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </Link>
            <img src="/gama-logo.png" alt="GAMA" className="h-[48px] w-auto" />
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
              <label className="text-[12px] font-bold text-[#111111]">Username<span className="text-red-500 ml-0.5">*</span></label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <img src="/gama-logo.png" alt="GAMA" className="h-8 w-auto" />
            <span className="text-sm font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full uppercase tracking-wider">
              Control Panel
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => dispatch(fetchWishlists())}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              Refresh Data
            </button>
            <div className="w-px h-5 bg-slate-200"></div>
            <button 
              onClick={handleLogout}
              className="text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-64 shrink-0">
          <nav className="flex flex-col gap-2">
            <button className="flex items-center gap-3 px-4 py-3 bg-black text-white rounded-lg font-medium text-sm w-full text-left">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
              Wishlist Requests
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-lg font-medium text-sm w-full text-left transition-colors">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Settings
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <div className="flex-1 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[600px]">
          
          {/* Header */}
          <div className="px-8 py-6 flex items-center justify-between bg-white border-b border-slate-100">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Wishlist Requests</h2>
              <p className="text-sm text-slate-500 mt-1.5 font-medium">Manage and review incoming pre-order applications</p>
            </div>
            <div className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
              Total Requests: {data?.length || 0}
            </div>
          </div>

          {/* Table Area */}
          <div className="flex-1 overflow-x-auto">
            {loading ? (
              <div className="h-full w-full flex flex-col items-center justify-center py-32 text-slate-400">
                <div className="w-8 h-8 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin mb-4" />
                <p className="font-medium text-sm">Loading requests...</p>
              </div>
            ) : error ? (
              <div className="h-full w-full flex flex-col items-center justify-center p-12 text-center">
                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Error Loading Data</h3>
                <p className="text-slate-500 mb-6 text-sm">{error}</p>
                <button onClick={() => dispatch(fetchWishlists())} className="px-4 py-2 bg-slate-900 text-white rounded text-sm font-medium hover:bg-slate-800">Try Again</button>
              </div>
            ) : data.length === 0 ? (
               <div className="h-full w-full flex flex-col items-center justify-center py-32 text-center px-4">
                 <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                   <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                 </div>
                 <h3 className="text-base font-bold text-slate-700 mb-1">No requests yet</h3>
                 <p className="text-sm text-slate-500">When users submit the wishlist form, they will appear here.</p>
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
                  {data.map((request, idx) => (
                    <tr 
                      key={request.id || idx} 
                      onClick={() => setSelectedRequest(request)}
                      className="hover:bg-slate-50 transition-colors group cursor-pointer"
                    >
                      <td className="px-8 py-4 align-middle">
                        <div className="font-bold text-slate-900 text-[14px] group-hover:text-black transition-colors">{request.firstName} {request.lastName}</div>
                        <div className="text-[13px] text-slate-500 mt-0.5">{request.email}</div>
                      </td>
                      <td className="px-8 py-4 align-middle">
                        <div className="font-semibold text-slate-800 text-[14px]">{request.companyName}</div>
                      </td>
                      <td className="px-8 py-4 align-middle">
                        <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#F4F4F3] border border-slate-200 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          {request.interest === 'fleet' ? 'Fleet Deploy' :
                           request.interest === 'partnership' ? 'Partnership' :
                           request.interest === 'investment' ? 'Investment' : request.interest || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-8 py-4 align-middle">
                         <div className="text-[14px] text-slate-800 font-medium">{request.region || 'N/A'}</div>
                      </td>
                      <td className="px-8 py-4 align-middle text-right">
                         <div className="text-[13px] text-slate-500 font-medium whitespace-nowrap">
                           {request.createdAt ? new Date(request.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}
                         </div>
                         <div className="mt-1 text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end gap-1">
                           <span className="text-[10px] font-bold uppercase tracking-wider">View</span>
                           <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {/* Enhanced Modal for Request Details */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-100 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-50 bg-white sticky top-0 z-10">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Request File</h3>
              <button 
                onClick={() => setSelectedRequest(null)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 transition-colors border border-slate-100"
                title="Close Modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto flex-1 bg-[#FAFAFA]">
              
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
    </div>
  );
}
