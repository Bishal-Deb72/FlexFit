import React, { useState, useEffect } from "react";
import {
  searchRecipes,
  getNutritionInfo,
  generateDailyMealPlan,
} from "../api/spoonacular";
import RecipeSearch from "../components/RecipeSearch";
import NutritionChart from "../components/NutritionChart";

const defaultPlan = {
  breakfast: { title: "Oatmeal with berries", calories: 320 },
  lunch: { title: "Grilled chicken salad", calories: 450 },
  dinner: { title: "Salmon with quinoa", calories: 520 },
  snack: { title: "Greek yogurt", calories: 150 },
};

const initialSchedule = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.reduce((acc, day) => {
    acc[day] = { ...defaultPlan };
    return acc;
  }, {});
};

export default function NutritionPage() {
  const [query, setQuery] = useState("");
  const [mealType, setMealType] = useState("all");
  const [recipes, setRecipes] = useState([]);
  const [nutritionData, setNutritionData] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [mealPlan, setMealPlan] = useState(() => {
    const stored = localStorage.getItem("mealPlan");
    return stored ? JSON.parse(stored) : initialSchedule();
  });
  const [selectedDay, setSelectedDay] = useState("Mon");
  const [hydration, setHydration] = useState(0);
  const [dailyPlan, setDailyPlan] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
  }, [mealPlan]);

  const updateHistory = (newQuery) => {
    if (!newQuery.trim()) return;
    const updated = [newQuery, ...searchHistory.filter((q) => q !== newQuery)].slice(0, 5);
    setSearchHistory(updated);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
  };

  const clearHistory = () => {
    localStorage.removeItem("searchHistory");
    setSearchHistory([]);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setShowHistory(false);
      const results = await searchRecipes(query, mealType);
      setRecipes(results);
      setNutritionData(null);
      updateHistory(query);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      alert("Failed to fetch recipes.");
    } finally {
      setLoading(false);
    }
  };

  const handleNutritionFetch = async (id, title) => {
    try {
      setLoading(true);
      const data = await getNutritionInfo(id);
      if (data?.calories && data?.carbs && data?.fat && data?.protein) {
        setNutritionData(data);
        setSelectedRecipe(title);
      } else {
        alert("Incomplete nutrition data received.");
      }
    } catch (error) {
      console.error("Error fetching nutrition info:", error);
      alert("Failed to fetch nutrition information.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDailyPlan = async () => {
    try {
      setLoading(true);
      const result = await generateDailyMealPlan();
      setDailyPlan(result);
    } catch (error) {
      console.error("Error generating daily meal plan:", error);
      alert("Could not generate daily plan.");
    } finally {
      setLoading(false);
    }
  };

  const totalCalories = (day) => {
    const meals = mealPlan[day];
    return Object.values(meals).reduce((sum, m) => sum + m.calories, 0);
  };

  const handleMealChange = (type) => {
    const title = prompt(`Enter new ${type} name:`);
    const cal = prompt(`Enter calories for ${title}:`);
    if (!title || isNaN(cal)) return;
    setMealPlan((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [type]: { title, calories: parseInt(cal) },
      },
    }));
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const meals = ["breakfast", "lunch", "dinner", "snack"];
  const labels = {
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
    snack: "Snack",
  };

  return (
    <div className="p-6 max-w-full mx-auto bg-gradient-to-b from-gray-900 via-black to-black min-h-screen text-white">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-green-400">
        🥗 Nutrition Explorer
      </h1>

      <div className="flex items-center justify-center mb-4">
        <RecipeSearch
          query={query}
          setQuery={(value) => {
            setQuery(value);
            setShowHistory(true);
          }}
          onSearch={handleSearch}
          mealType={mealType}
          setMealType={setMealType}
          searchHistory={showHistory ? searchHistory : []}
          onHistoryClick={(item) => {
            setQuery(item);
            setShowHistory(false);
          }}
          clearHistory={clearHistory}
        />
      </div>

      <div className="text-center mb-6">
        <button
          onClick={handleGenerateDailyPlan}
          className="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700"
        >
          🍽️ Generate Daily Meal Plan
        </button>
      </div>

      {dailyPlan && (
        <div className="bg-white p-4 rounded-xl shadow mb-10 text-black">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            🍽️ Today's Meal Plan
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {dailyPlan.meals.map((meal) => (
              <div key={meal.id}>
                <p className="font-bold">{meal.title}</p>
                <a
                  href={`https://spoonacular.com/recipes/${meal.title.replace(/ /g, "-")}-${meal.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Recipe
                </a>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-800">
            <p><strong>Total Calories:</strong> {dailyPlan.nutrients.calories}</p>
            <p><strong>Protein:</strong> {dailyPlan.nutrients.protein}g</p>
            <p><strong>Fat:</strong> {dailyPlan.nutrients.fat}g</p>
            <p><strong>Carbs:</strong> {dailyPlan.nutrients.carbohydrates}g</p>
          </div>
        </div>
      )}

      {loading && <div className="text-center text-lg text-gray-300 my-4">Loading...</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white text-black border rounded-xl p-4 shadow hover:shadow-lg transition duration-300"
          >
            <h2 className="font-semibold text-lg mb-2 text-gray-800">{recipe.title}</h2>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="mb-2 rounded-md h-48 w-full object-cover"
            />
            <button
              onClick={() => handleNutritionFetch(recipe.id, recipe.title)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
            >
              View Nutrition
            </button>
          </div>
        ))}
      </div>

      {nutritionData?.calories && (
        <div className="mt-10 border p-6 rounded-xl shadow bg-white text-black">
          <h2 className="text-2xl font-bold mb-4 text-center text-green-400">
            Nutrition Info for: {selectedRecipe}
          </h2>
          <div className="flex flex-col items-center gap-4">
            <div className="text-center text-gray-700 space-y-1">
              <p><strong>Calories:</strong> {nutritionData.calories}</p>
              <p><strong>Carbs:</strong> {nutritionData.carbs}</p>
              <p><strong>Fat:</strong> {nutritionData.fat}</p>
              <p><strong>Protein:</strong> {nutritionData.protein}</p>
            </div>
            <NutritionChart data={nutritionData} />
          </div>
        </div>
      )}

      {/* 7-Day Meal Plan & Hydration */}
      <div className="mt-12 grid md:grid-cols-4 gap-6 items-start">
          <div className="md:col-span-3 bg-gradient-to-br from-white via-gray-50 to-white text-black shadow-xl rounded-2xl p-6 overflow-hidden h-full">
      <h2 className="text-3xl font-bold mb-4 text-green-600">📅 7-Day Meal Plan</h2>
      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-full font-medium shadow-sm text-sm transition-all duration-200 ${
              selectedDay === day
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {day}
            <div className="text-xs text-gray-500">{totalCalories(day)} cal</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 overflow-y-auto max-h-[320px] pr-2">
        {meals.map((meal) => (
          <div
            key={meal}
            className="border-2 border-dashed border-gray-200 bg-white p-4 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition"
          >
            <div>
              <h3 className="text-lg font-bold mb-2 flex items-center gap-1">
                {meal === "breakfast" && "🌞"}
                {meal === "lunch" && "🍱"}
                {meal === "dinner" && "🍽️"}
                {meal === "snack" && "🍎"} {labels[meal]}
                <span className="text-sm font-medium text-gray-500 ml-auto">
                  {mealPlan[selectedDay][meal].calories} Cal
                </span>
              </h3>
              <p className="text-gray-700 mb-3 font-medium">
                {mealPlan[selectedDay][meal].title}
              </p>
            </div>
            <button
              onClick={() => handleMealChange(meal)}
              className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm text-gray-700 font-semibold"
            >
              ✏️ Change
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right text-xl font-bold text-green-700">
        🔥 Total: {totalCalories(selectedDay)} Calories
      </div>
    </div>

    {/* Hydration Card */}
    <div className="bg-gradient-to-br from-blue-50 to-white shadow-xl rounded-2xl p-6 text-center text-black flex flex-col justify-between h-full">
      <h2 className="text-2xl font-bold text-blue-700 mb-3">💧 Hydration Tracker</h2>
      <div className="text-6xl mb-2">🚰</div>
      <div className="text-xl font-bold text-blue-600 mb-2">{hydration} / 8</div>
      <p className="text-sm text-gray-500 mb-4">glasses today</p>

      <div className="w-full bg-blue-100 h-3 rounded-full mb-4 overflow-hidden">
        <div
          className="bg-blue-500 h-full transition-all duration-300"
          style={{ width: `${(hydration / 8) * 100}%` }}
        ></div>
      </div>

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setHydration((prev) => Math.max(prev - 1, 0))}
          className="bg-red-100 text-red-600 font-bold px-4 py-1 rounded hover:bg-red-200"
        >
          -1
        </button>
        <button
          onClick={() => setHydration((prev) => Math.min(prev + 1, 8))}
          className="bg-blue-600 text-white font-bold px-4 py-1 rounded hover:bg-blue-700"
        >
          +1
        </button>
      </div>

      <div className="bg-white border-l-4 border-blue-500 p-3 rounded text-sm text-left shadow">
        <strong className="text-blue-700">💡 Tip:</strong>
        <p className="text-gray-700 font-medium">
          Staying hydrated improves focus and energy. Drink before meals!
        </p>
      </div>
    </div>
      </div>
    </div>
  );
}