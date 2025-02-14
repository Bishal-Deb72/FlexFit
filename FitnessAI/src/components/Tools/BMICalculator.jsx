import { useState } from "react";
import { AppBar, Toolbar, Typography, Card, CardContent, TextField, MenuItem, Grid, Button, Select, InputLabel, FormControl } from "@mui/material";
import maleImage from "./assets/male.png";
import femaleImage from "./assets/female.png";
import ToolsNavBar from "./ToolsNavBar";

const BMICalculator = () => {
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState({ value: "", unit: "cm" });
  const [weight, setWeight] = useState({ value: "", unit: "kg" });
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleGenderChange = (selectedGender) => setGender(selectedGender);
  const handleHeightChange = (e) => setHeight({ ...height, value: e.target.value });
  const handleWeightChange = (e) => setWeight({ ...weight, value: e.target.value });
  const handleHeightUnitChange = (unit) => setHeight({ ...height, unit });
  const handleWeightUnitChange = (unit) => setWeight({ ...weight, unit });

  const calculateBMI = () => {
    if (!height.value || !weight.value) return alert("Please enter valid height and weight values.");

    const heightInMeters = height.unit === "cm" ? height.value / 100 : height.value * 0.0254;
    const weightInKg = weight.unit === "kg" ? weight.value : weight.value * 0.453592;
    const bmi = (weightInKg / heightInMeters ** 2).toFixed(2);

    setResult({ bmi, category: getCategory(bmi) });
    setShowResult(true);
  };

  const getCategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 24.9) return "Normal weight";
    if (bmi < 29.9) return "Overweight";
    return "Obesity";
  };

  const handleBack = () => setShowResult(false);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <div className="mb-6 mt-4">
        <ToolsNavBar />
      </div>

      {showResult ? (
        <div>
          {/* Result Navbar */}
          <nav className="bg-gradient-to-r from-gray-800 to-gray-600 bg-opacity-50 p-4 rounded-md shadow-md mb-6">
            <h1 className="text-white text-2xl font-bold text-center">Your Results</h1>
          </nav>

          {/* Result Card */}
          <div className="p-4 bg-white shadow-md rounded-lg text-center">
            <h2 className="text-lg font-bold text-gray-600 mb-4">Your BMI</h2>
            <p className="text-2xl font-bold text-blue-600 mb-6">{result.bmi}</p>
            <p className="text-lg text-gray-700 mb-6">Category: {result.category}</p>
            <Button variant="contained" color="primary" onClick={handleBack}>
              Back to Calculator
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {/* Input Navbar */}
          <nav className="bg-gradient-to-r from-green-500 to-black p-4 rounded-md shadow-md mb-6">
            <h1 className="text-white text-2xl font-bold text-center">BMI Calculator</h1>
          </nav>

          {/* Gender Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-4 shadow-md rounded-lg text-center">
              <CardContent>
                <Typography variant="h6" className="font-bold text-gray-500 mb-4">Gender</Typography>
                <div className="flex justify-center space-x-4">
                  <Button
                    className={`p-2 rounded-lg ${gender === "male" ? "border-blue-500" : "border-gray-300"}`}
                    onClick={() => handleGenderChange("male")}
                  >
                    <img src={maleImage} alt="Male" className="w-16 h-16 mb-2" />
                    Male
                  </Button>
                  <Button
                    className={`p-2 rounded-lg ${gender === "female" ? "border-blue-500" : "border-gray-300"}`}
                    onClick={() => handleGenderChange("female")}
                  >
                    <img src={femaleImage} alt="Female" className="w-16 h-16 mb-2" />
                    Female
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Age Selection */}
            <Card className="p-4 shadow-md rounded-lg text-center">
              <CardContent>
                <Typography variant="h6" className="font-bold text-gray-500 mb-4">Age</Typography>
                <TextField type="number" fullWidth placeholder="Enter your age" />
              </CardContent>
            </Card>
          </div>

          {/* Height & Weight Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {/* Height */}
            <Card className="p-4 shadow-md rounded-lg text-center">
              <CardContent>
                <Typography variant="h6" className="font-bold text-gray-500 mb-4">Height</Typography>
                <div className="flex space-x-4">
                  <TextField type="number" fullWidth placeholder={`Height in ${height.unit}`} value={height.value} onChange={handleHeightChange} />
                  <FormControl>
                    <Select value={height.unit} onChange={(e) => handleHeightUnitChange(e.target.value)}>
                      <MenuItem value="cm">cm</MenuItem>
                      <MenuItem value="inch">inch</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </CardContent>
            </Card>

            {/* Weight */}
            <Card className="p-4 shadow-md rounded-lg text-center">
              <CardContent>
                <Typography variant="h6" className="font-bold text-gray-500 mb-4">Weight</Typography>
                <div className="flex space-x-4">
                  <TextField type="number" fullWidth placeholder={`Weight in ${weight.unit}`} value={weight.value} onChange={handleWeightChange} />
                  <FormControl>
                    <Select value={weight.unit} onChange={(e) => handleWeightUnitChange(e.target.value)}>
                      <MenuItem value="kg">kg</MenuItem>
                      <MenuItem value="lb">lb</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calculate Button */}
          <div className="text-center mt-4">
            <Button variant="contained" color="success" onClick={calculateBMI}>
              Calculate
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;


