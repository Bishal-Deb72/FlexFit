import React from "react";
import {} from  "./SidebarWithBurgerMenu"
const VideoInstructionSection = () => {
  return (
    <div className="flex justify-center py-8">
      <div className="w-full max-w-4xl bg-gray-100 p-6 rounded-xl shadow-lg">
        
        {/* Navbar - Covering full width of the component */}
        <nav className="bg-gradient-to-r from-red-600 to-black text-white p-4 w-full rounded-t-lg shadow-md">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-xl font-bold">Video Section</h2>
          </div>
        </nav>

        {/* Videos */}
        <div id="video1" className="flex flex-col lg:flex-row gap-6 mt-6">
          <div className="bg-white border-2 border-gray-300 rounded-xl shadow-md hover:shadow-xl w-full">
            <video
              src="video1.mp4"
              controls
              className="w-full h-36 lg:h-64 rounded-t-lg"
            ></video>
            <div className="p-2">
              <p className="text-gray-700 text-base font-semibold">Video 1: Overview</p>
            </div>
          </div>
          <div
            id="video2"
            className="bg-white border-2 border-gray-300 rounded-xl shadow-md hover:shadow-xl w-full"
          >
            <video
              src="video2.mp4"
              controls
              className="w-full h-36 lg:h-64 rounded-t-lg"
            ></video>
            <div className="p-2">
              <p className="text-gray-700 text-base font-semibold">Video 2: Details</p>
            </div>
          </div>
        </div>

        {/* Instruction Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg mt-6">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
            Instructions
          </h2>
          <ul className="space-y-8">
            {[
              "Watch the videos carefully for comparison.",
              "Focus on the specific details mentioned in the context.",
              "Pause or rewind the video if necessary to understand better.",
              "Follow the instructions provided for further action.",
              "Contact support if you face any issues.",
            ].map((instruction, index) => (
              <li key={index} className="flex items-center gap-4">
                <span className="w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-md">
                  {index + 1}
                </span>
                <span className="text-gray-700 text-lg">{instruction}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VideoInstructionSection;
