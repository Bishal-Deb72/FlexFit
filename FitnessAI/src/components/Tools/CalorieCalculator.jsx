import { useState } from 'react';
import { calculateCalories } from './calorieCalculatorLogic';
import maleImage from './assets/male.png';
import femaleImage from './assets/female.png';

const CalorieCalculator = () => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState({ value: '', unit: 'cm' });
  const [weight, setWeight] = useState({ value: '', unit: 'kg' });
  const [activityLevel, setActivityLevel] = useState('');
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleHeightChange = (e) => {
    setHeight({ ...height, value: e.target.value });
  };

  const handleWeightChange = (e) => {
    setWeight({ ...weight, value: e.target.value });
  };

  const handleHeightUnitChange = (unit) => {
    setHeight({ ...height, unit });
  };

  const handleWeightUnitChange = (unit) => {
    setWeight({ ...weight, unit });
  };

  const handleActivityLevelChange = (e) => {
    setActivityLevel(e.target.value);
  };

  const handleCalculate = () => {
    const result = calculateCalories({ gender, age, height, weight, activityLevel });

    if (result.error) {
      alert(result.error); // Display error if inputs are invalid
    } else {
      setResult(result); // Store the result
      setShowResult(true); // Show the result card
    }
  };


  const handleBack = () => {
    setShowResult(false); // Return to the input form
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      {showResult ? (
        // Result Card
        <div>
          {/* Transparent Navbar */}
          <nav className="bg-gradient-to-r from-gray-800 to-gray-600 bg-opacity-50 p-4 rounded-md shadow-md mb-6">
            <h1 className="text-white text-2xl font-bold text-center">Your Results</h1>
          </nav>

          {/* Result Details */}
          <div className="p-4 bg-white shadow-md rounded-lg text-center">
            <h2 className="text-lg font-bold text-gray-600 mb-4">Your Daily Calorie Needs</h2>
            <p className="text-2xl font-bold text-blue-600 mb-6">{result.calories} kcal</p>
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
              onClick={handleBack}
            >
              Back to Calculator
            </button>
          </div>
        </div>
      ) : (
        // Main Input Form
        <div>
          {/* Navbar */}
          <nav className="bg-gradient-to-r from-red-500 to-black p-4 rounded-md shadow-md mb-6">
            <h1 className="text-white text-2xl font-bold text-center">Calorie Calculator</h1>
          </nav>

          {/* Gender and Age Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Gender Card */}
            <div className="p-4 bg-white shadow-md rounded-lg text-center">
              <h2 className="font-bold text-gray-500 text-lg mb-4">Gender</h2>
              <div className="flex justify-center space-x-4">
                <button
                  className={`flex flex-col items-center p-2 rounded-lg border ${
                    gender === 'male' ? 'border-blue-500' : 'border-gray-300'
                  }`}
                  onClick={() => handleGenderChange('male')}
                >
                  <img src={maleImage} alt="Male" className="w-16 h-16 mb-2" />
                  <span>Male</span>
                </button>
                <button
                  className={`flex flex-col items-center p-2 rounded-lg border ${
                    gender === 'female' ? 'border-blue-500' : 'border-gray-300'
                  }`}
                  onClick={() => handleGenderChange('female')}
                >
                  <img src={femaleImage} alt="Female" className="w-16 h-16 mb-2" />
                  <span>Female</span>
                </button>
              </div>
            </div>

            {/* Age Card */}
            <div className="p-4 bg-white shadow-md rounded-lg text-center">
              <h2 className="font-bold text-gray-500 text-lg mb-4">Age</h2>
              <input
                type="number"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-2 border rounded-md text-center"
              />
            </div>
          </div>

          {/* Height and Weight Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {/* Height Card */}
            <div className="p-4 bg-white shadow-md rounded-lg text-center">
              <h2 className="font-bold text-gray-500 text-lg mb-4">Height</h2>
              <div className="flex space-x-4">
                <input
                  type="number"
                  placeholder={`Height in ${height.unit}`}
                  value={height.value}
                  onChange={handleHeightChange}
                  className="w-full p-2 border rounded-md text-center"
                />
                <select
                  value={height.unit}
                  onChange={(e) => handleHeightUnitChange(e.target.value)}
                  className="p-2 border rounded-md"
                >
                  <option value="cm">cm</option>
                  <option value="inch">inch</option>
                </select>
              </div>
            </div>

            {/* Weight Card */}
            <div className="p-4 bg-white shadow-md rounded-lg text-center">
              <h2 className="font-bold text-gray-500 text-lg mb-4">Weight</h2>
              <div className="flex space-x-4">
                <input
                  type="number"
                  placeholder={`Weight in ${weight.unit}`}
                  value={weight.value}
                  onChange={handleWeightChange}
                  className="w-full p-2 border rounded-md text-center"
                />
                <select
                  value={weight.unit}
                  onChange={(e) => handleWeightUnitChange(e.target.value)}
                  className="p-2 border rounded-md"
                >
                  <option value="kg">kg</option>
                  <option value="lb">lb</option>
                </select>
              </div>
            </div>
          </div>

          {/* Activity Level Card */}
          <div className="mt-6 p-4 bg-white shadow-md rounded-lg text-center">
            <h2 className="font-bold text-gray-500 text-lg mb-4">Activity Level</h2>
            <select
              value={activityLevel}
              onChange={handleActivityLevelChange}
              className="w-full p-2 border rounded-md text-center"
            >
              <option value="">Select your activity level</option>
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="lightly_active">Lightly active (light exercise/sports 1-3 days/week)</option>
              <option value="moderately_active">Moderately active (moderate exercise/sports 3-5 days/week)</option>
              <option value="very_active">Very active (hard exercise/sports 6-7 days a week)</option>
              <option value="extra_active">Extra active (very hard exercise/physical job)</option>
            </select>
          </div>

          {/* Calculate Button */}
          <div className="text-center mt-4">
            <button
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
              onClick={handleCalculate}
            >
              Calculate
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalorieCalculator;
