"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-[400px] px-6">
        <div className="mb-10 flex flex-col items-center justify-center text-center">
          <Image src="/logo.svg" alt="Codly Logo" width={80} height={80} className="mb-6 drop-shadow-2xl" />
          <h1 className="text-3xl font-medium tracking-tight text-white mb-2">Welcome back</h1>
          <p className="text-zinc-400 text-sm">Enter your credentials to access the vault.</p>
        </div>

        <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Username</Label>
              <Input 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="codlyadmin" 
                required 
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-purple-500/50 focus-visible:border-purple-500 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
                required 
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-purple-500/50 focus-visible:border-purple-500 rounded-xl"
              />
            </div>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {error}
              </div>
            )}
            
            <Button 
              className="w-full h-12 mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium rounded-xl border-0 shadow-lg shadow-purple-900/20 transition-all active:scale-[0.98]" 
              type="submit" 
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Authenticating...
                </div>
              ) : "Sign In"}
            </Button>
          </form>
        </div>
        
        <p className="text-center text-zinc-600 text-xs mt-8">
          Codly AI Vault • Secure Local Environment
        </p>
      </div>
    </div>
  );
}
