"use client";

import { useEffect, useState } from "react";
import { FiTrash2, } from "react-icons/fi";
import { getCategoriesAPI, deleteCategoryAPI , acceptCategoryAPI } from "@/services/user.service";
import Image from "next/image";

const ShowCategoriesCMS = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        const res = await getCategoriesAPI();
        if (!isMounted) return;
        setCategories(res.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCategoryAPI(id);
      setConfirmId(null);
      const res = await getCategoriesAPI();
      setCategories(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  const handleAccept = async (id) => {
    try {
      await acceptCategoryAPI(id);
      setConfirmId(null);
      const res = await getCategoriesAPI();
      setCategories(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-[95%] mx-auto p-6 text-white">
      {isLoading ? (
        <p className="text-center text-gray-400 text-sm">Loading categories…</p>
      ) : categories.length === 0 ? (
        <p className="text-center text-gray-400 text-sm">
          No categories found yet.
        </p>
      ) : (
        <div className="space-y-3">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="flex flex-col md:flex-row md:items-center justify-between gap-2 border border-white/15 bg-[#020617] p-3 rounded-xl"
            >
              {/* Left: name + slug + description */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Image
                    width={50}
                    height={50}
                    src={cat.image?.url}
                    alt={cat.name}
                    className="w-[50px] h-[50px]  rounded-lg mr-4"
                  />
                  <h3 className="text-sm font-semibold truncate">{cat.name}</h3>
                </div>
                {cat.shortDescription && (
                  <p className="text-[11px] text-gray-400 line-clamp-2">
                    {cat.shortDescription}
                  </p>
                )}
              </div>

              {/* Right: actions + confirm */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAccept(cat._id)}
                    disabled={cat.accepted}
                    className={`px-3 py-1 rounded ${
                      cat.accepted
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setConfirmId(confirmId === cat._id ? null : cat._id)
                    }
                    className="px-3 py-1 rounded bg-red-600 text-xs flex items-center gap-1 text-white hover:bg-red-500"
                  >
                    <FiTrash2 className="text-xs" />
                    Delete
                  </button>
                </div>

                {confirmId === cat._id && (
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-300 bg-black/50 border border-red-500/60 px-3 py-2 rounded-lg">
                    <span>Delete this category?</span>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="text-red-400 hover:text-red-300 flex items-center gap-1"
                    >
                      <FiTrash2 className="text-xs" />
                      Yes
                    </button>
                    <button
                      onClick={() => setConfirmId(null)}
                      className="text-gray-400 hover:text-gray-300 flex items-center gap-1"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowCategoriesCMS;
