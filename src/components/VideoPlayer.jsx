"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Eye, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { getSingleBlogAPI } from "@/services/user.service";

export default function VideoPlayer({ slug }) {
  const [videoData, setVideoData] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]); // optional
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(slug);

    if (!slug) return;

    const fetchVideo = async () => {
      try {
        const res = await getSingleBlogAPI(slug); // API call
        setVideoData(res.data); // your backend returns formatted video object
        setLoading(false);
      } catch (err) {
        console.error("Error fetching video:", err);
        setLoading(false);
      }
    };

    fetchVideo();
  }, [slug]);

  if (loading)
    return <p className="text-center text-white mt-10">Loading video...</p>;
  if (!videoData)
    return <p className="text-center text-white mt-10">Video not found.</p>;

  const {
    postTitle: title,
    iframeUrl,
    views,
    uploadTime,
    duration,
    category,
    tags = [],
    metaTitle,
    metaDescription,
    image: featuredImage,
    featuredImageAlt,
    slug: videoSlug,
    content,
  } = videoData;

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={tags.join(", ")} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="video.other" />
        <meta property="og:image" content={featuredImage?.url || ""} />
        <link
          rel="canonical"
          href={`https://yourwebsite.com/videos/${videoSlug}`}
        />
      </Head>

      <main className="max-w-[1920px] mx-auto px-4 md:px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ================= MAIN PLAYER ================= */}
          <section className="lg:col-span-2 space-y-6">
            {/* Video */}
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#141414] shadow-[0_0_45px_rgba(123,47,247,0.25)]">
              <iframe
                src={iframeUrl}
                className="h-full w-full object-cover"
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Info */}
            <div className="space-y-4">
              <h1 className="text-xl md:text-3xl font-semibold leading-tight">
                {title}
              </h1>

              <div className="flex flex-wrap gap-5 text-sm text-[#9A9A9A]">
                <span className="flex items-center gap-2">
                  <Eye className="size-4" /> {views}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="size-4" /> {uploadTime}
                </span>
                <span className="flex items-center gap-2">
                  <Tag className="size-4" /> {duration}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <TagPill active>{category}</TagPill>
                {tags.map((t, i) => (
                  <TagPill key={i}>{t}</TagPill>
                ))}
              </div>

              {/* Content Section */}
              <div
                className="prose max-w-none mt-6"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </section>

          {/* ================= RELATED (Optional) ================= */}
          <aside className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">
              RELATED <span className="text-[#E10600]">VIDEOS</span>
            </h2>

            <div className="space-y-4">
              {relatedVideos.map((video) => (
                <Link
                  href="/"
                  key={video._id}
                  className="group flex w-full gap-3 text-left"
                >
                  <div className="relative w-40 aspect-video overflow-hidden rounded-lg bg-[#1A1A1A] flex-shrink-0">
                    <img
                      src={video.image?.url || ""}
                      alt={video.featuredImageAlt || video.postTitle}
                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                    />
                    <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-[11px] backdrop-blur">
                      {video.duration}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1 line-clamp-2 text-sm font-medium group-hover:text-[#E10600] transition-colors">
                      {video.postTitle}
                    </h3>
                    <div className="text-xs text-[#9A9A9A] space-y-0.5">
                      <p>{video.views} views</p>
                      <p>{video.uploadTime}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

/* ================= HELPERS ================= */
function TagPill({ children, active }) {
  return (
    <span
      className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
        active
          ? "bg-[#E10600] text-white"
          : "bg-[#1A1A1A] text-[#7B2FF7] hover:bg-[#7B2FF7] hover:text-white cursor-pointer"
      }`}
    >
      {children}
    </span>
  );
}
