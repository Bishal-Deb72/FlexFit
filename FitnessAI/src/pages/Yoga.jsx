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
      <section className="text-white text-center py-16 bg-gradient-to-r from-red-600 to-black">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wide">
            Explore Yoga Poses
          </h1>
          <p className="text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto mb-8">
            Discover step-by-step guides to the most popular yoga poses. Learn
            their physical and energetic benefits, and find the perfect practice
            to balance your body and mind.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-10 bg-gray-900 text-center">
        <div className="container mx-auto">
          <input
            type="text"
            placeholder="Search for a yoga pose..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-3 w-full max-w-lg rounded-full bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </section>

      {/* Yoga Poses Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPoses.map((pose) => (
              <Link
                to={`/pose/${pose.id}`}
                key={pose.id}
                className="block bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="overflow-hidden">
                  <img
                    src={pose.image_icon}
                    alt={pose.english_name}
                    className="w-full h-64 object-fill transform hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-0">
                  <h3 className="text-lg font-semibold text-white mb-0">
                    {pose.english_name}{" "}
                    <span className="text-gray-400">
                      ({pose.sanskrit_name})
                    </span>
                  </h3>
                  <p className="text-gray-300">
                    Target: {pose.target_body_parts.join(", ")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Yoga;
