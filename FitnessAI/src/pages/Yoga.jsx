import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Yoga() {
  const [yogaPoses, setYogaPoses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data from JSON file
  useEffect(() => {
    fetch("/yoga-dataset.json") // Ensure this file is available in your `public` folder
      .then((response) => response.json())
      .then((data) => setYogaPoses(data))
      .catch((error) => console.error("Error fetching yoga data:", error));
  }, []);

  // Filter poses based on search term
  const filteredPoses = yogaPoses.filter((pose) =>
    pose.english_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800 min-h-screen">
     {/* Hero Section */}
    <section className="relative text-white text-center py-24 bg-gradient-to-r from-red-700  to-black animate-gradient-x shadow-xl rounded-lg">
      <div className="container mx-auto px-6 backdrop-blur-md">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-widest text-white drop-shadow-xl transition-all duration-300 transform hover:scale-105 hover:text-gray-200">
          Explore Yoga Poses 🧘‍♂️
        </h1>
        <p className="text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto mb-8 opacity-100 text-gray-300 hover:text-white transition-opacity duration-300">
          Discover step-by-step guides to the most popular yoga poses. Learn their physical and energetic benefits, and find the perfect practice to balance your body and mind.
        </p>
      </div>
    </section>

    {/* Search Section */}
    <section className="py-10 bg-gray-900 text-center">
      <div className="container mx-auto">
        <input
          type="text"
          placeholder="🔍 Search for a yoga pose..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-5 py-3 w-full max-w-lg rounded-full bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-red-500 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
        />
      </div>
    </section>



      {/* Yoga Poses Section */}
      <section className="py-16 bg-gray-700">
        <div className="container mx-auto px-6">
          {filteredPoses.length === 0 ? (
            <p className="text-gray-400 text-center text-lg">No poses found...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPoses.map((pose, index) => (
                <Link
                  to={`/pose/${pose.id}`}
                  key={pose.id}
                  className={"group block rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 bg-black"}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={pose.image_icon}
                      alt={pose.english_name}
                      className="w-full h-72 object-fill transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {pose.english_name}{" "}
                      <span className="text-red-400">({pose.sanskrit_name})</span>
                    </h3>
                    <p className="text-white text-sm">
                      <span className="font-medium  text-red-500">Target:</span>{" "}
                      {pose.target_body_parts.join(", ")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Yoga;
