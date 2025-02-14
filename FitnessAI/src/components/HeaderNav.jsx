import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { TbArrowsCross } from "react-icons/tb";
import logo from "../assets/logo3.png"; // Import the logo
import { SidebarWithBurgerMenu } from "./SidebarWithBurgerMenu"; // Import the sidebar component

function HeaderNav() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      {/* Header */}
      <div className="fixed top-0 left-0 w-full h-16 bg-gradient-to-r from-red-600 to-black px-4 md:px-6 flex items-center justify-between z-50">
        {/* Left Section: Burger Menu and Site Logo */}
        <div className="flex items-center space-x-4">
          {/* Burger Menu */}
          <button className="text-white" onClick={toggleSidebar}>
            {isSidebarOpen ? (
              <TbArrowsCross className="w-8 h-8" />
            ) : (
              <Bars3Icon className="w-8 h-8" />
            )}
          </button>
          {/* Site Logo and Name */}
          <div className="flex items-center space-x-2 md:space-x-4 ">
            <img src={logo} alt="Logo" className="w-10 h-16 mt-3 sm:w-20 sm:h-20 md:w-24 md:h-24"  />
            <h1 className="text-white text-lg md:text-xl ml-0  font-bold">FITNESS AI</h1>
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex items-center space-x-1 md:space-x-2 cursor-pointer">
          <BiUserCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
          <h2 className="text-white text-sm md:text-lg">Profile</h2>
        </div>
      </div>

      {/* Sidebar */}
      <SidebarWithBurgerMenu isDrawerOpen={isSidebarOpen} toggleDrawer={toggleSidebar} />
    </>
  );
}

export default HeaderNav;
