import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function YogaDetail() {
  const { id } = useParams();
  const [pose, setPose] = useState(null);

  // Fetch the yoga pose details
  useEffect(() => {
    fetch("/yoga-dataset.json")
      .then((response) => response.json())
      .then((data) => {
        const foundPose = data.find((pose) => pose.id === parseInt(id, 10));
        setPose(foundPose);
      })
      .catch((error) => console.error("Error fetching yoga pose data:", error));
  }, [id]);

  if (!pose) {
    return (
      <div className="text-white text-center mt-20">
        <p>Loading pose details...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800 min-h-screen text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <div className="lg:w-2/3 lg:pr-8">
            {/* Pose Name */}
            <h1 className="text-4xl font-bold mb-6">{pose.english_name}</h1>
            <p className="italic text-gray-400 mb-4">{pose.sanskrit_name}</p>

            {/* Benefits */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {pose.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            {/* Procedure */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Procedure</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                {pose.procedure.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Contraindications */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Contraindications</h2>
              <ul className="list-disc list-inside space-y-2 text-red-400">
                {pose.contraindications.map((contra, index) => (
                  <li key={index}>{contra}</li>
                ))}
              </ul>
            </div>

            {/* Target Body Parts */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Target Body Parts</h2>
              <p className="text-gray-300">
                {pose.target_body_parts.join(", ")}
              </p>
            </div>

            {/* Back Button */}
            <div className="mt-8">
              <Link
                to="/Yoga"
                className="bg-red-500 px-6 py-3 rounded-full text-white hover:bg-red-600"
              >
                Back to All Poses
              </Link>
            </div>
          </div>

          {/* Image and Video */}
          <div className="lg:w-1/3 lg:pl-8 mt-8 lg:mt-0">
            <img
              src={`/${pose.image_url}`} // Ensure the path is correct
              alt={pose.english_name}
              className="w-full h-auto max-w-xs mx-auto rounded-lg shadow-lg mb-12 mt-12"
            />
            <div className="mb-6 gap-7"></div> {/* Add gap between image and video */}
            
            <div className="relative">
              <iframe
                className="w-full rounded-lg shadow-lg"
                src={pose.yt_videos.replace("watch?v=", "embed/")}
                title={pose.english_name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ height: "300px" }} // Reduce video height
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YogaDetail;
