

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-white">
      {/* Navbar */}
      <nav className="w-full bg-zinc-800 border-b border-zinc-700 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div
          className="text-2xl font-bold tracking-tight transition-colors duration-300 hover:text-primary"
        >
          RecruAI
        </div>
        <Link href="/auth">
          <Button
            variant="default"
            className="bg-primary text-white hover:bg-primary/90"
          >
            Login / Register
          </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="relative flex-1 flex items-center justify-center bg-zinc-900 px-4">
        {/* Content */}
        <div className="relative z-10 text-center max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to{" "}
            <span className="text-primary">RecruAI</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 text-zinc-300">
            The smarter way to hire — AI-powered interviews at your fingertips.
          </p>
          <Link href="/auth">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}


