"use client";
import React from "react";
import { Play, Eye } from "lucide-react";

export function VideoCard({
  id,
  thumbnail,
  title,
  duration,
  views,
  uploadTime,
  category,
}) {
  return (
    <div className="group cursor-pointer" role="button" aria-label={title}>
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-xl bg-[#141414]">
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <div className="flex size-16 items-center justify-center rounded-full bg-[#E10600] shadow-[0_0_35px_rgba(225,6,0,0.55)] scale-95 group-hover:scale-100 transition-transform">
            <Play className="size-8 text-white fill-white ml-0.5" />
          </div>
        </div>

        {/* Duration */}
        <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 py-0.5 text-xs text-white backdrop-blur">
          {duration}
        </span>

        {/* Hover Glow */}
        <div className="pointer-events-none absolute inset-0 rounded-xl transition-shadow group-hover:shadow-[0_0_30px_rgba(123,47,247,0.45)]" />
      </div>

      {/* Info */}
      <div className="mt-3 space-y-2">
        {/* Title */}
        <h3 className="line-clamp-2 text-sm md:text-base font-medium leading-snug text-[#F2F2F2] group-hover:text-[#E10600] transition-colors">
          {title}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-[#9A9A9A]">
          <span className="flex items-center gap-1">
            <Eye className="size-3" />
            {views}
          </span>
          <span className="opacity-50">•</span>
          <span>{uploadTime}</span>
        </div>

        {/* Category */}
        <span className="inline-block rounded-md bg-[#1A1A1A] px-2 py-1 text-xs font-medium text-[#7B2FF7] transition hover:bg-[#7B2FF7] hover:text-white">
          {category}
        </span>
      </div>
    </div>
  );
}
