import axios from "axios";

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com";

export const searchRecipes = async (query) => {
  const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
    params: {
      query,
      number: 5,
      addRecipeNutrition: true,
      apiKey: API_KEY,
    },
  });
  return response.data.results;
};

export const getNutritionInfo = async (id) => {
  const response = await axios.get(`${BASE_URL}/recipes/${id}/nutritionWidget.json`, {
    params: { apiKey: API_KEY },
  });
  return response.data;
};

// Add this function
export const generateDailyMealPlan = async (calories = 2000, diet = "") => {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
  const url = `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=${calories}&diet=${diet}&apiKey=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch meal plan");
  return res.json();
};
