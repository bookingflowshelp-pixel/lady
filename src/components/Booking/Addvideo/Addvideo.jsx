"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Image from "next/image";
import dynamic from "next/dynamic";
import {  createVideoAPI } from "@/services/user.service"; // rename to createVideoAPI if needed

// Dynamic import of ReactQuill (for contact section)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

// Helper: slugify
const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function AddVideo() {
  const [iframeUrl, setIframeUrl] = useState("");
  const [contactContent, setContactContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    postTitle: "",
    slug: "",
    category: "",
    tags: "",
    metaTitle: "",
    metaDescription: "",
    featuredImageAlt: "",
  });

  // Auto-generate metaTitle
  useEffect(() => {
    if (!formData.metaTitle && formData.postTitle.length > 0) {
      setFormData((prev) => ({ ...prev, metaTitle: prev.postTitle }));
    }
  }, [formData.postTitle]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const generateSlug = () => {
    if (!formData.postTitle) return toast.info("Please enter a title first.");
    setFormData((prev) => ({ ...prev, slug: slugify(prev.postTitle) }));
  };

  // Featured image handling
  const handleFeaturedImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Only JPEG, PNG, or WEBP allowed!");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Max size 2MB");
      return;
    }
    setFeaturedImage(file);
    setFeaturedImagePreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (featuredImagePreview) URL.revokeObjectURL(featuredImagePreview);
    };
  }, [featuredImagePreview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.postTitle) return toast.error("Please enter a video title.");
    if (!formData.slug) return toast.error("Please generate a slug.");
    if (!iframeUrl.trim()) return toast.error("Please enter video iframe URL.");
    if (!contactContent.trim() || contactContent === "<p><br></p>")
      return toast.error("Contact content cannot be empty.");
    if (!featuredImage) return toast.error("Please upload a featured image.");

    try {
      await createVideoAPI({
        ...formData,
         iframeUrl,
        contactContent,
        featuredImage,
      });

      toast.success("Video added successfully!");
      setFormData({
        postTitle: "",
        slug: "",
        category: "",
        tags: "",
        metaTitle: "",
        metaDescription: "",
        featuredImageAlt: "",
      });
      setIframeUrl("");
      setContactContent("");
      setFeaturedImage(null);
      setFeaturedImagePreview(null);
    } catch (err) {
      toast.error("Failed to add video!");
      console.error(err);
    }
  };

  const metaTitleLimit = 60;
  const metaDescLimit = 160;

  // Rich text toolbar
  const quillModules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        ["link", "image", "video"],
        ["clean"],
      ],
    }),
    []
  );

  return (
    <div className="p-4 md:p-8 bg-[#F4F7FB] min-h-screen font-sans text-gray-800">
      <form
        onSubmit={handleSubmit}
        className="max-w-[1200px] mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold text-[#234F87] mb-6">
          Add SEO-Optimized Video
        </h1>

        {/* Title */}
        <div className="space-y-6">
          <div>
            <label htmlFor="postTitle" className="block text-sm font-semibold mb-1">
              Video Title (H1)
            </label>
            <input
              id="postTitle"
              name="postTitle"
              type="text"
              value={formData.postTitle}
              onChange={handleChange}
              required
              placeholder="Enter your video title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4A84C5]"
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-semibold mb-1">
              Slug (URL)
            </label>
            <div className="flex gap-2">
              <input
                id="slug"
                name="slug"
                type="text"
                value={formData.slug}
                onChange={handleChange}
                required
                placeholder="example: my-video-2025"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4A84C5]"
              />
              <button
                type="button"
                onClick={generateSlug}
                className="px-4 py-2 bg-[#4A84C5] text-white font-semibold rounded-md hover:bg-opacity-90"
              >
                Generate
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Final URL: yourwebsite.com/videos/{formData.slug || "your-video"}
            </p>
          </div>

          {/* Category & Tags */}
          <div>
            <label htmlFor="category" className="block text-sm font-semibold mb-1">
              Category
            </label>
            <input
              id="category"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Tutorials, SEO"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4A84C5]"
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-semibold mb-1">
              Tags
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              value={formData.tags}
              onChange={handleChange}
              placeholder="comma-separated tags"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4A84C5]"
            />
          </div>

          {/* Featured Image */}
          <div>
            <label htmlFor="file" className="block text-sm font-semibold mb-1">
              Featured Image
            </label>
            <input
              id="file"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFeaturedImageChange}
              className="block w-full text-sm text-gray-600 file:bg-[#4A84C5] file:text-white file:font-semibold file:px-4 file:py-2 file:rounded-md hover:file:bg-opacity-90"
            />
            <div className="mt-2">
              <label className="block text-sm font-semibold mb-1">Image Alt (SEO)</label>
              <input
                type="text"
                name="featuredImageAlt"
                value={formData.featuredImageAlt}
                onChange={handleChange}
                placeholder="Describe the image"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4A84C5]"
              />
            </div>
            {featuredImagePreview && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Preview:</p>
                <Image
                  width={100}
                  height={100}
                  quality={100}
                  src={featuredImagePreview}
                  alt={formData.featuredImageAlt || "Featured preview"}
                  loading="lazy"
                  className="w-full h-auto max-w-xs rounded-md shadow-md object-cover"
                />
              </div>
            )}
          </div>

          {/* Video iframe */}
          <div>
            <label htmlFor="iframeUrl" className="block text-sm font-semibold mb-1">
              Video Iframe URL
            </label>
            <input
              id="iframeUrl"
              type="text"
              value={iframeUrl}
              onChange={(e) => setIframeUrl(e.target.value)}
              required
              placeholder='e.g., <iframe src="..."></iframe>'
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4A84C5]"
            />
            {iframeUrl && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Preview:</p>
                <div
                  className="w-full aspect-video"
                  dangerouslySetInnerHTML={{ __html: iframeUrl }}
                />
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div className="pt-6">
            <label className="block text-sm font-semibold mb-2">Contact Section (HTML)</label>
            <ReactQuill
              theme="snow"
              value={contactContent}
              onChange={setContactContent}
              modules={quillModules}
              placeholder="Add professional contact info, forms, links..."
            />
          </div>

          {/* SEO */}
          <div className="pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-[#234F87] mb-4">SEO Meta Settings</h2>
            <div>
              <label htmlFor="metaTitle" className="block text-sm font-semibold mb-1">
                Meta Title
              </label>
              <input
                id="metaTitle"
                name="metaTitle"
                type="text"
                value={formData.metaTitle}
                onChange={handleChange}
                maxLength={metaTitleLimit}
                required
                placeholder="Shown in Google results"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4A84C5]"
              />
              <p className="text-xs text-gray-500 text-right">
                {formData.metaTitle.length}/{metaTitleLimit}
              </p>
            </div>

            <div className="mt-4">
              <label htmlFor="metaDescription" className="block text-sm font-semibold mb-1">
                Meta Description
              </label>
              <textarea
                id="metaDescription"
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleChange}
                rows={3}
                maxLength={metaDescLimit}
                required
                placeholder="Appears under title in Google"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4A84C5]"
              />
              <p className="text-xs text-gray-500 text-right">
                {formData.metaDescription.length}/{metaDescLimit}
              </p>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-8">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-[#F9B233] text-black font-bold text-lg rounded-md shadow-lg hover:bg-opacity-90"
            >
              Add Video
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
}
