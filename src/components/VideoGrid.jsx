"use client"
import React, { useState } from "react";
import { VideoCard } from "./VideoCard";
import { mockVideos } from "../data/mockVideos";

export function VideoGrid() {
  const [videos, setVideos] = useState(mockVideos.slice(0, 24));
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreVideos = () => {
    if (isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      setVideos((prev) => [...prev, ...mockVideos.slice(0, 12)]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <main className="max-w-[1920px] mx-auto px-4 md:px-6 pb-32">
      {/* ===== TRENDING ===== */}
      <Section title="TRENDING" accent="red">
        <Grid>
          {videos.slice(0, 6).map((video) => (
            <VideoCard key={video.id} {...video}  />
          ))}
        </Grid>
      </Section>

      {/* ===== NEW UPLOADS ===== */}
      <Section title="NEW UPLOADS" accent="purple">
        <Grid>
          {videos.slice(6, 18).map((video) => (
            <VideoCard key={video.id} {...video}  />
          ))}
        </Grid>
      </Section>

      {/* ===== POPULAR ===== */}
      <Section title="MOST POPULAR" accent="red">
        <Grid>
          {videos.slice(18).map((video) => (
            <VideoCard key={video.id} {...video}  />
          ))}
        </Grid>
      </Section>

      {/* ===== LOAD MORE ===== */}
      <div className="flex justify-center mt-14">
        <button
          onClick={loadMoreVideos}
          disabled={isLoading}
          className="group relative px-10 py-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A]
            text-sm font-medium tracking-wide text-white
            hover:border-[#E10600] hover:shadow-[0_0_30px_rgba(225,6,0,0.35)]
            transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "LOADING..." : "LOAD MORE"}
        </button>
      </div>
    </main>
  );
}

/* ---------- Helpers ---------- */

function Section({ title, accent, children }) {
  const accentColor =
    accent === "purple" ? "text-[#7B2FF7]" : "text-[#E10600]";

  return (
    <section className="mb-14">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
          <span className={accentColor}>{title.split(" ")[0]}</span>{" "}
          {title.split(" ").slice(1).join(" ")}
        </h2>

        <span className="hidden md:block h-px flex-1 ml-6 bg-gradient-to-r from-[#1C1C1C] to-transparent" />
      </div>

      {children}
    </section>
  );
}

function Grid({ children }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
      {children}
    </div>
  );
}
