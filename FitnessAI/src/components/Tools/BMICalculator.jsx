import { useState } from 'react';
import maleImage from './assets/male.png';
import femaleImage from './assets/female.png';

const BMICalculator = () => {
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState({ value: '', unit: 'cm' });
  const [weight, setWeight] = useState({ value: '', unit: 'kg' });
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

  const handleCalculate = () => {
    const heightInMeters =
      height.unit === 'cm' ? height.value / 100 : height.value * 0.0254;
    const weightInKg =
      weight.unit === 'kg' ? weight.value : weight.value * 0.453592;

    if (!height.value || !weight.value) {
      alert('Please provide valid height and weight values.');
      return;
    }

    const bmi = (weightInKg / (heightInMeters ** 2)).toFixed(2);
    setResult({ bmi, category: getCategory(bmi) });
    setShowResult(true);
  };

  const getCategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 24.9) return 'Normal weight';
    if (bmi >= 25 && bmi < 29.9) return 'Overweight';
    return 'Obesity';
  };

  const handleBack = () => {
    setShowResult(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      {showResult ? (
        <div>
          <nav className="bg-gradient-to-r from-gray-800 to-gray-600 bg-opacity-50 p-4 rounded-md shadow-md mb-6">
            <h1 className="text-white text-2xl font-bold text-center">Your Results</h1>
          </nav>
          <div className="p-4 bg-white shadow-md rounded-lg text-center">
            <h2 className="text-lg font-bold text-gray-600 mb-4">Your BMI</h2>
            <p className="text-2xl font-bold text-blue-600 mb-4">{result.bmi}</p>
            <p className="text-lg text-gray-700 mb-6">Category: {result.category}</p>
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
              onClick={handleBack}
            >
              Back to Calculator
            </button>
          </div>
        </div>
      ) : (
        <div>
          <nav className="bg-gradient-to-r from-green-500 to-black p-4 rounded-md shadow-md mb-6">
            <h1 className="text-white text-2xl font-bold text-center">BMI Calculator</h1>
          </nav>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <div className="p-4 bg-white shadow-md rounded-lg text-center">
              <h2 className="font-bold text-gray-500 text-lg mb-4">Height</h2>
              <div className="flex justify-center space-x-4">
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
          </div>
          <div className="flex justify-center mt-4">
            <div className="p-4 bg-white shadow-md rounded-lg text-center w-full sm:w-1/2">
              <h2 className="font-bold text-gray-500 text-lg mb-4">Weight</h2>
              <div className="flex justify-center space-x-4">
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
          <div className="text-center mt-4">
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
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

export default BMICalculator;
