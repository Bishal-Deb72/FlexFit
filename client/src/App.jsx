import React from "react";
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Homepage';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
// import Login from './pages/Login';
// import Register from './pages/Register';

// Components
import ToggleGenderPosition from './components/ToggleGenderPosition';
import SidebarWithToggle from './components/SidebarWithToggle';
import HeaderNav from './components/HeaderNav';
import Layouts2 from './components/Layouts2';
import BackBody from './components/BackBodyMap/BackBody';
import ProfileCard from './components/ProfileCard';
import VideoInstructionSection from './components/VideoInstructionSection';
import CalorieCalculator from './components/Tools/CalorieCalculator';
import MacroCalculator from './components/Tools/MacroCalculator';
import OneRMCalculator from './components/Tools/OneRMCalculator';
import BMICalculator from './components/Tools/BMICalculator';
import WorkoutRoutines from "./components/WorkoutRoutine";

// Pages
import Yoga from './pages/Yoga';
import YogaDetails from './pages/YogaDetails';
import NutritionPage from './pages/NutritionPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />

        {/* Tools */}
        <Route path="/tools/CalorieCalculator" element={<CalorieCalculator />} />
        <Route path="/tools/MacroCalculator" element={<MacroCalculator />} />
        <Route path="/tools/OneRMCalculator" element={<OneRMCalculator />} />
        <Route path="/tools/BMICalculator" element={<BMICalculator />} />

        {/* Nutrition Page */}
        <Route path="/nutrition" element={<NutritionPage />} />

        {/* Yoga and Workouts */}
        <Route path="/yoga" element={<Yoga />} />
        <Route path="/pose/:id" element={<YogaDetails />} />
        <Route path="/workout" element={<WorkoutRoutines />} />

        {/* Components Test Routes */}
        <Route path="/ToggleGenderPosition" element={<ToggleGenderPosition />} />
        <Route path="/SidebarWithToggle" element={<SidebarWithToggle />} />
        <Route path="/HeaderNav" element={<HeaderNav />} />
        <Route path="/Layouts2" element={<Layouts2 />} />
        <Route path="/BackBody" element={<BackBody />} />
        <Route path="/ProfileCard" element={<ProfileCard />} />

        {/* Dynamic Instruction Page */}
        <Route path="/VideoInstructionSection/:bodyPart/:equipmentList/cleaned_output_Set1" element={<VideoInstructionSection />} />
      </Routes>
    </div>
  );
};

export default App;