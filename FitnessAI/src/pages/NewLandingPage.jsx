import React,{ useState } from 'react'
import { Layout } from '../component/layouts/layouts'
import { FaMale, FaFemale } from "react-icons/fa";



export const About = () => {

  const [gender, setGender] = useState("Male");
  const [position, setPosition] = useState("Front");
  const [isSlideOpen, setIsSlideOpen] = useState(false);

  const toggleGender = () => {
    setGender((prev) => (prev === "Male" ? "Female" : "Male"));
  };

  const togglePosition = () => {
    setPosition((prev) => (prev === "Front" ? "Back" : "Front"));
  };

  const toggleSlide = () => {
    setIsSlideOpen(!isSlideOpen);
  };
  return (

    <Layout>
           <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* Main Container */}
      <div className="bg-white p-6 rounded-lg shadow-md w-80 relative overflow-hidden">
        {/* Gender Toggle */}
        <div className="mb-6 text-center">
          <label className="block text-gray-700 font-medium mb-2">
            Gender: <span className="font-bold">{gender}</span>
          </label>
          <div
            className={`flex items-center w-16 h-8 bg-gray-200 rounded-full cursor-pointer p-1 ${
              gender === "Male" ? "justify-start" : "justify-end"
            }`}
            onClick={toggleGender}
          >
            <div
              className={`w-6 h-6 flex items-center justify-center text-white rounded-full shadow-md transition-all duration-300 ${
                gender === "Male" ? "bg-blue-500" : "bg-pink-500"
              }`}
            >
              {gender === "Male" ? <FaMale /> : <FaFemale />}
            </div>
          </div>
        </div>

        {/* Position Toggle */}
        <div className="mb-6 text-center">
          <label className="block text-gray-700 font-medium mb-2">
            Position: <span className="font-bold">{position}</span>
          </label>
          <div
            className={`flex items-center w-16 h-8 bg-gray-200 rounded-full cursor-pointer p-1 ${
              position === "Front" ? "justify-start" : "justify-end"
            }`}
            onClick={togglePosition}
          >
            <div
              className={`w-6 h-6 flex items-center justify-center text-white rounded-full shadow-md transition-all duration-300 ${
                position === "Front" ? "bg-green-500" : "bg-yellow-500"
              }`}
            >
              {position === "Front" ? "F" : "B"}
            </div>
          </div>
        </div>

        {/* Slide Window Trigger */}
        <button
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={toggleSlide}
        >
          {isSlideOpen ? "Close Slide Window" : "Open Slide Window"}
        </button>

        {/* Slide Window */}
        <div
          className={`absolute top-0 right-0 h-full w-64 bg-gray-700 text-white transition-transform duration-500 ${
            isSlideOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4">
            <h3 className="text-lg font-bold mb-4">Slide Window</h3>
            <p className="text-sm">
              This is a sliding window that moves from right to left when the button is clicked.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={toggleSlide}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    </Layout>
    
  )
}
