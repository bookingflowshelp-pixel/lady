"use client";

import React, { useState, useEffect, useCallback } from "react";
import { VideoCard } from "./VideoCard";
import { getAllVideosAPI } from "@/services/user.service";

const PAGE_SIZE = 24;

export function VideoGrid() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const getInitialVideos = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getAllVideosAPI();
      console.log("====================================");
      console.log(res.data);
      console.log("====================================");
      const initialVideos = res?.data || [];
      setVideos(initialVideos);
      setHasMore(initialVideos.length === PAGE_SIZE);
      setPage(1);
    } catch (err) {
      console.error("Error fetching videos:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getInitialVideos();
  }, [getInitialVideos]);

  const loadMoreVideos = useCallback(async () => {
    if (!hasMore || isFetchingMore) return;

    const nextPage = page + 1;
    setIsFetchingMore(true);

    try {
      const res = await getAllVideosAPI(nextPage);
      const newVideos = res?.data?.blogs || [];

      if (newVideos.length > 0) {
        setVideos((prev) => [...prev, ...newVideos]);
        setPage(nextPage);
      }

      if (newVideos.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error loading more videos:", err);
    } finally {
      setIsFetchingMore(false);
    }
  }, [page, hasMore, isFetchingMore]);

  return (
    <main className="max-w-[1920px] mx-auto px-4 md:px-6 pb-32">
      {/* TRENDING */}
      <Section title=" VIDEOS" accent="primary">
        {isLoading && (
          <p className="text-sm text-[#9ca3af]">Loading videos...</p>
        )}

        {!isLoading && videos.length === 0 && (
          <p className="text-sm text-[#9ca3af]">
            No videos yet. Please check back later.
          </p>
        )}

        {!isLoading && videos.length > 0 && (
          <Grid>
            {videos.slice(0, 24).map((video) => (
              <VideoCard key={video._id} {...video} />
            ))}
          </Grid>
        )}
      </Section>

      {/* LOAD MORE */}
      {!isLoading && (
        <div className="flex justify-center mt-14 min-h-[60px]">
          {hasMore && (
            <button
              onClick={loadMoreVideos}
              disabled={isFetchingMore}
              className="group relative px-10 py-3 rounded-xl bg-[#111827]
                border border-[#1f2933] text-sm font-medium tracking-wide text-[#f9fafb]
                hover:border-[#e11d48] hover:shadow-[0_0_30px_rgba(225,29,72,0.35)]
                transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isFetchingMore ? "LOADING..." : "LOAD MORE"}
            </button>
          )}
        </div>
      )}
    </main>
  );
}

function Section({ title, accent, children }) {
  const accentClass =
    accent === "secondary" ? "text-[#fb7185]" : "text-[#e11d48]";

  const [firstWord, ...rest] = title.split(" ");

  return (
    <section className="mb-14">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#f9fafb]">
          <span className={accentClass}>{firstWord}</span> {rest.join(" ")}
        </h2>
        <span className="hidden md:block h-px flex-1 ml-6 bg-gradient-to-r from-[#1f2933] to-transparent" />
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
