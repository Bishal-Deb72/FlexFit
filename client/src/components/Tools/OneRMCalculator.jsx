import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Grid,
  Button,
  Select,
  FormControl,
} from "@mui/material";
import ToolsNavBar from "./ToolsNavBar";

const OneRMCalculator = () => {
  const [units, setUnits] = useState("metric"); // 'metric' or 'us'
  const [liftType, setLiftType] = useState("deadlift");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [oneRM, setOneRM] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Calculate 1RM using Epley's formula
  const calculateOneRM = () => {
    if (!weight || !reps) return alert("Please enter weight and repetitions.");
    const calculatedOneRM = (weight * (1 + 0.0333 * reps)).toFixed(2);
    setOneRM(calculatedOneRM);
    setShowResult(true);
  };

  const handleBack = () => {
    setShowResult(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-300 shadow-lg rounded-lg">
      {/* Removed Fixed Navbar Margin Issue */}
      <div className="mb-6 mt-8">
        <ToolsNavBar />
      </div>

      {showResult ? (
        <div>
          {/* Result Navbar */}
          <nav className="bg-gradient-to-r from-gray-800 to-gray-600 bg-opacity-50 p-4 rounded-md shadow-md mb-6">
            <h1 className="text-white text-2xl font-bold text-center">
              Your Results
            </h1>
          </nav>

          {/* Result Card */}
          <div className="p-4 bg-white shadow-md rounded-lg text-center">
            <h2 className="text-lg font-bold text-gray-600 mb-4">Your 1RM</h2>
            <p className="text-2xl font-bold text-blue-600 mb-6">
              {oneRM} {units === "metric" ? "kg" : "lb"}
            </p>
            <Button variant="contained" color="primary" onClick={handleBack}>
              Back to Calculator
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {/* Input Navbar */}
          <nav className="bg-gradient-to-r from-red-500 to-black p-4 rounded-md shadow-md mb-6">
            <h1 className="text-white text-2xl font-bold text-center">
              1RM Calculator
            </h1>
          </nav>

          {/* Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Unit Selection */}
            <Card className="p-4 shadow-md rounded-lg text-center">
              <CardContent>
                <Typography
                  variant="h6"
                  className="font-bold text-gray-500 mb-4"
                >
                  Units
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                  >
                    <MenuItem value="metric">Metric (kg)</MenuItem>
                    <MenuItem value="us">U.S. (lbs)</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>

            {/* Lift Type Selection */}
            <Card className="p-4 shadow-md rounded-lg text-center">
              <CardContent>
                <Typography
                  variant="h6"
                  className="font-bold text-gray-500 mb-4"
                >
                  Lift Type
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={liftType}
                    onChange={(e) => setLiftType(e.target.value)}
                  >
                    <MenuItem value="deadlift">Deadlift</MenuItem>
                    <MenuItem value="squat">Squat</MenuItem>
                    <MenuItem value="benchpress">Bench Press</MenuItem>
                    <MenuItem value="overheadpress">Overhead Press</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </div>

          {/* Weight & Reps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {/* Weight Input */}
            <Card className="p-4 shadow-md rounded-lg text-center">
              <CardContent>
                <Typography
                  variant="h6"
                  className="font-bold text-gray-500 mb-4"
                >
                  Weight Lifted
                </Typography>
                <TextField
                  type="number"
                  placeholder="Enter weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  fullWidth
                />
              </CardContent>
            </Card>

            {/* Reps Input */}
            <Card className="p-4 shadow-md rounded-lg text-center">
              <CardContent>
                <Typography
                  variant="h6"
                  className="font-bold text-gray-500 mb-4"
                >
                  Repetitions
                </Typography>
                <TextField
                  type="number"
                  placeholder="Enter reps"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  fullWidth
                />
              </CardContent>
            </Card>
          </div>

          {/* Calculate Button */}
          <div className="text-center mt-4">
            <Button
              variant="contained"
              color="success"
              onClick={calculateOneRM}
            >
              Calculate
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OneRMCalculator;
