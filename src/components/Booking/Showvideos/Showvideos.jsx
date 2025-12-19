import {
  acceptvideoAPI,
  getvideosAPI,
  rejectvideoAPI,
} from "@/services/user.service";

import Image from "next/image";
import { useEffect, useState } from "react";

const ShowVideos = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllVideos();
  }, []);

  const getAllVideos = async () => {
    try {
      const response = await getvideosAPI();
      setVideos(response.data);
    } catch (err) {
      console.error("Error fetching videos:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      await acceptvideoAPI(id);
      getAllVideos(); // refresh list
    } catch (err) {
      console.error("Accept error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await rejectvideoAPI(id);
      setVideos((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading videos...</p>;
  }

  return (
    <div className="w-[95%] mx-auto p-6 text-gray-800">
      <div className="space-y-4">
        {videos.map((video) => (
          <div
            key={video._id}
            className="flex items-center justify-between gap-4 p-2 border border-gray-300 rounded-lg"
          >
            
            <Image
              width={50}
              height={50}
              src={video.image?.url || "/placeholder.png"}
              alt={video.featuredImageAlt || video.postTitle}
              className="w-[50px] h-[50px] rounded-md object-cover"
            />

            {/* Title */}
            <h3 className="flex-1 text-sm font-medium truncate">
              {video.title}
            </h3>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleAccept(video._id)}
                disabled={video.accepted}
                className={`px-3 py-1 rounded text-white text-sm ${
                  video.accepted
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                Accept
              </button>

              <button
                onClick={() => handleDelete(video._id)}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowVideos;
