import React, { useState } from "react";

const equipmentList = [
  { icon: "🏋️", label: "Dumbbell" },
  { icon: "💪", label: "Machine" },
  { icon: "🧘", label: "Yoga" },
  { icon: "✅", label: "Barbell" },
  { icon: "🙆‍♀️", label: "Body weight" },
  { icon: "🤸‍♂️", label: "Stretches" },
  { icon: "♻️", label: "Recovery" },
];

function EquipmentSelection({ onSelectEquipment }) {
  const [selectedEquipment, setSelectedEquipment] = useState([]);

  const handleSelect = (label) => {
    setSelectedEquipment((prev) => {
      const isSelected = prev.includes(label);
      const newSelection = isSelected
        ? prev.filter((item) => item !== label) // Remove if already selected
        : [...prev, label]; // Add if not selected

      onSelectEquipment(newSelection); // Pass selected items to parent
      return newSelection;
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-md shadow-md bg-slate-300 font-bold">
      <h2 className="text-gray-700 font-semibold mb-4">Equipment</h2>
      <div className="grid grid-cols-2 gap-4">
        {equipmentList.map((item) => (
          <label key={item.label} className="flex items-center space-x-2 text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox rounded"
              checked={selectedEquipment.includes(item.label)}
              onChange={() => handleSelect(item.label)}
            />
            <span className="text-2xl">{item.icon}</span>
            <span>{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default EquipmentSelection;
