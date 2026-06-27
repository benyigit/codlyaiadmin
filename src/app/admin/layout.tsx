"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/admin/models', label: 'Models', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
    { href: '/admin/news', label: 'News', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3m0 0l3-3m-3 3V8' },
    { href: '/admin/tips', label: 'AI Tips', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
    { href: '/admin/banners', label: 'Banners', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { href: '/admin/categories', label: 'Categories', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-zinc-50 overflow-hidden font-sans selection:bg-purple-500/30">
      <aside className="w-64 border-r border-white/5 bg-[#0a0a0a] flex flex-col relative z-20">
        <div className="p-8 flex items-center gap-3">
          <Image src="/logo.svg" alt="Codly" width={32} height={32} className="drop-shadow-lg" />
          <h1 className="text-lg font-semibold tracking-tight">Codly AI</h1>
        </div>
        
        <div className="px-4 mb-4">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-2">Catalog Management</div>
        </div>
        
        <nav className="flex-1 px-3 space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-white/10 text-white font-medium' 
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <svg className={`w-5 h-5 ${isActive ? 'text-purple-400' : 'text-zinc-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 2 : 1.5} d={link.icon} />
                </svg>
                {link.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
              A
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-medium truncate">Admin</div>
              <div className="text-xs text-zinc-500 truncate">codlyadmin</div>
            </div>
          </div>
        </div>
      </aside>
      
      <main className="flex-1 overflow-y-auto relative bg-[#0a0a0a]">
        {/* Subtle radial gradient background */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none" />
        
        <div className="p-8 max-w-6xl mx-auto relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
