"use client";

import Link from 'next/link';
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
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-zinc-300 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo & Brand */}
            <div className="flex items-center gap-4">
              {/* Native img tag fixes Next.js SVG rendering issues */}
              <img src="/logo.svg" alt="Codly" className="w-10 h-10 object-contain" />
              <span className="font-bold text-2xl tracking-tight text-zinc-900">Codly Admin</span>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3">
              <span className="font-semibold text-zinc-700">Admin User</span>
              <div className="w-10 h-10 rounded bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-lg">
                A
              </div>
            </div>
            
          </div>
          
          {/* Horizontal Tabs Menu */}
          <div className="flex space-x-8 overflow-x-auto">
            {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`whitespace-nowrap py-4 px-2 font-bold text-base border-b-4 transition-colors ${
                      isActive
                        ? 'border-blue-600 text-blue-700'
                        : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300'
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
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white rounded-xl shadow-md border border-zinc-200 p-8 min-h-[600px]">
          {children}
        </div>
      </main>
    </div>
  );
}
