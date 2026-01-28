import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { VideoGrid } from '@/components/VideoGrid';
import React from 'react'
export async function generateMetadata({}) {
  return {
    title: "Lady Porn Video | Onlyfans Leak & Hot Nude Girls & XXX Clips",
    description:
      "Lady Porn brings you hot Porn girls, sexy women and hardcore XXX porn & Onlyfans Leak. Watch explicit  porn video content and erotic galleries on LadiesNude.com.",

    metadataBase: new URL("https://ladyporns.com"),
    alternates: { canonical: "https://ladyporns.com" },

    openGraph: {
      title: "Lady Porn Videos ",
      description:
        "lady porn videos with hot nude girls, sexy women and Onlyfans Leak XXX clips on LadiesNude.com.",
      url: "https://ladyporns.com",
      type: "website",
      siteName: "ladyporns",
      images: [
        {
          url: "https://ladyporns.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Lady Porn ",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "Lady Porn Videos ",
      description:
        "Watch explicit lady porn videos, hot nude girls and XXX clips on LadiesNude.com.",
      images: ["https://ladyporns.com/og-image.jpg"],
      site: "@ladyporns",
    },

    robots: "index, follow",
    themeColor: "#234F87",
  };
}
function page() {
  return (
    <div className='min-h-screen bg-[#0B0B0B] text-[#F2F2F2]'>
      <Header />
      <VideoGrid />
      <Footer />
    </div>
  )
}

export default page