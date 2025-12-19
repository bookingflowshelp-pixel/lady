"use client";
import React, { useState } from "react";
import { Search, User, Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = ["HOME", "CATEGORIES", "TAGS", "NEW", "POPULAR"];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0B0B0B]/90 backdrop-blur-xl border-b border-[#1C1C1C] shadow-lg">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        {/* Top Bar */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <button
            className="flex items-center text-2xl font-semibold tracking-tight hover:opacity-90 transition"
            aria-label="Go to homepage"
          >
            <span className="text-[#E10600]">VICE</span>
            <span className="text-[#7B2FF7] ml-0.5">HUB</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item}
                className="text-sm font-medium tracking-wide text-[#9A9A9A] hover:text-white transition relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-[#E10600] hover:after:w-full after:transition-all"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Search */}
          <div className="hidden md:block flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#9A9A9A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search videos..."
                className="w-full rounded-lg bg-[#141414] border border-[#1F1F1F] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-[#8A8A8A]
                  focus:outline-none focus:border-[#E10600] focus:ring-1 focus:ring-[#E10600]/40 transition"
              />
            </div>
          </div>

          {/* User */}
          <button
            aria-label="User profile"
            className="hidden md:flex size-10 items-center justify-center rounded-full bg-[#1A1A1A] hover:bg-[#E10600] transition shadow-md"
          >
            <User className="size-5" />
          </button>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden size-10 flex items-center justify-center rounded-lg bg-[#1A1A1A] hover:bg-[#E10600] transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#9A9A9A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos..."
              className="w-full rounded-lg bg-[#141414] border border-[#1F1F1F] pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-[#8A8A8A]
                focus:outline-none focus:border-[#E10600]"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 pt-3 border-t border-[#1C1C1C] space-y-1">
            {navItems.map((item) => (
              <button
                key={item}
                className="block w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium tracking-wide text-[#B0B0B0]
                  hover:bg-[#1A1A1A] hover:text-white transition"
              >
                {item}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
