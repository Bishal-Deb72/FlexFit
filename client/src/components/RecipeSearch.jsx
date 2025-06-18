import React from "react";

function RecipeSearch({ query, setQuery, onSearch, mealType, setMealType, searchHistory = [], onHistoryClick }) {
  return (
    <div className="flex flex-col gap-2 mb-6 sm:flex-row sm:items-center relative">
      <div className="relative w-full sm:w-80">
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 w-full rounded"
        />
        {searchHistory.length > 0 && (
          <ul className="absolute bg-gray-800 border w-full rounded shadow z-10 mt-1 max-h-40 overflow-y-auto">
            {searchHistory.map((item, idx) => (
              <li
                key={idx}
                onClick={() => onHistoryClick(item)}
                className="p-2 hover:bg-blue-100 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>



      <button
        onClick={onSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
}

export default RecipeSearch;
