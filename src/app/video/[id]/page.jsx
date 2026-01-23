import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Heart, Eye, Clock, CalendarDays, Tag } from "lucide-react";

/* ================= SEO METADATA FOR SINGLE VIDEO ================= */
export async function generateMetadata({ params }) {
  const { id } = await params;

  if (!id) {
    return {
      title: "Blog Not Found",
      description: "The blog you are looking for does not exist.",
    };
  }

  try {
    const res = await fetch(`https://back-lady.vercel.app/api/video/${id}`);

    if (!res.ok) throw new Error("Failed to fetch blog data");

    const blog = await res.json();

    const title = blog.metaTitle || blog.title || "Blog";
    const description =
      blog.metaDescription ||
      blog.description ||
      blog.content?.replace(/<[^>]+>/g, "").slice(0, 160);

    const imageUrl = blog.image?.url || null;
    const url = `https://ladyporns.com/video/${id}`;

    return {
      title,
      description,
      metadataBase: new URL("https://ladyporns.com"),
      alternates: { canonical: url },

      openGraph: {
        title,
        description,
        url,
        type: "article",
        siteName: "ladyporns",
        images: imageUrl
          ? [
              {
                url: imageUrl,
                width: 1200,
                height: 630,
                alt: blog.featuredImageAlt || title,
              },
            ]
          : [],
        article: {
          publishedTime: blog.createdAt,
          modifiedTime: blog.updatedAt,
          authors: [blog.user?.name || "ladyporns Team"],
          section: blog.category,
          tags: blog.tags || [],
        },
      },

      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: imageUrl ? [imageUrl] : [],
        site: "@ladyporns",
      },

      robots: "index, follow",
      themeColor: "#234F87",
    };
  } catch (error) {
    return {
      title: "Error",
      description: "Failed to load blog metadata.",
    };
  }
}

/* ================= SINGLE VIDEO PAGE ================= */

export default async function VideoPage({ params }) {
  const { id } = await params;

  let video = null;

  try {
    const res = await fetch(
      `https://back-lady.vercel.app/api/video/${id}`
    );

    if (res.ok) {

      video = await res.json();
      console.log(video);
      
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
  }

  const formattedViews = new Intl.NumberFormat("en-US").format(video.views);
  const formattedLikes = new Intl.NumberFormat("en-US").format(video.likes);

  return (
    <div className="bg-[#050914] min-h-screen text-white">
      <Header />

      <main className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT: Video Player + Info */}
          <div className="lg:col-span-8">
            {/* Video Title */}
            <h1 className="text-2xl md:text-3xl font-bold mb-3">
              {video.title}
            </h1>

            {/* Meta row: views, likes, date, duration */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-4">
              <span className="inline-flex items-center gap-1">
                <Eye size={14} />
                {formattedViews} views
              </span>
              <span className="inline-flex items-center gap-1">
                <Heart size={14} className="text-pink-400" />
                {formattedLikes} likes
              </span>
              <span className="inline-flex items-center gap-1">
                <CalendarDays size={14} />
                {video.publishedAt}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock size={14} />
                {video.duration}
              </span>
            </div>

            {/* Video iframe (use backend URL here) */}
            <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black aspect-video mb-4">
              <iframe
                src={video.videoUrl}
                title={video.title}
                className="w-full h-full"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Short description */}
            <p className="text-sm text-gray-300 mb-6">
              {video.shortDescription}
            </p>

            {/* Tags */}
            {video.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {video.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-200"
                  >
                    <Tag size={12} className="text-pink-400" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Full HTML description */}
            <section className="mt-8 border-t border-white/10 pt-8">
              <h2 className="text-lg font-semibold mb-4">Scene details</h2>
              <div
                className="prose prose-invert max-w-none prose-p:text-gray-200 prose-li:text-gray-200 prose-strong:text-white"
                dangerouslySetInnerHTML={{ __html: video.description }}
              />
            </section>
          </div>

          {/* RIGHT: Simple “info” sidebar (can expand later) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-white/10 bg-[#020617] p-5">
                <h3 className="text-sm font-semibold mb-3">Video info</h3>
                <dl className="space-y-2 text-xs text-gray-300">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Category</dt>
                    <dd>{video.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Length</dt>
                    <dd>{video.duration}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Views</dt>
                    <dd>{formattedViews}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Likes</dt>
                    <dd>{formattedLikes}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Published</dt>
                    <dd>{video.publishedAt}</dd>
                  </div>
                </dl>
              </div>

              {/* Placeholder: “More from this category” block */}
              <div className="rounded-2xl border border-white/10 bg-[#020617] p-5">
                <h3 className="text-sm font-semibold mb-3">
                  More from {video.category}
                </h3>
                <p className="text-xs text-gray-400">
                  Connect this box later to your backend to list related videos
                  from the same category.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
