"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white shadow px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold">RecruAI</div>
        <Link href="/auth">
          <Button variant="default">Login / Register</Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <div
        className="relative flex-1 flex items-center justify-center bg-gray-100"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to RecruAI
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
            Explore the best features of our platform with ease.
          </p>
          <Link href="/auth">
            <Button size="lg" variant="secondary">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
