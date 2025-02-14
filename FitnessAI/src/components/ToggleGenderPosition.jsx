import React, { useState } from "react";

function ToggleGenderPosition() {
  const [selectedToggles, setSelectedToggles] = useState({
    gender: "Male",
    advanced: "Basic",
    
  });

  const toggleSwitch = (key) => {
    setSelectedToggles({ ...selectedToggles, [key]: !selectedToggles[key] });
  };

  const toggleGender = () => {
    setSelectedToggles({
      ...selectedToggles,
      gender: selectedToggles.gender === "Male" ? "Female" : "Male",
    });
  };

  const toggleAdvBasic = () => {
    setSelectedToggles({
      ...selectedToggles,
      advanced: selectedToggles.advanced === "Basic" ? "Advanced" : "Basic",
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-md shadow-md bg-slate-300 font-bold">
      {/* Toggle Switches */}
      <div className="flex justify-around items-center mb-4 bg-blue-100 p-2 rounded-lg">
        {/* Gender Toggle Switch */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">{selectedToggles.gender}</span>
          <div
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
              selectedToggles.gender === "Male" ? "bg-red-600" : "bg-gray-400"
            }`}
            onClick={toggleGender}
          >
            <div
              className={`h-4 w-4 bg-white rounded-full shadow transform duration-300 ${
                selectedToggles.gender === "Male" ? "translate-x-0" : "translate-x-6"
              }`}
            ></div>
          </div>
        </div>

        {/* Advanced Toggle */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">{selectedToggles.advanced}</span>
          <div
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
              selectedToggles.advanced === "Basic" ? "bg-red-600" : "bg-gray-400"
            }`}
            onClick={toggleAdvBasic}
          >
            <div
              className={`h-4 w-4 bg-white rounded-full shadow transform duration-300 ${
                selectedToggles.advanced === "Basic" ? "translate-x-0" : "translate-x-6"
              }`}
            ></div>
          </div>
        </div>
      </div>

      {/* Equipment Grid */}
      <div>
        <h2 className="text-gray-700 font-semibold mb-4">Equipment</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: "🏋️‍♀️", label: "Featured" },
            { icon: "🏋️", label: "Dumbbells" },
            { icon: "💪", label: "Machine" },
            { icon: "⚖️", label: "Kettlebells" },
            { icon: "🔗", label: "Cables" },
            { icon: "⚪", label: "Plate" },
            { icon: "🧘", label: "Yoga" },
            { icon: "✅", label: "Barbell" },
            { icon: "🙆‍♀️", label: "Body weight" },
            { icon: "⚽", label: "Medicine Ball" },
            { icon: "🤸‍♂️", label: "Stretches" },
            { icon: "🎀", label: "Band" },
            { icon: "📏", label: "TRX" },
            { icon: "🟦", label: "Bosu Ball" },
            { icon: "❤️", label: "Cardio" },
            { icon: "♻️", label: "Recovery" },
          ].map((item, index) => (
            <label
              key={index}
              className="flex items-center space-x-2 text-gray-600 cursor-pointer"
            >
              <input type="checkbox" className="form-checkbox rounded" />
              <span className="text-2xl">{item.icon}</span>
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToggleGenderPosition;