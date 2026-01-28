"use client";

import React, { useState } from "react";
import { Search, User, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: "Reels", href: "/reels" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#050914]/90 backdrop-blur-xl border-b border-[#1f2933] shadow-lg">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        {/* Top Bar */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center text-2xl font-semibold tracking-tight hover:opacity-90 transition"
            aria-label="Go to homepage"
          >
            <Image src="/lady.webp" alt="khrzt lgnaouiii" height={40} width={40} className="rounded-full mr-3" />
            <span className="text-[#e11d48]">Lady</span>
            <span className="text-[#f9fafb] ml-1">Porn</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className="text-sm font-medium tracking-wide text-[#9ca3af] hover:text-[#f9fafb] transition relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-[#e11d48] hover:after:w-full after:transition-all"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="hidden md:block flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#9ca3af]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search videos..."
                className="w-full rounded-lg bg-[#111827] border border-[#1f2933] pl-10 pr-4 py-2.5 text-sm text-[#f9fafb] placeholder:text-[#6b7280]
                  focus:outline-none focus:border-[#e11d48] focus:ring-1 focus:ring-[#e11d48]/40 transition"
              />
            </div>
          </div>

          {/* User */}
          <button
            aria-label="User profile"
            className="hidden md:flex size-10 items-center justify-center rounded-full bg-[#111827] hover:bg-[#e11d48] text-[#f9fafb] transition shadow-md"
          >
            <User className="size-5" />
          </button>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden size-10 flex items-center justify-center rounded-lg bg-[#111827] hover:bg-[#e11d48] text-[#f9fafb] transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#9ca3af]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos..."
              className="w-full rounded-lg bg-[#111827] border border-[#1f2933] pl-10 pr-4 py-2.5 text-sm text-[#f9fafb] placeholder:text-[#6b7280]
                focus:outline-none focus:border-[#e11d48]"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 pt-3 border-t border-[#1f2933] space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium tracking-wide text-[#e5e7eb]
                  hover:bg-[#111827] hover:text-[#f9fafb] transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
