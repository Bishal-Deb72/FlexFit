import { useState } from "react";
import { Card, CardContent, TextField, MenuItem, Typography, Grid, Box, AppBar, Toolbar, Slider } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Register required Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const MacroCalculator = () => {
  // State management
  const [tdee, setTdee] = useState("");
  const [dietType, setDietType] = useState("60/25/15");
  const [customMacros, setCustomMacros] = useState({ carbs: 33, protein: 33, fat: 34 });

  // Diet macro distribution options
  const dietOptions = {
    "60/25/15": { label: "High Carb", macros: [60, 25, 15] },
    "50/30/20": { label: "Moderate", macros: [50, 30, 20] },
    "40/30/30": { label: "Zone Diet", macros: [40, 30, 30] },
    "25/45/30": { label: "Low Carb", macros: [25, 45, 30] },
    "custom": { label: "Custom", macros: [customMacros.carbs, customMacros.protein, customMacros.fat] }
  };

  // Calculate macros based on TDEE and selected diet type
  const getMacros = () => {
    if (!tdee) return [0, 0, 0];
    const [carbs, protein, fat] = dietOptions[dietType].macros;
    return [
      (tdee * carbs) / 100,  // Carbs kcal
      (tdee * protein) / 100, // Protein kcal
      (tdee * fat) / 100,     // Fat kcal
    ];
  };

  const macroValues = getMacros();

  // Chart data setup
  const data = {
    labels: ["Carbs", "Protein", "Fat"],
    datasets: [
      {
        data: macroValues,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderWidth: 2,
        cutout: "70%",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  // Handle custom macro change
  const handleCustomChange = (macro, newValue) => {
    const remaining = 100 - newValue;
    const otherMacros = Object.keys(customMacros).filter(key => key !== macro);
    const dividedRemaining = remaining / 2;

    setCustomMacros({
      ...customMacros,
      [macro]: newValue,
      [otherMacros[0]]: dividedRemaining,
      [otherMacros[1]]: dividedRemaining,
    });
  };

  return (
    <Card sx={{ maxWidth: 900, margin: "auto", boxShadow: 3, borderRadius: 3 }}>
      {/* Custom Navbar */}
      <AppBar position="static" sx={{ background: "linear-gradient(90deg, red, black)" }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}>
            Macro Calculator
          </Typography>
        </Toolbar>
      </AppBar>

      <CardContent>
        <Grid container spacing={3} style={{ padding: 20 }}>
          {/* TDEE Input Card */}
          <Grid item xs={12} sm={6}>
            <Card sx={{ boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6">Enter Your TDEE (kcal)</Typography>
                <TextField
                  fullWidth
                  type="number"
                  variant="outlined"
                  placeholder="e.g. 2000"
                  value={tdee}
                  onChange={(e) => setTdee(e.target.value)}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Diet Type Selection Card */}
          <Grid item xs={12} sm={6}>
            <Card sx={{ boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6">Select Diet Type</Typography>
                <TextField
                  select
                  fullWidth
                  variant="outlined"
                  value={dietType}
                  onChange={(e) => setDietType(e.target.value)}
                >
                  {Object.entries(dietOptions).map(([key, option]) => (
                    <MenuItem key={key} value={key}>
                      {option.label} ({key})
                    </MenuItem>
                  ))}
                </TextField>
              </CardContent>
            </Card>
          </Grid>

          {/* Macro Breakdown & Chart */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 2, textAlign: "center" }}>
              <CardContent>
                <Typography variant="h6">Macro Breakdown</Typography>
                <Box sx={{ width: "350px", margin: "auto" }}>
                  <Doughnut data={data} options={chartOptions} />
                </Box>
                <Typography variant="body1">
                  <strong>Carbohydrates:</strong> {macroValues[0]} kcal
                </Typography>
                <Typography variant="body1">
                  <strong>Protein:</strong> {macroValues[1]} kcal
                </Typography>
                <Typography variant="body1">
                  <strong>Fat:</strong> {macroValues[2]} kcal
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Custom Macro Adjustment */}
          <Grid item xs={12} sm={6}>
            <Card sx={{ boxShadow: 2 }} disabled={dietType !== "custom"}>
              <CardContent>
                <Typography variant="h6">Adjust Macros (Custom)</Typography>
                <Typography>Carbs: {customMacros.carbs}%</Typography>
                <Slider
                  value={customMacros.carbs}
                  onChange={(e, value) => handleCustomChange("carbs", value)}
                  min={0}
                  max={100}
                  sx={{
                    color: "#FF6384",
                  }}
                  disabled={dietType !== "custom"}  // Disable sliders until "custom" option is chosen
                />
                <Typography>Protein: {customMacros.protein}%</Typography>
                <Slider
                  value={customMacros.protein}
                  onChange={(e, value) => handleCustomChange("protein", value)}
                  min={0}
                  max={100}
                  sx={{
                    color: "#36A2EB",
                  }}
                  disabled={dietType !== "custom"}  // Disable sliders until "custom" option is chosen
                />
                <Typography>Fat: {customMacros.fat}%</Typography>
                <Slider
                  value={customMacros.fat}
                  onChange={(e, value) => handleCustomChange("fat", value)}
                  min={0}
                  max={100}
                  sx={{
                    color: "#FFCE56",
                  }}
                  disabled={dietType !== "custom"}  // Disable sliders until "custom" option is chosen
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MacroCalculator;
