"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useQuill } from "react-quilljs";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Image from "next/image";
import { FiUploadCloud, FiSettings, FiFilm, FiTag } from "react-icons/fi";
import "quill/dist/quill.snow.css";
import { createVideoAPI, getCategoriesAPI } from "@/services/user.service";

/* ================= Utils ================= */
const slugify = (str = "") =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function AddVideoCMS() {
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbPreview, setThumbPreview] = useState(null);
  const thumbRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "",
    tags: "",
    shortDescription: "",
    metaTitle: "",
    metaDescription: "",
    videoUrl: "",
    duration: "",
  });

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  /* ================= Fetch categories ================= */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoriesAPI(); // should hit /getcategorydashoard or similar
        setCategories(res.data || []);
      } catch (err) {
        console.error("Error fetching categories", err);
        toast.error("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  /* ================= Editor ================= */
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [2, 3, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"],
      ],
    }),
    []
  );

  const { quill, quillRef } = useQuill({ theme: "snow", modules });

  useEffect(() => {
    if (!quill) return;
    quill.on("text-change", () => {
      setDescription(quill.root.innerHTML);
    });
  }, [quill]);

  /* ================= Handlers ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnail(file);
    setThumbPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.videoUrl) {
      toast.error("Title and video URL are required");
      return;
    }

    try {
      await createVideoAPI({
        ...form,
        description,
        thumbnail,
      });
      toast.success("Video published");
    } catch (err) {
      toast.error("Failed to publish video");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#020617] p-6 text-white">
      <header className="bg-[#020617] border border-white/10 p-4 rounded-xl shadow-sm mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold flex gap-2 items-center">
          <FiFilm /> New Video
        </h1>
        <motion.button
          onClick={handleSubmit}
          whileTap={{ scale: 0.95 }}
          className="bg-pink-600 hover:bg-pink-500 text-white px-6 py-2 rounded-lg text-sm font-semibold shadow-md shadow-pink-500/40"
        >
          Publish Video
        </motion.button>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* Left */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-[#020617] border border-white/10 p-6 rounded-xl shadow-sm">
            {/* Title */}
            <input
              name="title"
              placeholder="Video title"
              value={form.title}
              onChange={handleChange}
              className="text-3xl font-bold w-full outline-none mb-4 bg-transparent text-white placeholder:text-gray-500"
            />

            {/* Slug */}
            <div className="flex flex-wrap gap-2 mb-6 text-xs text-gray-400">
              <span>ladiesnude.com/video/</span>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="flex-1 bg-transparent text-pink-300 outline-none border-b border-white/10"
              />
              <button
                type="button"
                onClick={() =>
                  setForm((p) => ({
                    ...p,
                    slug: slugify(p.title),
                  }))
                }
                className="text-[11px] text-gray-400 hover:text-pink-300"
              >
                Auto
              </button>
            </div>

            {/* Short Description */}
            <textarea
              name="shortDescription"
              placeholder="Short description shown under the video and in SEO snippets"
              value={form.shortDescription}
              onChange={handleChange}
              className="w-full border border-white/10 rounded-lg p-3 mb-6 bg-transparent text-sm text-gray-200 placeholder:text-gray-500"
            />

            {/* Category & Tags (category is now select) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-[11px] text-gray-400 mb-1 block">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-white/10 rounded-lg p-3 bg-[#020617] text-sm text-gray-200"
                >
                  <option value="">
                    {loadingCategories ? "Loading…" : "Select a category"}
                  </option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[11px] text-gray-400 mb-1 flex items-center gap-1">
                  <FiTag className="text-pink-400" /> Tags
                </label>
                <input
                  name="tags"
                  placeholder="Tags (comma separated)"
                  value={form.tags}
                  onChange={handleChange}
                  className="w-full border border-white/10 rounded-lg p-3 bg-transparent text-sm text-gray-200 placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Video URL + Duration */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <input
                name="videoUrl"
                placeholder="Video iframe URL from backend (embed URL)"
                value={form.videoUrl}
                onChange={handleChange}
                className="md:col-span-2 w-full border border-white/10 rounded-lg p-3 bg-transparent text-sm text-gray-200 placeholder:text-gray-500"
              />
              <input
                name="duration"
                placeholder="Duration (e.g. 18:42)"
                value={form.duration}
                onChange={handleChange}
                className="w-full border border-white/10 rounded-lg p-3 bg-transparent text-sm text-gray-200 placeholder:text-gray-500"
              />
            </div>

            {/* Rich description */}
            <label className="block text-xs font-semibold text-gray-400 mb-2">
              Full description (HTML)
            </label>
            <div
              ref={quillRef}
              style={{ height: 320 }}
              className="bg-[#020617] border border-white/10 rounded-xl"
            />
          </div>
        </div>

        {/* Right */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Thumbnail */}
          <div className="bg-[#020617] border border-white/10 p-5 rounded-xl shadow-sm">
            <p className="font-semibold mb-2 text-sm">Thumbnail image</p>
            <p className="text-[11px] text-gray-400 mb-3">
              Shown on listing pages and social previews.[web:68]
            </p>
            <div
              onClick={() => thumbRef.current?.click()}
              className="relative border-dashed border-2 border-white/15 rounded-xl aspect-video flex items-center justify-center cursor-pointer overflow-hidden bg-black/40"
            >
              {thumbPreview ? (
                <Image
                  src={thumbPreview}
                  alt="Preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <FiUploadCloud className="text-gray-400 text-2xl" />
              )}
            </div>

            <input
              type="file"
              hidden
              ref={thumbRef}
              accept="image/*"
              onChange={handleThumbnail}
            />
          </div>

          {/* SEO */}
          <div className="bg-[#020617] border border-white/10 p-5 rounded-xl shadow-sm space-y-3">
            <p className="font-semibold flex gap-1 items-center text-sm">
              <FiSettings className="text-pink-400" /> SEO
            </p>
            <input
              name="metaTitle"
              placeholder="Meta title (default: video title + LadiesNude.com)"
              value={form.metaTitle}
              onChange={handleChange}
              className="w-full border border-white/10 p-2 rounded bg-transparent text-sm text-gray-200 placeholder:text-gray-500"
            />
            <textarea
              name="metaDescription"
              placeholder="Meta description (1–2 lines about this specific video)"
              value={form.metaDescription}
              onChange={handleChange}
              className="w-full border border-white/10 p-2 rounded bg-transparent text-sm text-gray-200 placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
