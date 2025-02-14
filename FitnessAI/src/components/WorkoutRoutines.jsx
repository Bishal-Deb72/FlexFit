import { useState } from "react";
import { Dumbbell, User, Timer, Watch, Activity } from "lucide-react";
import { MdOutlineExpandMore } from "react-icons/md";

export default function WorkoutRoutines() {
  const [sort, setSort] = useState("default");
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [expanded, setExpanded] = useState(Array(3).fill(false));

  const toggleExpand = (index) => {
    setExpanded((prev) => {
      const newExpanded = [...prev];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  const routines = [
    {
      title: "Upper Body Strength Routine",
      image: "/src/components/assets/upper_body.jpg",
      difficulty: "Intermediate",
      workouts: 5,
      color: "blue-500",
      equipment: ["Dumbbell", "Timer"],
      details: "A comprehensive upper body workout routine focused on strength and endurance."
    },
    {
      title: "Lower Body Power Routine",
      image: "/src/components/assets/lower_body.jpg",
      difficulty: "Advanced",
      workouts: 6,
      color: "red-500",
      equipment: ["Dumbbell", "Watch", "Activity"],
      details: "A specialized lower body training program for building power and stability."
    },
    {
      title: "Full Body HIIT Challenge",
      image: "/src/components/assets/full_body_HIIT.jpg",
      difficulty: "Advanced",
      workouts: 4,
      color: "purple-500",
      equipment: ["Person", "Timer", "Activity"],
      details: "A high-intensity interval training routine designed for full-body conditioning."
    },
    {
      title: "Core and Abs Routine",
      image: "/src/components/assets/core_abs.jpg",
      difficulty: "Beginner",
      workouts: 3,
      color: "orange-500",
      equipment: ["Timer", "Person"],
      details: "An easy-to-follow core and abs workout for building a strong midsection."
    },
    {
      title: "Flexibility and Mobility Routine",
      image: "/src/components/assets/flexibility.jpg",
      difficulty: "All Levels",
      workouts: 2,
      color: "teal-500",
      equipment: ["Person"],
      details: "A routine designed to enhance flexibility and joint mobility for overall fitness."
    },
    {
      title: "Cardio Endurance Routine",
      image: "/src/components/assets/cardio.jpg",
      difficulty: "Intermediate",
      workouts: 5,
      color: "cyan-500",
      equipment: ["Watch", "Activity"],
      details: "A structured cardio program to improve endurance and stamina."
    },
    {
      title: "Full Body Bodybuilding for Novice Lifters",
      image: "/src/components/assets/full-body-beginner-day-1_0jn3zHw.jpeg",
      difficulty: "Novice",
      workouts: 3,
      color: "amber-500",
      equipment: ["Dumbbell", "Person", "Timer", "Watch", "Activity"],
      details: "A well-structured program focusing on all major muscle groups with progressive overload techniques."
    },
    {
      title: "Full Body At Home Novice Routine",
      image: "/src/components/assets/at_home_intermediate_6qmo3AL.jpg",
      difficulty: "Novice",
      workouts: 3,
      color: "yellow-500",
      equipment: ["Person"],
      details: "A beginner-friendly routine that requires minimal equipment and can be performed at home."
    },
    {
      title: "Beginner Bodybuilder Routine",
      image: "/src/components/assets/Copy_of_Untitled.jpg",
      difficulty: "Beginner",
      workouts: 4,
      color: "green-500",
      equipment: ["Timer", "Dumbbell", "Watch", "Activity", "Person"],
      details: "A foundational bodybuilding routine designed for beginners to develop strength and muscle definition."
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Filter & Sorting Bar */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <select
            className="border px-3 py-2 rounded-md"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Sort</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
          <div className="flex items-center gap-4">
            <select
              className="border px-3 py-2 rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">Category</option>
              <option value="strength">Strength</option>
              <option value="cardio">Cardio</option>
            </select>
            <select
              className="border px-3 py-2 rounded-md"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="all">Difficulty</option>
              <option value="beginner">Beginner</option>
              <option value="novice">Novice</option>
            </select>
          </div>
        </div>
      </div>

      {/* Routines Display */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routines.map((routine, index) => (
            <div key={index} className="rounded-lg overflow-hidden bg-white shadow-md">
              <div className={`bg-${routine.color} p-4 flex items-center`}> 
                <h3 className="text-white font-medium">{routine.title}</h3>
              </div>
              <div className="relative">
                <img
                  src={routine.image || "/placeholder.svg"}
                  alt={routine.title}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm">
                  {routine.difficulty}
                </span>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <h4 className="font-medium">Equipment:</h4>
                  {routine.equipment.map((item, i) => (
                    <div
                      key={i}
                      className="relative group cursor-pointer"
                      onClick={() => console.log(`${item} clicked!`)}
                    >
                      {item === "Dumbbell" && <Dumbbell className="h-6 w-6 text-gray-500 hover:text-blue-500" />}
                      {item === "Person" && <User className="h-6 w-6 text-gray-500 hover:text-blue-500" />}
                      {item === "Timer" && <Timer className="h-6 w-6 text-gray-500 hover:text-blue-500" />}
                      {item === "Watch" && <Watch className="h-6 w-6 text-gray-500 hover:text-blue-500" />}
                      {item === "Activity" && <Activity className="h-6 w-6 text-gray-500 hover:text-blue-500" />}
                      <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-gray-800 text-white text-xs rounded-md px-2 py-1">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-medium text-gray-600">{routine.workouts} Workouts in this Routine:</h4>
                  <p className="text-sm text-gray-500 mt-1">Click to view workout details</p>
                </div>
                <div className="flex justify-center mt-4">
                  <button 
                    onClick={() => toggleExpand(index)}
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    
                    <MdOutlineExpandMore className={`h-5 w-5 transition-transform ${expanded[index] ? "rotate-180" : "rotate-0"}`} />
                  </button>
                </div>
                {expanded[index] && (
                  <div className="mt-4 bg-gray-100 p-3 rounded-md text-sm text-gray-700">
                    {routine.details}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
