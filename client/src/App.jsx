import React from "react"
import { HomePage } from './pages/Homepage';
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Login from './pages/Login';
import Register from './pages/Register';
import ToggleGenderPosition from './components/ToggleGenderPosition';
import SidebarWithToggle from './components/SidebarWithToggle';
import HeaderNav from './components/HeaderNav';
import Layouts2 from './components/Layouts2';
import BackBody from './components/BackBodyMap/BackBody';
import ProfileCard from './components/ProfileCard'
import VideoInstructionSection from './components/VideoInstructionSection';
import CalorieCalculator from './components/Tools/CalorieCalculator';
import MacroCalculator from './components/Tools/MacroCalculator';
import OneRMCalculator from './components/Tools/OneRMCalculator';
import BMICalculator from './components/Tools/BMICalculator';
import Yoga from './pages/Yoga';
import YogaDetails from './pages/YogaDetails';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>} /> {/* Home page */}
        <Route path="/about" element={<About />} /> {/* About page */}
        <Route path="/contact" element={<Contact />} /> {/* Contact page */}
        <Route path="/services" element={<Services />} /> {/* Services page */}
        <Route path="/login" element={<Login />} /> {/* login page */}
        <Route path="/register" element={<Register />} /> {/* register page */}
        <Route path="/ToggleGenderPosition" element={<ToggleGenderPosition />} /> {/* register page */}
        <Route path="/SidebarWithToggle" element={<SidebarWithToggle />} /> {/* register page */}
        <Route path="/HeaderNav" element={<HeaderNav />} /> {/* register page */}
        <Route path="/Layouts2" element={<Layouts2 />} /> {/* register page */}
        <Route path="/BackBody" element={<BackBody />} /> {/* register page */}
        <Route path="/ProfileCard" element={<ProfileCard />} /> {/* register page */}
        <Route path="/VideoInstructionSection" element={<VideoInstructionSection/>} /> {/* register page */}
        <Route path="/tools/CalorieCalculator" element={<CalorieCalculator />} /> {/* register page */}
        <Route path="/tools/MacroCalculator" element={<MacroCalculator />} /> {/* register page */}
        <Route path="/tools/OneRMCalculator" element={<OneRMCalculator />} /> {/* register page */}
        <Route path="/tools/BMICalculator" element={<BMICalculator />} /> {/* register page */}
        <Route path="/yoga" element={<Yoga/>} /> 
        <Route path="/pose/:id" element={<YogaDetails/>} /> 
        


      </Routes>
    </div>
  );
};

export default App;