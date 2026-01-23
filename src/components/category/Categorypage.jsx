"use client";
import { getCategoryAPI } from "@/services/user.service";
import Link from "next/link";
import { useEffect, useState } from "react";

function Categorypage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        const res = await getCategoryAPI();
        if (!isMounted) return;
        setCategories(res.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div>
      {/* Filter Bar (UI only) */}
      <section className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2 text-xs">
          <button className="px-3 py-1 rounded-full bg-pink-600 text-white font-medium">
            All
          </button>
        </div>

        <div className="text-xs text-gray-400">
          <span className="font-semibold text-pink-300">
            {categories.length}
          </span>{" "}
          categories
        </div>
      </section>
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950 hover:border-pink-500/80 hover:shadow-pink-500/30 hover:shadow-xl transition-all duration-300"
          >
            {/* Image */}
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={cat.image.url}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>

            {/* Text content */}
            <div className="relative p-5 flex flex-col h-full">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-white group-hover:text-pink-200 transition-colors">
                  {cat.name}
                </h2>
              </div>

              <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                {cat.shortDescription}
              </p>

              <div className="mt-auto flex items-center justify-between text-[11px] text-gray-400">
                <span>Galleries • Videos</span>
                <span className="inline-flex items-center gap-1 text-pink-300 group-hover:gap-2 transition-all">
                  Explore
                  <span aria-hidden="true">➜</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default Categorypage;
