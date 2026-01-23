"use client";

import {
  getVideosAPI,
  acceptVideoAPI,
  deleteVideoAPI,
} from "@/services/user.service"; // <-- you implement these
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiTrash2, FiCheck, FiX } from "react-icons/fi";

const ShowVideosCMS = () => {
  const [videoData, setVideoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchVideos = async () => {
      try {
        const response = await getVideosAPI();
        if (!isMounted) return;
        setVideoData(response.data || []);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchVideos();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAccept = async (id) => {
    try {
      await acceptVideoAPI(id);
      setConfirmId(null);
      const res = await getAllVideos();
      setVideoData(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVideoAPI(id);
      setConfirmId(null);
      const res = await getAllVideos();
      setVideoData(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-[95%] mx-auto p-6 text-white">
      {isLoading ? (
        <p className="text-center text-gray-400 text-sm">Loading videos…</p>
      ) : videoData.length === 0 ? (
        <p className="text-center text-gray-400 text-sm">
          No videos found yet.
        </p>
      ) : (
        <div className="space-y-4">
          {videoData.map((video) => (
            <div
              key={video._id}
              className="flex flex-col md:flex-row md:items-center border border-white/15 justify-between p-3 rounded-xl bg-[#020617]"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="relative w-[72px] h-[48px] rounded-lg overflow-hidden border border-white/10 bg-black/50">
                  <Image
                    width={72}
                    height={48}
                    src={video.thumbnail?.url || "/placeholder-thumb.jpg"}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold line-clamp-2">
                    {video.title}
                  </h3>
                </div>
              </div>

              {/* Right side buttons + confirm delete */}
              <div className="mt-3 md:mt-0 flex flex-col items-end gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAccept(video._id)}
                    disabled={video.accepted}
                    className={`px-3 py-1 rounded flex items-center gap-1 text-xs ${
                      video.accepted
                        ? "bg-gray-600 text-gray-200 cursor-not-allowed"
                        : "bg-emerald-600 text-white hover:bg-emerald-500"
                    }`}
                  >
                    <FiCheck className="text-sm" />
                    {video.accepted ? "Accepted" : "Accept"}
                  </button>

                  <button
                    onClick={() =>
                      setConfirmId(confirmId === video._id ? null : video._id)
                    }
                    className="px-3 py-1 rounded flex items-center gap-1 text-xs bg-red-600 text-white hover:bg-red-500"
                  >
                    <FiTrash2 className="text-sm" />
                    Delete
                  </button>
                </div>

                {/* Confirm delete section */}
                {confirmId === video._id && (
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-300 bg-black/50 border border-red-500/60 px-3 py-2 rounded-lg">
                    <span>Are you sure you want to delete this video?</span>
                    <button
                      onClick={() => handleDelete(video._id)}
                      className="flex items-center gap-1 text-red-400 hover:text-red-300"
                    >
                      <FiTrash2 className="text-xs" />
                      Yes
                    </button>
                    <button
                      onClick={() => setConfirmId(null)}
                      className="flex items-center gap-1 text-gray-400 hover:text-gray-300"
                    >
                      <FiX className="text-xs" />
                      No
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

export default ShowVideosCMS;
