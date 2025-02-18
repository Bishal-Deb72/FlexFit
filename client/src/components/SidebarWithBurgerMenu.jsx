import React from "react";
import {
  Typography,
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
import { Link } from "react-router-dom";

export function SidebarWithBurgerMenu({ isDrawerOpen, toggleDrawer }) {
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
            <Link color="white" className="font-medium text-lg text-white ml-2">
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
            <Link className="font-medium text-lg text-white ml-2"> 
              Workouts
            </Link>
          </ListItem>
          <ListItem onClick={toggleDrawer} className="flex items-center">
            <ListItemPrefix>
              <FaNutritionix className="h-8 w-8 text-white" />
            </ListItemPrefix>
            <Link className="font-medium text-lg text-white ml-2">
              Nutrition
            </Link>
          </ListItem>
          <ListItem onClick={toggleDrawer} className="flex items-center">
            <ListItemPrefix>
              <IoLogOutOutline className="h-8 w-8 text-white" />
            </ListItemPrefix>
            <Link className="font-medium text-lg text-white ml-2">
              Log Out
            </Link>
          </ListItem>
        </List>

        
      </Card>
    </Drawer>
  );
}