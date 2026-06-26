import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-50 overflow-hidden">
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900 flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold">Codly AI Admin</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded hover:bg-zinc-800 transition-colors">Dashboard</Link>
          <Link href="/admin/models" className="block px-4 py-2 rounded hover:bg-zinc-800 transition-colors">Models</Link>
          <Link href="/admin/news" className="block px-4 py-2 rounded hover:bg-zinc-800 transition-colors">News</Link>
          <Link href="/admin/tips" className="block px-4 py-2 rounded hover:bg-zinc-800 transition-colors">Tips</Link>
          <Link href="/admin/banners" className="block px-4 py-2 rounded hover:bg-zinc-800 transition-colors">Banners</Link>
          <Link href="/admin/categories" className="block px-4 py-2 rounded hover:bg-zinc-800 transition-colors">Categories</Link>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
