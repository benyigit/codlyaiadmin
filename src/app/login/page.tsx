"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-zinc-200">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 mb-4 bg-zinc-50 rounded-full flex items-center justify-center border border-zinc-200 shadow-sm">
            {/* Standard img tag to fix rendering issues */}
            <img src="/logo.svg" alt="Codly Logo" className="w-12 h-12 object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">Admin Login</h1>
          <p className="text-zinc-500">Sign in to manage the Codly Vault.</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-bold text-zinc-700">Username</label>
            <Input 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter your username" 
              required 
              className="h-14 px-4 text-base rounded-lg border-zinc-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 shadow-sm"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-bold text-zinc-700">Password</label>
            <Input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password" 
              required 
              className="h-14 px-4 text-base rounded-lg border-zinc-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 shadow-sm"
            />
          </div>
          
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-semibold">
              {error}
            </div>
          )}
          
          <Button 
            className="w-full h-14 text-base font-bold bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg shadow-md transition-all mt-4" 
            type="submit" 
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </Button>
        </form>
        
      </div>
    </div>
  );
}
