import CatgoryContent from "@/components/category/CatgoryContent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

/* ================= SEO ================= */
export async function generateMetadata({ params }) {
  const { id } = await params; // ✅ IMPORTANT FIX

  if (!id) {
    return {
      title: "Category Not Found",
      description: "The blog you are looking for does not exist.",
    };
  }

  try {
    const res = await fetch(`https://back-lady.vercel.app/api/video/category/${id}`);

    if (!res.ok) throw new Error("Failed to fetch category data");

    const blog = await res.json();

    const title = blog.metaTitle || blog.title || "category";
    const description = blog.metaDescription || blog.shortDescription;

    const imageUrl = blog.image?.url || null;
    const url = `https://oliveextra.com/blog/${id}`;

    return {
      title,
      description,
      metadataBase: new URL("https://oliveextra.com"),
      alternates: { canonical: url },

      openGraph: {
        title,
        description,
        url,
        type: "article",
        siteName: "OliveExtra",
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
          authors: [blog.user?.name || "OliveExtra Team"],
          section: blog.category,
          tags: blog.tags || [],
        },
      },

      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: imageUrl ? [imageUrl] : [],
        site: "@Olivextra",
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

/* ================= PAGE ================= */
export default async function BlogPage({ params }) {
  const { id } = await params;

  let category = null;

  try {
    const res = await fetch(`https://back-lady.vercel.app/api/video/category/${id}`);

    if (res.ok) {
      category = await res.json();
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
  }

  return (
    <div className="bg-gray-100">
      <Header />
      <CatgoryContent category={category} />
      <Footer />
    </div>
  );
}
