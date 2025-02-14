export const calculateCalories = ({ gender, age, height, weight, activityLevel }) => {
  // Validate inputs
  if (!gender || !age || !height.value || !weight.value || !activityLevel) {
    return { error: "All fields are required." };
  }

  // Convert height and weight if necessary
  const heightInCm = height.unit === "inch" ? height.value * 2.54 : height.value;
  const weightInKg = weight.unit === "lb" ? weight.value * 0.453592 : weight.value;

  // Calculate base metabolic rate (BMR)
  const bmr =
    gender === "male"
      ? 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5
      : 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;

  // Activity multipliers
  const activityMultiplier = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extra_active: 1.9,
  }[activityLevel];

  if (!activityMultiplier) {
    return { error: "Invalid activity level." };
  }

  // Final calorie calculation
  const calories = Math.round(bmr * activityMultiplier);
  return { calories };
};
