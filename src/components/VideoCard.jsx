"use client";

import React from "react";
import { Play, Eye } from "lucide-react";
import Link from "next/link";

export function VideoCard({
  _id,
  thumbnail,
  title,
  slug,
  duration,
  createdAt,
  category, // currently an id
  views,    // optional, may be undefined
}) {
  const thumbnailUrl = thumbnail?.url;
  const uploadDate = createdAt
    ? new Date(createdAt).toLocaleDateString()
    : null;

  return (
    <Link
      href={`/video/${slug}`}
      className="group cursor-pointer"
      role="button"
      aria-label={title}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-xl bg-[#111827]">
        <img
          src={thumbnailUrl}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <div className="flex size-16 items-center justify-center rounded-full bg-[#e11d48] shadow-[0_0_35px_rgba(225,29,72,0.55)] scale-95 group-hover:scale-100 transition-transform">
            <Play className="size-8 text-white fill-white ml-0.5" />
          </div>
        </div>

        {/* Duration */}
        {duration && (
          <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 py-0.5 text-xs text-white backdrop-blur">
            {duration}
          </span>
        )}

        {/* Hover glow */}
        <div className="pointer-events-none absolute inset-0 rounded-xl transition-shadow group-hover:shadow-[0_0_30px_rgba(251,113,133,0.45)]" />
      </div>

      {/* Info */}
      <div className="mt-3 space-y-2">
        {/* Title */}
        <h3 className="line-clamp-2 text-sm md:text-base font-medium leading-snug text-[#f9fafb] group-hover:text-[#e11d48] transition-colors">
          {title}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-[#9ca3af]">
          {typeof views !== "undefined" && views !== null && (
            <>
              <span className="flex items-center gap-1">
                <Eye className="size-3" />
                {views}
              </span>
              <span className="opacity-50">•</span>
            </>
          )}
          {uploadDate && <span>{uploadDate}</span>}
        </div>

        {/* Category (show only if you have a label, otherwise hide) */}
        {category && (
          <span className="inline-block rounded-md bg-[#111827] px-2 py-1 text-xs font-medium text-[#fb7185] transition hover:bg-[#fb7185] hover:text-white">
            {category}
          </span>
        )}
      </div>
    </Link>
  );
}
