"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <div className="w-full max-w-[360px] px-6">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-center mb-6">
            <Image src="/logo.svg" alt="Codly Logo" width={40} height={40} className="object-contain" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 mb-1">Sign in to Codly</h1>
          <p className="text-sm text-zinc-500">Welcome back! Please enter your details.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 sm:p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="username" className="text-sm font-medium text-zinc-700">Username</label>
              <Input 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="codlyadmin" 
                required 
                className="h-11 rounded-xl border-zinc-200 focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:border-zinc-900 shadow-sm bg-zinc-50"
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-zinc-700">Password</label>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
                required 
                className="h-11 rounded-xl border-zinc-200 focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:border-zinc-900 shadow-sm bg-zinc-50"
              />
            </div>
            
            {error && (
              <div className="text-red-500 text-sm font-medium pt-1">
                {error}
              </div>
            )}
            
            <div className="pt-2">
              <Button 
                className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl shadow-sm font-medium transition-colors" 
                type="submit" 
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>
        </div>
        
        <p className="text-center text-zinc-400 text-xs mt-8">
          &copy; {new Date().getFullYear()} Codly AI. All rights reserved.
        </p>
      </div>
    </div>
  );
}
