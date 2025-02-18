import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineHome } from 'react-icons/ai';
import { TbTools } from "react-icons/tb";
import { GrYoga } from "react-icons/gr";
import { TbArrowsCross } from "react-icons/tb";
import { IoLogOutOutline } from "react-icons/io5";
import { FaDumbbell } from "react-icons/fa6";
import { FaNutritionix } from "react-icons/fa";

function SidebarWithToggle() {
  const [show, setShow] = useState(false);
  return (
    <div className={`h-screen ${show ? 'w-20' : 'w-64'} fixed bg-gradient-to-b from-red-600 to-black z-10 `}>
      <ul className="list-none p-4">
        <li className="my-6 flex items-center justify-start">
          <span
            className="cursor-pointer -mt-5"
            onClick={() => setShow(!show)}>
            {show ? (<GiHamburgerMenu className="w-8 h-8 text-white" />) : (<TbArrowsCross className="w-8 h-8 text-white" />)}
          </span>
        </li>


        <li className="my-12 flex items-center justify-start space-x-4">
          <div className="relative group w-10 h-10 flex items-center justify-start">
            <AiOutlineHome className="w-8 h-8 text-white transition duration-200 group-hover:bg-gray-800 group-hover:rounded-full" />
          </div>
          {!show && <h2 className="text-white text-lg">Home</h2>}
        </li>



        <li className="my-12 flex items-center justify-start space-x-4">
          <FaDumbbell className="w-8 h-8 text-white" />
          {!show && <h2 className="text-white text-lg">Workouts</h2>}
        </li>
        <li className="my-12 flex items-center justify-start space-x-4">
          <TbTools className="w-8 h-8 text-white" />
          {!show && <h2 className="text-white text-lg">Tools</h2>}
        </li>
        <li className="my-12 flex items-center justify-start space-x-4">
          <GrYoga className="w-8 h-8 text-white" />
          {!show && <h2 className="text-white text-lg">Yoga & Asanas</h2>}
        </li>
        <li className="my-12 flex items-center justify-start space-x-4">
          <FaNutritionix className="w-8 h-8 text-white" />
          {!show && <h2 className="text-white text-lg">Nutrition</h2>}
        </li>
        <div className="relative h-32 w-32 ...">
          <li className="absolute inset-x-0 bottom-0 h-16 flex items-center space-x-2">
            <IoLogOutOutline className="w-10 h-10 text-white" />
            {!show && <h2 className="text-white text-lg">Logout</h2>}
          </li>
        </div>

      </ul>
    </div>
  );
}

export default SidebarWithToggle;
