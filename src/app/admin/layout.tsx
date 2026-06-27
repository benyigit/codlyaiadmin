"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Overview' },
    { href: '/admin/models', label: 'Models' },
    { href: '/admin/news', label: 'News' },
    { href: '/admin/tips', label: 'Tips' },
    { href: '/admin/banners', label: 'Banners' },
    { href: '/admin/categories', label: 'Categories' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-blue-100">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 relative flex items-center justify-center">
                <Image src="/logo.svg" alt="Codly" width={32} height={32} className="object-contain" />
              </div>
              <span className="font-semibold text-lg tracking-tight text-zinc-900">Codly Admin</span>
            </div>

            {/* Horizontal Nav */}
            <nav className="hidden md:flex space-x-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-zinc-100 text-zinc-900'
                        : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Profile Dropdown Placeholder */}
            <div className="flex items-center gap-3 pl-4 border-l border-zinc-200">
              <div className="flex flex-col text-right hidden sm:flex">
                <span className="text-sm font-medium text-zinc-900">Admin</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-600 font-semibold text-sm">
                A
              </div>
            </div>
            
          </div>
          
          {/* Mobile Nav */}
          <div className="md:hidden overflow-x-auto py-3 border-t border-zinc-100 flex space-x-2 scrollbar-hide">
            {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-zinc-900 text-white'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
          </div>
        </div>
      </header>
      
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 sm:p-10 min-h-[500px]">
          {children}
        </div>
      </main>
    </div>
  );
}
