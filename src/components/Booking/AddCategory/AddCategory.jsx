"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FiGrid, FiSettings, FiUploadCloud } from "react-icons/fi";
import Image from "next/image";
import { createCategoryAPI } from "@/services/user.service";

/* ================= Utils ================= */
const slugify = (str = "") =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function AddCategory() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    shortDescription: "",
    metaTitle: "",
    metaDescription: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!form.name) {
      toast.error("Category name is required");
      return;
    }

    try {
      // send form + imageFile to backend; API should handle Cloudinary upload
      await createCategoryAPI({
        ...form,
        imageFile, // your backend will convert to { url, publicId }
      });
      toast.success("Category created");

      setForm({
        name: "",
        slug: "",
        shortDescription: "",
        metaTitle: "",
        metaDescription: "",
      });
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create category");
    }
  };

  return (
    <div className="min-h-[60vh] bg-[#020617] text-white p-4 md:p-6 rounded-2xl border border-white/10">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="flex items-center gap-2 text-lg font-semibold">
          <FiGrid className="text-pink-400" />
          New Category
        </h1>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="px-5 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-sm font-semibold shadow-md shadow-pink-500/40"
        >
          Save Category
        </motion.button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: main fields + image */}
        <section className="md:col-span-2 space-y-4">
          {/* Name */}
          <div>
            <label className="text-xs font-semibold text-gray-300 mb-1 block">
              Category name
            </label>
            <input
              name="name"
              placeholder="Example: Soft Nude, Glamour, Curvy"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 outline-none"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="text-xs font-semibold text-gray-300 mb-1 block">
              Slug (URL)
            </label>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <span>ladiesnude.com/category/</span>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="flex-1 bg-transparent text-pink-300 outline-none border-b border-white/15 text-xs"
              />
              <button
                type="button"
                onClick={() =>
                  setForm((p) => ({
                    ...p,
                    slug: slugify(p.name),
                  }))
                }
                className="text-[11px] text-gray-400 hover:text-pink-300"
              >
                Auto
              </button>
            </div>
          </div>

          {/* Short description */}
          <div>
            <label className="text-xs font-semibold text-gray-300 mb-1 block">
              Short description
            </label>
            <textarea
              name="shortDescription"
              placeholder="Short text shown on the category page and in SEO snippets."
              value={form.shortDescription}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 outline-none min-h-[80px]"
            />
          </div>

          {/* Category image */}
          <div>
            <label className="text-xs font-semibold text-gray-300 mb-1 block">
              Category image
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative group cursor-pointer border-2 border-dashed border-white/15 rounded-xl hover:border-pink-500/70 hover:bg-pink-500/5 transition-all aspect-video flex flex-col items-center justify-center overflow-hidden bg-black/40"
            >
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Category preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <>
                  <FiUploadCloud className="text-2xl text-gray-500 mb-1 group-hover:text-pink-400" />
                  <span className="text-[11px] text-gray-400">
                    Click to upload (Max 2MB)
                  </span>
                </>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
            <p className="mt-1 text-[11px] text-gray-500">
              This image will appear on the category grid and can be used as
              Open Graph preview for that category.[web:114][web:120]
            </p>
          </div>
        </section>

        {/* Right: SEO box */}
        <aside className="space-y-3 bg-[#020617] border border-white/10 rounded-xl p-4">
          <p className="text-xs font-semibold flex items-center gap-1 text-gray-200 mb-1">
            <FiSettings className="text-pink-400" /> SEO
          </p>
          <div>
            <label className="text-[11px] text-gray-400 mb-1 block">
              Meta title
            </label>
            <input
              name="metaTitle"
              placeholder="If empty, frontend can use: name + ' | LadiesNude.com'"
              value={form.metaTitle}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-xs text-gray-100 placeholder:text-gray-500 outline-none"
            />
          </div>
          <div>
            <label className="text-[11px] text-gray-400 mb-1 block">
              Meta description
            </label>
            <textarea
              name="metaDescription"
              placeholder="1–2 lines describing this category for search engines."
              value={form.metaDescription}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-xs text-gray-100 placeholder:text-gray-500 outline-none min-h-[70px]"
            />
          </div>
          <p className="text-[11px] text-gray-500">
            Keep titles and descriptions short and specific so search engines
            understand each category clearly.[web:68][web:96]
          </p>
        </aside>
      </div>
    </div>
  );
}
