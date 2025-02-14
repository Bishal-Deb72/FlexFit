import { Link } from "react-router-dom";

function ToolsNavBar() {
  return (
    <div className="max-w-4xl w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-green-500 to-black rounded-md shadow-md text-white">
      <Link to="/tools/BMICalculator" className="bg-gray-800 p-6 rounded-lg text-center">BMI</Link>
      <Link to="/tools/CalorieCalculator" className="bg-gray-800 p-6 rounded-lg text-center">CALORIE</Link>
      <Link to="/tools/MacroCalculator" className="bg-gray-800 p-6 rounded-lg text-center">MACRO</Link>
      <Link to="/tools/OneRMCalculator" className="bg-gray-800 p-6 rounded-lg text-center">ONE RM</Link>
    </div>
  );
}

export default ToolsNavBar;
