import Categorypage from "@/components/category/Categorypage";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import React from "react";

function page() {
  return (
    <div>
      <main className="min-h-screen bg-[#050914] pt-28 pb-16">
        <Header />
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Header */}
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-pink-400 mb-2">
                LadiesNude.com
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Browse Nude Categories
              </h1>
              <p className="text-sm md:text-base text-gray-400 max-w-xl">
                Explore curated nude categories featuring verified models. Pick
                a category to see full galleries and videos.
              </p>
            </div>
          </div>

          {/* Categories Grid */}
          <Categorypage />
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default page;
