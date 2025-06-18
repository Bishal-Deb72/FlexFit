import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VideoInstructionSection = () => {
  const { bodyPart, equipmentList } = useParams(); // Use correct parameter names
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bodyPart || !equipmentList) return;

    fetch(`/FitMate JSON Files/${bodyPart}/${equipmentList}/cleaned_output_Set1.json`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch exercise data");
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);
        setVideos(data);
      })
      .catch((error) => console.error("Error fetching exercise data:", error))
      .finally(() => setLoading(false));
  }, [bodyPart, equipmentList]);

  if (loading) return <p className="text-center text-gray-500 font-bold">Loading videos...</p>;

  return (
    <div className="flex justify-center py-8">
      <div className="w-full max-w-4xl bg-gray-100 p-6 rounded-xl shadow-lg">
        {/* Navbar */}
        <nav className="bg-gradient-to-r from-red-600 to-black text-white p-4 w-full rounded-t-lg shadow-md">
          <h2 className="text-xl font-bold">Video Section</h2>
        </nav>

        {/* Video List */}
        <div className="flex flex-wrap gap-6 mt-6">
          {videos.length > 0 ? (
            videos.map((exercise, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-300 rounded-xl shadow-md hover:shadow-xl w-full"
              >
                <video
                  src={
                    
                      exercise?.male_images?.[0]?.unbranded_video || ""
          
                  }
                  controls
                  className="w-full h-36 lg:h-64 rounded-t-lg"
                />
                <div className="p-2">
                  <p className="text-gray-700 text-base font-semibold">{exercise.name || "Unknown Exercise"}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 font-bold w-full">
              No exercises found for selected body part & equipment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoInstructionSection;
