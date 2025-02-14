import React, { useState } from "react";
import { Card, CardContent, TextField, MenuItem, Typography, Grid, Box, AppBar, Toolbar, Button, Select, InputLabel, FormControl } from "@mui/material";

const OneRMCalculator = () => {
  // States to manage the inputs and results
  const [units, setUnits] = useState("metric"); // 'metric' or 'us'
  const [liftType, setLiftType] = useState("deadlift");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [oneRM, setOneRM] = useState(null);
  const [results, setResults] = useState(null);

  // Calculate 1RM using Epley formula: 1RM = weight * (1 + 0.0333 * reps)
  const calculateOneRM = () => {
    const calculatedOneRM = weight * (1 + 0.0333 * reps);
    setOneRM(calculatedOneRM);
    generateResults(calculatedOneRM);
  };

  // Generate results for various percentages of the 1RM
  const generateResults = (oneRM) => {
    const percentages = [100, 94, 88, 87, 86, 85, 83, 82, 81, 81];
    const results = percentages.map((percent) => ({
      percent,
      weight: (oneRM * (percent / 100)).toFixed(1),
    }));
    setResults(results);
  };

  // Handle reset action
  const resetCalculator = () => {
    setUnits("metric");
    setLiftType("deadlift");
    setWeight("");
    setReps("");
    setOneRM(null);
    setResults(null);
  };

  // Handle edit action
  const editCalculator = () => {
    setResults(null);
  };

  return (
    <Card sx={{ maxWidth: 900, margin: "auto", boxShadow: 3, borderRadius: 3, height: '600px' }}>
      {/* Navbar for the 1RM Calculator */}
      {!results ? (
        <AppBar position="static" sx={{ background: "linear-gradient(90deg, red, black)" }}>
          <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}>
              1RM Calculator
            </Typography>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar position="static" sx={{ background: "linear-gradient(90deg, blue, black)" }}>
          <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}>
              Results
            </Typography>
            <Button color="inherit" onClick={editCalculator}>Edit</Button>
            <Button color="inherit" onClick={resetCalculator}>Reset</Button>
          </Toolbar>
        </AppBar>
      )}

      {/* Input Form for 1RM Calculation */}
      <CardContent>
        {!results ? (
          <Grid container spacing={3} style={{ padding: 20 }}>
            {/* Units Selection */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Units</InputLabel>
                <Select
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  label="Units"
                >
                  <MenuItem value="metric">Metric (kg)</MenuItem>
                  <MenuItem value="us">U.S. (lbs)</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Type Selection */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={liftType}
                  onChange={(e) => setLiftType(e.target.value)}
                  label="Type"
                >
                  <MenuItem value="deadlift">Deadlift</MenuItem>
                  <MenuItem value="squat">Squat</MenuItem>
                  <MenuItem value="benchpress">Bench Press</MenuItem>
                  <MenuItem value="overheadpress">Overhead Press</MenuItem> {/* Added 4th option */}
                </Select>
              </FormControl>
            </Grid>

            {/* Weight Input */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                variant="outlined"
                label="Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </Grid>

            {/* Reps Input */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                variant="outlined"
                label="Repetitions"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
              />
            </Grid>

            {/* Calculate Button - Centered */}
            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="contained" onClick={calculateOneRM} sx={{ width: "auto" }}>
                Calculate
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={3} style={{ padding: 20 }}>
            <Grid item xs={12}>
              <Typography variant="h6">{liftType.charAt(0).toUpperCase() + liftType.slice(1)} Results:</Typography>
            </Grid>

            {/* Results Cards */}
            <Grid item xs={12} sm={6}>
              <Card sx={{ boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="body1"><strong>% of 1RM</strong></Typography>
                  <Typography variant="body2">{results.map((result, index) => (
                    <div key={index}>
                      {result.percent}%: {result.weight} {units === "metric" ? "kg" : "lb"}
                    </div>
                  ))}</Typography>
                </CardContent>
                <img src="/assets/gym1.jpg" alt="Fitness Image" style={{ width: '100%', height: '100%', opacity: 0.1 }} />

              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card sx={{ boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="body1"><strong>Weight</strong></Typography>
                  <Typography variant="body2">{results.map((result, index) => (
                    <div key={index}>
                      {result.weight} {units === "metric" ? "kg" : "lb"}
                    </div>
                  ))}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default OneRMCalculator;
