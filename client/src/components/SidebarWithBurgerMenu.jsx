import React from "react";
import {
  Drawer,
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";

import { AiOutlineHome } from "react-icons/ai";
import { TbTools } from "react-icons/tb";
import { GrYoga } from "react-icons/gr";
import { IoLogOutOutline } from "react-icons/io5";
import { FaDumbbell, FaNutritionix } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-hot-toast"; // Import toast
import axios from "axios"; // Import axios

export function SidebarWithBurgerMenu({ isDrawerOpen, toggleDrawer }) {
  const navigate = useNavigate(); // Initialize navigation

  // Logout function
  const handleLogout = async () => {
    try {
      // Show a loading toast while the API request is in progress
      const loadingToast = toast.loading("Logging out...");

      // Call the logout API
      await axios.post("http://localhost:3000/api/v1/users/logout", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token for authentication
        },
        withCredentials: true, // Include cookies (if required)
      });

      // Clear authentication data from local storage
      localStorage.removeItem("token");

      // Show success toast
      toast.success("Logged out successfully!", { id: loadingToast });

      // Close the sidebar
      toggleDrawer();

      // Redirect user to login page
      navigate("/login");
    } catch (error) {
      // Show error toast
      toast.error(error.response?.data?.message || "Logout failed! Try again.");
    }
  };

  return (
    <Drawer
      color="blueGray"
      open={isDrawerOpen}
      onClose={toggleDrawer}
      className="fixed top-0 left-0 z-0 w-64 h-full"
      overlay={false} // Disable the backdrop overlay if supported
    >
      <Card
        color="transparent"
        shadow={false}
        className="h-full w-full p-4 rounded-none bg-gradient-to-r from-red-600 to-black flex flex-col justify-between"
      >
        {/* List */}
        <List className="flex-grow flex flex-col justify-evenly mt-4">
          <ListItem onClick={toggleDrawer} className="flex items-center">
            <ListItemPrefix>
              <AiOutlineHome className="h-8 w-8 text-white" />
            </ListItemPrefix>
            <Link to="/" className="font-medium text-lg text-white ml-2">
              Home
            </Link>
          </ListItem>
          <ListItem onClick={toggleDrawer} className="flex items-center">
            <ListItemPrefix>
              <TbTools className="h-8 w-8 text-white" />
            </ListItemPrefix>
            <Link to="/tools/BMICalculator/" className="font-medium text-lg text-white ml-2">
              Tools
            </Link>
          </ListItem>
          <ListItem onClick={toggleDrawer} className="flex items-center">
            <ListItemPrefix>
              <GrYoga className="h-8 w-8 text-white" />
            </ListItemPrefix>
            <Link to="/yoga" className="font-medium text-white text-lg">
              Yoga And Asanas
            </Link>
          </ListItem>
          <ListItem onClick={toggleDrawer} className="flex items-center">
            <ListItemPrefix>
              <FaDumbbell className="h-8 w-8 text-white" />
            </ListItemPrefix>
            <Link to="/workouts" className="font-medium text-lg text-white ml-2">
              Workouts
            </Link>
          </ListItem>
          <ListItem onClick={toggleDrawer} className="flex items-center">
            <ListItemPrefix>
              <FaNutritionix className="h-8 w-8 text-white" />
            </ListItemPrefix>
            <Link to="/nutrition" className="font-medium text-lg text-white ml-2">
              Nutrition
            </Link>
          </ListItem>

          {/* Logout Button */}
          <ListItem onClick={handleLogout} className="flex items-center cursor-pointer">
            <ListItemPrefix>
              <IoLogOutOutline className="h-8 w-8 text-white" />
            </ListItemPrefix>
            <span className="font-medium text-lg text-white ml-2">Log Out</span>
          </ListItem>
        </List>
      </Card>
    </Drawer>
  );
}
