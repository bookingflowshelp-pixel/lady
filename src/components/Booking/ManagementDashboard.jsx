"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FiList, FiFilm, FiGrid, FiEdit3 } from "react-icons/fi";
import AddVideoCMS from "./AddVideoCMS/AddVideoCMS";
import ShowVideosCMS from "./ShowVideos/ShowVideos";
import AddCategory from "./AddCategory/AddCategory";
import ShowCategoriesCMS from "./ShowCategories/ShowCategories";

const ManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState("Add Video");
  const loggedIn = useSelector((state) => state.admin.loggedIn);
  const router = useRouter();

  useEffect(() => {
    if (!loggedIn) {
      toast.warning("Please login to access the dashboard");
      router.push("/login");
    }
  }, [loggedIn, router]);

  const tabs = [
    { id: "Add Video", label: "Create video", icon: <FiFilm /> },
    { id: "Show Videos", label: "All videos", icon: <FiList /> },
    { id: "Add Category", label: "Create category", icon: <FiGrid /> },
    { id: "Show Categories", label: "All categories", icon: <FiEdit3 /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Add Video":
        return <AddVideoCMS />;
      case "Show Videos":
        return <ShowVideosCMS />;
      case "Add Category":
        return <AddCategory />;
      case "Show Categories":
        return <ShowCategoriesCMS />;
      default:
        return <AddVideoCMS />;
    }
  };

  if (!loggedIn) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Dashboard Header */}
      <header className="border-b border-white/10 bg-[#030712]/90 backdrop-blur">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">
                LadyPorns.com Dashboard
              </h1>
              <p className="text-xs md:text-sm text-gray-400 mt-1">
                Manage blog posts, videos, and categories in one place.
              </p>
            </div>

            {/* Brand badge */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-600 to-rose-500 shadow-lg shadow-pink-500/40" />
              <span className="text-sm font-semibold tracking-wide text-pink-200">
                Content Studio
              </span>
            </div>
          </div>

          {/* Tab Switcher */}
          <nav className="mt-5 flex flex-wrap gap-2 bg-black/20 p-1.5 rounded-2xl border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold rounded-xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-gray-400 hover:text-pink-200"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-600/90 to-rose-500/90 shadow-md shadow-pink-500/40"
                    transition={{ type: "spring", duration: 0.45 }}
                  />
                )}
                <span className="relative z-10 text-base">{tab.icon}</span>
                <span className="relative z-10 hidden sm:inline">
                  {tab.label}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Content Area */}
      <main className="max-w-[1400px] mx-auto p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-white/10 bg-[#020617] p-4 md:p-6 shadow-lg shadow-black/40"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ManagementDashboard;
